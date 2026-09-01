<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\Alokasi;
use App\Models\ItemInventory;
use App\Models\Periode;
use App\Models\Pengiriman;
use App\Models\PengirimanEvent;
use App\Models\Pod;
use App\Models\UnitRawat;
use App\Models\User;
use App\Services\AuditService;
use Carbon\Carbon;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class Dashboard extends Controller
{
    public function index(Request $request): Response
    {
        $this->authorizeDashboard($request);
        AuditService::logMenuAccess('Dashboard');

        return Inertia::render('Dashboard', [
            'defaultPeriode' => $this->getDefaultPeriode(),
        ]);
    }

    private function authorizeDashboard(Request $request): void
    {
        $user = $request->user();

        if (!$user) {
            throw new AuthorizationException();
        }

        // Akses dashboard diizinkan jika user punya akses minimal ke salah satu modul inti.
        // (Menghindari pertanyaan "kenapa dashboard bisa diakses tanpa izin?".)
        if (
            !$user->can('menu.alokasi')
            && !$user->can('menu.pengiriman')
            && !$user->can('menu.pengiriman.monitoring')
        ) {
            throw new AuthorizationException();
        }
    }

    private function canDistribusi(Request $request): bool
    {
        $user = $request->user();
        if (!$user) return false;
        return $user->can('menu.pengiriman.monitoring')
            || $user->can('menu.pengiriman')
            || $user->can('menu.distribusi')
            || $user->can('menu.konfirmasi');
    }

    private function canPengajuan(Request $request): bool
    {
        $user = $request->user();
        if (!$user) return false;
        return $user->can('menu.alokasi');
    }

    private function canPencarian(Request $request): bool
    {
        $user = $request->user();
        if (!$user) return false;
        return $user->can('menu.pencarian');
    }

    private function getDefaultPeriode(): array
    {
        $periode = Periode::query()->orderByDesc('id')->first();
        return [
            'id' => (int) ($periode?->id ?? 0),
            'nama' => (string) ($periode?->nama ?? '-'),
        ];
    }

    public function periodeOptions(Request $request): JsonResponse
    {
        try {
            $this->authorizeDashboard($request);

            $rows = Periode::query()
                ->orderByDesc('id')
                ->get(['id', 'nama'])
                ->map(fn(Periode $p): array => ['id' => (int) $p->id, 'nama' => (string) $p->nama])
                ->values();

            return response()->json([
                'status' => true,
                'message' => 'Berhasil memuat periode.',
                'data' => $rows,
            ]);
        } catch (AuthorizationException) {
            return response()->json(['status' => false, 'message' => 'Anda tidak memiliki izin.'], 403);
        } catch (\Throwable) {
            return response()->json(['status' => false, 'message' => 'Terjadi kesalahan sistem.'], 500);
        }
    }

    /**
     * Dashboard Executive — ringkasan KPI utama (pengajuan + distribusi) per periode terpilih.
     */
    public function executiveSummary(Request $request): JsonResponse
    {
        try {
            $this->authorizeDashboard($request);

            $validated = $request->validate([
                'periode_id' => ['required', 'integer', 'exists:periode,id'],
            ]);

            $periodeId = (int) $validated['periode_id'];

            // ===== KPI Pengajuan Alokasi =====
            // LOCK dihitung jika sudah ada item_inventory pada detail.
            $statusGridSql = "CASE WHEN EXISTS (
                SELECT 1
                FROM alokasi_detail
                INNER JOIN item_inventory ON item_inventory.id_detail_alokasi = alokasi_detail.id
                WHERE alokasi_detail.alokasi_nan = alokasi.nan
            ) THEN '2' ELSE alokasi.status END";

            $alokasiCounts = Alokasi::query()
                ->selectRaw($statusGridSql . ' as status_grid')
                ->selectRaw('COUNT(*)::int as jumlah')
                ->where('alokasi.periode_id', $periodeId)
                ->groupByRaw($statusGridSql)
                ->get()
                ->keyBy('status_grid');

            $alokasiTotal = (int) Alokasi::query()->where('periode_id', $periodeId)->count();
            $alokasiLast = (string) (Alokasi::query()->where('periode_id', $periodeId)->max('updated_at') ?? '');

            // ===== KPI Distribusi =====
            $lastStatusExpr = "(SELECT status FROM pengiriman_event WHERE pengiriman_id = pengiriman.id ORDER BY id DESC LIMIT 1)";
            $lastAtExpr = "(SELECT created_at FROM pengiriman_event WHERE pengiriman_id = pengiriman.id ORDER BY id DESC LIMIT 1)";

            $pengirimanBase = Pengiriman::query()
                ->whereHas('alokasi', fn($q) => $q->where('periode_id', $periodeId));

            $pengirimanTotal = (int) (clone $pengirimanBase)->count();
            $pengirimanLast = (string) ((clone $pengirimanBase)->selectRaw("MAX($lastAtExpr) as max_at")->value('max_at') ?? '');

            $pengirimanCounts = (clone $pengirimanBase)
                ->selectRaw($lastStatusExpr . ' as last_status')
                ->selectRaw('COUNT(*)::int as jumlah')
                ->groupByRaw($lastStatusExpr)
                ->get()
                ->keyBy('last_status');

            // Anomali: returned (status 9) + LOCK + FLAG (mengikuti definisi di sistem Anda)
            $totalReturned = (int) (($pengirimanCounts->get('9')->jumlah ?? 0));
            $totalLock = (int) PengirimanEvent::query()
                ->where('status', 3)
                ->where('note', 'like', '%(LOCK)%')
                ->whereHas('pengiriman.alokasi', fn($q) => $q->where('periode_id', $periodeId))
                ->distinct('pengiriman_id')
                ->count('pengiriman_id');

            $totalFlag = (int) PengirimanEvent::query()
                ->where('status', 2)
                ->where('note', 'like', '%(FLAG)%')
                ->whereHas('pengiriman.alokasi', fn($q) => $q->where('periode_id', $periodeId))
                ->distinct('pengiriman_id')
                ->count('pengiriman_id');

            return response()->json([
                'status' => true,
                'message' => 'Ringkasan berhasil dimuat.',
                'data' => [
                    'periode' => [
                        'id' => $periodeId,
                        'nama' => (string) (Periode::query()->where('id', $periodeId)->value('nama') ?? '-'),
                    ],
                    'lastUpdatedAt' => [
                        'pengajuan' => $alokasiLast,
                        'distribusi' => $pengirimanLast,
                    ],
                    'pengajuan' => [
                        'total' => $alokasiTotal,
                        'menunggu' => (int) (($alokasiCounts->get('1')->jumlah ?? 0)),
                        'disetujuiInduk' => (int) (($alokasiCounts->get('100')->jumlah ?? 0)),
                        'disetujuiPusbekangad' => (int) (($alokasiCounts->get('110')->jumlah ?? 0)),
                        'validasiBerhasil' => (int) (($alokasiCounts->get('2')->jumlah ?? 0)),
                    ],
                    'distribusi' => [
                        'total' => $pengirimanTotal,
                        'siap' => (int) (($pengirimanCounts->get('1')->jumlah ?? 0)),
                        'dalamPengiriman' => (int) (($pengirimanCounts->get('2')->jumlah ?? 0)),
                        'tiba' => (int) (($pengirimanCounts->get('3')->jumlah ?? 0)),
                        'diterima' => (int) (($pengirimanCounts->get('4')->jumlah ?? 0)),
                        'dikembalikan' => $totalReturned,
                        'anomali' => [
                            'total' => $totalReturned + $totalLock + $totalFlag,
                            'lock' => $totalLock,
                            'flag' => $totalFlag,
                        ],
                    ],
                ],
            ]);
        } catch (AuthorizationException) {
            return response()->json(['status' => false, 'message' => 'Anda tidak memiliki izin.'], 403);
        } catch (ValidationException $e) {
            return response()->json(['status' => false, 'message' => 'Validasi gagal.', 'errors' => $e->errors()], 422);
        } catch (\Throwable) {
            return response()->json(['status' => false, 'message' => 'Terjadi kesalahan sistem.'], 500);
        }
    }

    /**
     * Dashboard Executive — daftar singkat "Perlu Tindakan" (agar operasional & akademis).
     */
    public function actions(Request $request): JsonResponse
    {
        try {
            $this->authorizeDashboard($request);

            $validated = $request->validate([
                'periode_id' => ['required', 'integer', 'exists:periode,id'],
            ]);

            $periodeId = (int) $validated['periode_id'];

            // Pengajuan menunggu validasi (top 10 terbaru)
            $pendingAlokasi = collect();
            if ($this->canPengajuan($request)) {
                $pendingAlokasi = Alokasi::query()
                    ->with(['unit_rawat:id,nama'])
                    ->where('periode_id', $periodeId)
                    ->where('status', '1')
                    ->orderByDesc('updated_at')
                    ->limit(10)
                    ->get(['id', 'nan', 'unit_rawat_id', 'updated_at'])
                    ->map(fn(Alokasi $a): array => [
                        'id' => (int) $a->id,
                        'nan' => (string) $a->nan,
                        'unit_rawat' => (string) ($a->unit_rawat?->nama ?? '-'),
                        'updatedAt' => (string) ($a->updated_at ?? ''),
                    ])
                    ->values();
            }

            // Pengiriman "dalam pengiriman" terlalu lama (default >7 hari)
            $thresholdDays = 7;
            $lastStatusExpr = "(SELECT status FROM pengiriman_event WHERE pengiriman_id = pengiriman.id ORDER BY id DESC LIMIT 1)";
            $lastAtExpr = "(SELECT created_at FROM pengiriman_event WHERE pengiriman_id = pengiriman.id ORDER BY id DESC LIMIT 1)";
            $lastByExpr = "(SELECT created_by FROM pengiriman_event WHERE pengiriman_id = pengiriman.id ORDER BY id DESC LIMIT 1)";

            $overdueTransit = collect();
            if ($this->canDistribusi($request)) {
                $base = Pengiriman::query()
                ->with(['alokasi:id,nan,unit_rawat_id,periode', 'alokasi.unit_rawat:id,nama'])
                ->whereHas('alokasi', fn($q) => $q->where('periode_id', $periodeId))
                ->addSelect([
                    'last_status' => DB::raw($lastStatusExpr),
                    'last_at' => DB::raw($lastAtExpr),
                    'last_by' => DB::raw($lastByExpr),
                ])
                ->whereRaw($lastStatusExpr . ' = 2')
                ->whereRaw($lastAtExpr . " < (NOW() - INTERVAL '{$thresholdDays} days')")
                ->orderByRaw($lastAtExpr . ' ASC')
                ->limit(10)
                ->get(['id', 'uid', 'id_nan']);

                $creatorIds = $base->pluck('last_by')->filter()->map(fn($id) => (int) $id)->unique()->values();
                $creators = User::query()
                    ->with(['tenaga_medis:id,data'])
                    ->whereIn('id', $creatorIds)
                    ->get(['id', 'id_tenaga_medis'])
                    ->keyBy('id');

                $unit_rawatIds = $creators
                    ->map(fn(User $u) => (int) ($u->tenaga_medis?->data['unit_rawat'] ?? 0))
                    ->filter(fn(int $id) => $id > 0)
                    ->unique()
                    ->values();

                $unit_rawatMap = UnitRawat::query()->whereIn('id', $unit_rawatIds)->pluck('nama', 'id');

                $overdueTransit = $base->map(function (Pengiriman $p) use ($creators, $unit_rawatMap): array {
                    $lastBy = is_numeric($p->last_by ?? null) ? (int) $p->last_by : 0;
                    $creator = $lastBy > 0 ? $creators->get($lastBy) : null;
                    $sid = (int) ($creator?->tenaga_medis?->data['unit_rawat'] ?? 0);

                    return [
                        'id' => (int) $p->id,
                        'uid' => (string) $p->uid,
                        'nan' => (string) ($p->id_nan ?? '-'),
                        'unit_rawat' => (string) ($p->alokasi?->unit_rawat?->nama ?? '-'),
                        'lokasiTerakhir' => (string) ($unit_rawatMap->get($sid) ?? '-'),
                        'updatedAt' => (string) ($p->last_at ?? ''),
                    ];
                })->values();
            }

            return response()->json([
                'status' => true,
                'message' => 'Data perlu tindakan berhasil dimuat.',
                'data' => [
                    'pendingAlokasi' => $pendingAlokasi,
                    'overdueTransit' => $overdueTransit,
                ],
            ]);
        } catch (AuthorizationException) {
            return response()->json(['status' => false, 'message' => 'Anda tidak memiliki izin.'], 403);
        } catch (ValidationException $e) {
            return response()->json(['status' => false, 'message' => 'Validasi gagal.', 'errors' => $e->errors()], 422);
        } catch (\Throwable) {
            return response()->json(['status' => false, 'message' => 'Terjadi kesalahan sistem.'], 500);
        }
    }

    /**
     * Dashboard Executive — tren PoD per hari (default 14 hari terakhir berbasis data pada periode terpilih).
     * Dipakai untuk visualisasi ringan (low cognitive load).
     */
    public function distribusiTrend(Request $request): JsonResponse
    {
        try {
            $this->authorizeDashboard($request);
            if (!$this->canDistribusi($request)) {
                throw new AuthorizationException();
            }

            $validated = $request->validate([
                'periode_id' => ['required', 'integer', 'exists:periode,id'],
            ]);

            $periodeId = (int) $validated['periode_id'];

            // Tentukan window 14 hari terakhir berdasarkan data PoD terakhir pada periode.
            $maxAt = DB::table('pod')
                ->join('pengiriman', 'pengiriman.id', '=', 'pod.pengiriman_id')
                ->join('alokasi', 'alokasi.nan', '=', 'pengiriman.id_nan')
                ->where('alokasi.periode_id', $periodeId)
                ->max('pod.created_at');

            $end = $maxAt ? Carbon::parse($maxAt)->endOfDay() : now()->endOfDay();
            $start = (clone $end)->subDays(13)->startOfDay();

            $rows = DB::table('pod')
                ->join('pengiriman', 'pengiriman.id', '=', 'pod.pengiriman_id')
                ->join('alokasi', 'alokasi.nan', '=', 'pengiriman.id_nan')
                ->where('alokasi.periode_id', $periodeId)
                ->whereBetween('pod.created_at', [$start, $end])
                ->selectRaw("to_char(date_trunc('day', pod.created_at), 'YYYY-MM-DD') as tanggal")
                ->selectRaw('COUNT(*)::int as jumlah')
                ->groupByRaw("to_char(date_trunc('day', pod.created_at), 'YYYY-MM-DD')")
                ->orderByRaw("to_char(date_trunc('day', pod.created_at), 'YYYY-MM-DD') ASC")
                ->get();

            $map = collect($rows)->keyBy('tanggal');

            $data = [];
            for ($i = 0; $i < 14; $i++) {
                $day = (clone $start)->addDays($i)->format('Y-m-d');
                $data[] = [
                    'tanggal' => $day,
                    'jumlah' => (int) (($map->get($day)->jumlah ?? 0)),
                ];
            }

            return response()->json([
                'status' => true,
                'message' => 'Tren distribusi berhasil dimuat.',
                'data' => [
                    'start' => $start->toISOString(),
                    'end' => $end->toISOString(),
                    'series' => $data,
                ],
            ]);
        } catch (AuthorizationException) {
            return response()->json(['status' => false, 'message' => 'Anda tidak memiliki izin.'], 403);
        } catch (ValidationException $e) {
            return response()->json(['status' => false, 'message' => 'Validasi gagal.', 'errors' => $e->errors()], 422);
        } catch (\Throwable) {
            return response()->json(['status' => false, 'message' => 'Terjadi kesalahan sistem.'], 500);
        }
    }

    /**
     * Dashboard Executive — Bottleneck (Top 5 unit_rawat) untuk mode tertentu.
     * Mode:
     * - transit: pengiriman dengan status terakhir "Dalam Pengiriman" (2)
     * - lock: pengiriman dengan note terakhir mengandung "(LOCK)"
     * - flag: pengiriman dengan note terakhir mengandung "(FLAG)"
     */
    public function bottleneck(Request $request): JsonResponse
    {
        try {
            $this->authorizeDashboard($request);
            if (!$this->canDistribusi($request)) {
                throw new AuthorizationException();
            }

            $validated = $request->validate([
                'periode_id' => ['required', 'integer', 'exists:periode,id'],
                'mode' => ['required', 'string', 'in:transit,lock,flag'],
            ]);

            $periodeId = (int) $validated['periode_id'];
            $mode = (string) $validated['mode'];

            $lastStatusExpr = "(SELECT status FROM pengiriman_event WHERE pengiriman_id = pengiriman.id ORDER BY id DESC LIMIT 1)";
            $lastNoteExpr = "(SELECT note FROM pengiriman_event WHERE pengiriman_id = pengiriman.id ORDER BY id DESC LIMIT 1)";

            $q = DB::table('pengiriman')
                ->join('alokasi', 'alokasi.nan', '=', 'pengiriman.id_nan')
                ->join('unit_rawat', 'unit_rawat.id', '=', 'alokasi.unit_rawat_id')
                ->where('alokasi.periode_id', $periodeId)
                ->selectRaw('alokasi.unit_rawat_id as unit_rawat_id')
                ->selectRaw('unit_rawat.nama as unit_rawat')
                ->selectRaw('COUNT(*)::int as jumlah')
                ->groupBy('alokasi.unit_rawat_id', 'unit_rawat.nama')
                ->orderByDesc('jumlah')
                ->limit(5);

            if ($mode === 'transit') {
                $q->whereRaw($lastStatusExpr . ' = 2');
            } elseif ($mode === 'lock') {
                // LOCK secara definisi muncul pada verifikasi/penerimaan (umumnya status 3), note mengandung "(LOCK)"
                $q->whereRaw($lastNoteExpr . " ILIKE '%(LOCK)%'");
            } else { // flag
                // FLAG secara definisi muncul saat transit (status 2), note mengandung "(FLAG)"
                $q->whereRaw($lastNoteExpr . " ILIKE '%(FLAG)%'");
            }

            $items = collect($q->get())->map(fn($row) => [
                'unit_rawatId' => (int) ($row->unit_rawat_id ?? 0),
                'unit_rawat' => (string) ($row->unit_rawat ?? '-'),
                'jumlah' => (int) ($row->jumlah ?? 0),
            ])->values();

            return response()->json([
                'status' => true,
                'message' => 'Bottleneck berhasil dimuat.',
                'data' => [
                    'mode' => $mode,
                    'items' => $items,
                ],
            ]);
        } catch (AuthorizationException) {
            return response()->json(['status' => false, 'message' => 'Anda tidak memiliki izin.'], 403);
        } catch (ValidationException $e) {
            return response()->json(['status' => false, 'message' => 'Validasi gagal.', 'errors' => $e->errors()], 422);
        } catch (\Throwable) {
            return response()->json(['status' => false, 'message' => 'Terjadi kesalahan sistem.'], 500);
        }
    }

    public function rekonSummary(Request $request): JsonResponse
    {
        try {
            $this->authorizeDashboard($request);
            $validated = $request->validate([
                'periode_id' => ['nullable', 'integer', 'exists:periode,id'],
            ]);
            $periodeId = (int) ($validated['periode_id'] ?? ($this->getDefaultPeriode()['id'] ?? 0));

            $lastStatusSub = PengirimanEvent::query()
                ->select('status')
                ->whereColumn('pengiriman_id', 'pengiriman.id')
                ->latest('id')
                ->limit(1);

            $rows = Pengiriman::query()
                ->addSelect(['id', 'last_status' => $lastStatusSub])
                ->whereHas('alokasi', fn($q) => $q->where('periode_id', $periodeId))
                ->get();

            $statusGroups = $rows->groupBy('last_status');

            $breakdown = collect([1, 2, 3, 4, 9])->map(function (int $status) use ($statusGroups): array {
                return [
                    'status' => $status,
                    'label' => statusLabel($status),
                    'count' => ($statusGroups->get((string) $status) ?? collect())->count(),
                ];
            })->values();

            $totalPengiriman = $rows->count();
            $totalItem = ItemInventory::query()->count();
            $totalPod = Pod::query()->count();
            $totalLock = PengirimanEvent::query()
                ->where('status', 3)
                ->where('note', 'like', '%(LOCK)%')
                ->distinct('pengiriman_id')
                ->count('pengiriman_id');

            $totalDelivered = ($statusGroups->get('4') ?? collect())->count();
            $completionRate = $totalPengiriman > 0
                ? round(($totalDelivered / $totalPengiriman) * 100, 1)
                : 0.0;

            return response()->json([
                'status' => true,
                'data' => [
                    'statusBreakdown' => $breakdown,
                    'totalPengiriman' => $totalPengiriman,
                    'totalItem' => $totalItem,
                    'totalPod' => $totalPod,
                    'totalLock' => $totalLock,
                    'completionRate' => $completionRate,
                ],
            ]);
        } catch (\Exception) {
            return response()->json(['status' => false, 'message' => 'Terjadi kesalahan sistem.'], 500);
        }
    }

    public function redFlags(Request $request): JsonResponse
    {
        try {
            $this->authorizeDashboard($request);
            if (!$this->canDistribusi($request)) {
                throw new AuthorizationException();
            }
            $validated = $request->validate([
                'periode_id' => ['nullable', 'integer', 'exists:periode,id'],
            ]);
            $periodeId = (int) ($validated['periode_id'] ?? ($this->getDefaultPeriode()['id'] ?? 0));

            $lastStatusExpr = "(SELECT status FROM pengiriman_event WHERE pengiriman_id = pengiriman.id ORDER BY id DESC LIMIT 1)";

            $lastStatusSub = PengirimanEvent::query()
                ->select('status')
                ->whereColumn('pengiriman_id', 'pengiriman.id')
                ->latest('id')
                ->limit(1);

            $lastNoteSub = PengirimanEvent::query()
                ->select('note')
                ->whereColumn('pengiriman_id', 'pengiriman.id')
                ->latest('id')
                ->limit(1);

            $lastAtSub = PengirimanEvent::query()
                ->select('created_at')
                ->whereColumn('pengiriman_id', 'pengiriman.id')
                ->latest('id')
                ->limit(1);

            $baseQuery = fn() => Pengiriman::query()
                ->with(['alokasi:id,nan,unit_rawat_id,periode', 'alokasi.unit_rawat:id,nama'])
                ->whereHas('alokasi', fn($q) => $q->where('periode_id', $periodeId))
                ->addSelect([
                    'id',
                    'uid',
                    'id_nan',
                    'last_status' => $lastStatusSub,
                    'last_note' => $lastNoteSub,
                    'last_at' => $lastAtSub,
                ])
                ->orderByDesc('updated_at')
                ->limit(20);

            // FLAG = anomali saat transit (note mengandung FLAG)
            $flag = $baseQuery()
                ->whereHas('pengiriman_events', fn($q) => $q->where('status', 2)->where('note', 'like', '%(FLAG)%'))
                ->get();

            // LOCK = mismatch saat verifikasi/penerimaan (note mengandung LOCK)
            $lock = $baseQuery()
                ->whereHas('pengiriman_events', fn($q) => $q->where('status', 3)->where('note', 'like', '%(LOCK)%'))
                ->get();

            // Dikembalikan = status terakhir 9
            $returned = $baseQuery()
                ->whereRaw($lastStatusExpr . ' = 9')
                ->get();

            $formatRow = function (Pengiriman $p, string $type): array {
                return [
                    'type' => $type,
                    'id' => $p->id,
                    'uid' => (string) $p->uid,
                    'nan' => (string) ($p->id_nan ?? '-'),
                    'unit_rawat' => $p->alokasi?->unit_rawat?->nama ?? '-',
                    'periode' => $p->alokasi?->periode ?? '-',
                    'lastStatus' => (int) ($p->last_status ?? 0),
                    'lastStatusLabel' => statusLabel((int) ($p->last_status ?? 0)),
                    'note' => trim((string) ($p->last_note ?? '')),
                    'updatedAt' => (string) ($p->last_at ?? ''),
                ];
            };

            return response()->json([
                'status' => true,
                'data' => [
                    'flag' => $flag->map(fn($p) => $formatRow($p, 'flag'))->values(),
                    'lock' => $lock->map(fn($p) => $formatRow($p, 'lock'))->values(),
                    'returned' => $returned->map(fn($p) => $formatRow($p, 'returned'))->values(),
                ],
            ]);
        } catch (AuthorizationException) {
            return response()->json(['status' => false, 'message' => 'Anda tidak memiliki izin.'], 403);
        } catch (\Throwable) {
            return response()->json(['status' => false, 'message' => 'Terjadi kesalahan sistem.'], 500);
        }
    }

    public function traceEvent(Request $request): JsonResponse
    {
        try {
            $this->authorizeDashboard($request);
            if (!$this->canPencarian($request)) {
                throw new AuthorizationException();
            }
            $validated = $request->validate([
                'query' => ['required', 'string', 'min:1', 'max:100'],
            ]);

            $q = trim($validated['query']);

            $pengiriman = null;

            if (is_numeric($q)) {
                $pengiriman = Pengiriman::query()
                    ->with(['alokasi:id,nan,unit_rawat_id,periode', 'alokasi.unit_rawat:id,nama', 'user:id,id_tenaga_medis', 'user.tenaga_medis:id,data'])
                    ->where('uid', (int) $q)
                    ->first();
            }

            if ($pengiriman === null) {
                $pengiriman = Pengiriman::query()
                    ->with(['alokasi:id,nan,unit_rawat_id,periode', 'alokasi.unit_rawat:id,nama', 'user:id,id_tenaga_medis', 'user.tenaga_medis:id,data'])
                    ->where('hash', $q)
                    ->first();
            }

            if ($pengiriman !== null) {
                return $this->traceByPengiriman($pengiriman);
            }

            $item = ItemInventory::query()
                ->with(['alokasi_detail:id,alokasi_nan,jenis,ukuran,kategori'])
                ->where('hash', $q)
                ->first();

            if ($item === null) {
                return response()->json([
                    'status' => false,
                    'message' => 'Data tidak ditemukan. Masukkan UID Box atau hash Item.',
                ]);
            }

            return $this->traceByItem($item);
        } catch (AuthorizationException) {
            return response()->json(['status' => false, 'message' => 'Anda tidak memiliki izin.'], 403);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['status' => false, 'message' => 'Input tidak valid.', 'errors' => $e->errors()], 422);
        } catch (\Throwable) {
            return response()->json(['status' => false, 'message' => 'Terjadi kesalahan sistem.'], 500);
        }
    }

    // buildStats() dihapus: dashboard executive memakai ringkasan berbasis periode (lebih akademis & konsisten).

    private function traceByPengiriman(Pengiriman $pengiriman): JsonResponse
    {
        $events = PengirimanEvent::query()
            ->where('pengiriman_id', $pengiriman->id)
            ->orderBy('id')
            ->get(['id', 'status', 'note', 'created_at', 'created_by']);

        [$creators, $unit_rawatMap] = $this->resolveEventCreators($events);

        $eventRows = $events->map(function (PengirimanEvent $e) use ($creators, $unit_rawatMap): array {
            $creator = $creators->get((int) ($e->created_by ?? 0));
            $unit_rawatId = (int) ($creator?->tenaga_medis?->data['unit_rawat'] ?? 0);

            return [
                'id' => $e->id,
                'status' => (int) $e->status,
                'statusLabel' => statusLabel((int) $e->status),
                'note' => trim((string) $e->note),
                'lokasi' => $unit_rawatMap->get($unit_rawatId) ?? '-',
                'createdBy' => $creator?->tenaga_medis?->data['nama'] ?? '-',
                'createdAt' => (string) $e->created_at,
            ];
        })->values();

        $pods = Pod::query()
            ->with(['item_inventory:id,nsn,hash', 'tenaga_medis:id,data'])
            ->where('pengiriman_id', $pengiriman->id)
            ->orderBy('id')
            ->get();

        $podRows = $pods->map(function (Pod $pod): array {
            $hash = (string) ($pod->item_inventory?->hash ?? '');

            return [
                'itemId' => $pod->item_id,
                'itemHash' => $this->maskHash($hash),
                'nsn' => (string) ($pod->item_inventory?->nsn ?? '-'),
                'penerimaNama' => (string) ($pod->tenaga_medis?->data['nama'] ?? '-'),
                'penerimaNrp' => (string) ($pod->tenaga_medis?->data['nrp'] ?? '-'),
                'penerimaPangkat' => (string) ($pod->tenaga_medis?->data['pangkat'] ?? '-'),
                'createdAt' => (string) $pod->created_at,
            ];
        })->values();

        return response()->json([
            'status' => true,
            'data' => [
                'type' => 'box',
                'id' => $pengiriman->id,
                'uid' => (string) $pengiriman->uid,
                'nan' => (string) ($pengiriman->id_nan ?? '-'),
                'unit_rawat' => $pengiriman->alokasi?->unit_rawat?->nama ?? '-',
                'periode' => $pengiriman->alokasi?->periode ?? '-',
                'createdBy' => $pengiriman->user?->tenaga_medis?->data['nama'] ?? '-',
                'createdAt' => (string) $pengiriman->created_at,
                'events' => $eventRows,
                'pods' => $podRows,
            ],
        ]);
    }

    private function traceByItem(ItemInventory $item): JsonResponse
    {
        $pod = Pod::query()
            ->with(['pengiriman', 'tenaga_medis:id,data'])
            ->where('item_id', $item->id)
            ->first();

        $pengirimanInfo = null;
        $eventRows = collect();

        if ($pod?->pengiriman) {
            $pengiriman = $pod->pengiriman->load([
                'alokasi:id,nan,unit_rawat_id,periode',
                'alokasi.unit_rawat:id,nama',
                'user:id,id_tenaga_medis',
                'user.tenaga_medis:id,data',
            ]);

            $events = PengirimanEvent::query()
                ->where('pengiriman_id', $pengiriman->id)
                ->orderBy('id')
                ->get(['id', 'status', 'note', 'created_at', 'created_by']);

            [$creators, $unit_rawatMap] = $this->resolveEventCreators($events);

            $eventRows = $events->map(function (PengirimanEvent $e) use ($creators, $unit_rawatMap): array {
                $creator = $creators->get((int) ($e->created_by ?? 0));
                $unit_rawatId = (int) ($creator?->tenaga_medis?->data['unit_rawat'] ?? 0);

                return [
                    'id' => $e->id,
                    'status' => (int) $e->status,
                    'statusLabel' => statusLabel((int) $e->status),
                    'note' => trim((string) $e->note),
                    'lokasi' => $unit_rawatMap->get($unit_rawatId) ?? '-',
                    'createdBy' => $creator?->tenaga_medis?->data['nama'] ?? '-',
                    'createdAt' => (string) $e->created_at,
                ];
            })->values();

            $pengirimanInfo = [
                'id' => $pengiriman->id,
                'uid' => (string) $pengiriman->uid,
                'nan' => (string) ($pengiriman->id_nan ?? '-'),
                'unit_rawat' => $pengiriman->alokasi?->unit_rawat?->nama ?? '-',
                'periode' => $pengiriman->alokasi?->periode ?? '-',
                'createdBy' => $pengiriman->user?->tenaga_medis?->data['nama'] ?? '-',
                'createdAt' => (string) $pengiriman->created_at,
            ];
        }

        return response()->json([
            'status' => true,
            'data' => [
                'type' => 'item',
                'id' => $item->id,
                'nsn' => (string) $item->nsn,
                'hash' => $this->maskHash((string) $item->hash),
                'itemStatus' => $item->status,
                'pengiriman' => $pengirimanInfo,
                'events' => $eventRows->values(),
                'penerima' => $pod ? [
                    'nama' => $pod->tenaga_medis?->data['nama'] ?? '-',
                    'nrp' => $pod->tenaga_medis?->data['nrp'] ?? '-',
                    'pangkat' => $pod->tenaga_medis?->data['pangkat'] ?? '-',
                    'createdAt' => (string) $pod->created_at,
                ] : null,
            ],
        ]);
    }

    private function resolveEventCreators(Collection $events): array
    {
        $creatorIds = $events
            ->pluck('created_by')
            ->filter()
            ->map(fn($id) => (int) $id)
            ->unique();

        $creators = User::query()
            ->with(['tenaga_medis:id,data'])
            ->whereIn('id', $creatorIds)
            ->get(['id', 'id_tenaga_medis'])
            ->keyBy('id');

        $unit_rawatIds = $creators
            ->map(fn($u) => (int) ($u->tenaga_medis?->data['unit_rawat'] ?? 0))
            ->filter()
            ->unique();

        $unit_rawatMap = UnitRawat::query()
            ->whereIn('id', $unit_rawatIds)
            ->pluck('nama', 'id');

        return [$creators, $unit_rawatMap];
    }

    private function maskHash(string $hash): string
    {
        if (strlen($hash) <= 12) {
            return str_repeat('*', strlen($hash));
        }

        return substr($hash, 0, 8) . str_repeat('*', strlen($hash) - 12) . substr($hash, -8);
    }
}
