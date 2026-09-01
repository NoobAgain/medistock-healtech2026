<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\Faskes;
use App\Models\Periode;
use App\Models\TenagaMedis;
use App\Models\Pengiriman;
use App\Models\PengirimanEvent;
use App\Models\UnitRawat;
use App\Models\User;
use App\Services\AuditService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class Monitoring extends Controller
{
    /**
     * Mapping unit_rawat_id -> unit_rawat_induk_id berdasarkan data tenaga_medis.
     * Istilah UI: UnitRawat Induk (diambil dari master `faskes`, tanpa menyebut "faskes" di UI).
     *
     * @return array<int,int> [unit_rawatId => unit_rawatIndukId]
     */
    private function buildUnitRawatToIndukMap(): array
    {
        $counts = []; // [unit_rawatId][indukId] => count

        TenagaMedis::query()
            ->select(['id', 'data'])
            ->chunk(200, function ($rows) use (&$counts) {
                foreach ($rows as $tenaga_medis) {
                    $unit_rawatId = $tenaga_medis->data['unit_rawat'] ?? null;
                    $indukId = $tenaga_medis->data['faskes'] ?? null;

                    if (!is_numeric($unit_rawatId) || !is_numeric($indukId)) {
                        continue;
                    }

                    $unit_rawatId = (int) $unit_rawatId;
                    $indukId = (int) $indukId;

                    if ($unit_rawatId <= 0 || $indukId <= 0) {
                        continue;
                    }

                    $counts[$unit_rawatId] ??= [];
                    $counts[$unit_rawatId][$indukId] = ($counts[$unit_rawatId][$indukId] ?? 0) + 1;
                }
            });

        $map = [];
        foreach ($counts as $unit_rawatId => $indukCounts) {
            arsort($indukCounts);
            $topIndukId = array_key_first($indukCounts);
            if (is_numeric($topIndukId)) {
                $map[(int) $unit_rawatId] = (int) $topIndukId;
            }
        }

        return $map;
    }

    public function index()
    {
        Gate::authorize('monitoring', Pengiriman::class);
        AuditService::logMenuAccess('Monitoring Pengiriman');

        return Inertia::render('Monitoring');
    }

    /**
     * Opsi periode untuk filter (seperti modul pengajuan).
     */
    public function periodeOptions(Request $request): JsonResponse
    {
        try {
            Gate::authorize('monitoring', Pengiriman::class);

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
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk mengakses data ini.',
            ], 403);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ], 500);
        }
    }

    /**
     * Opsi UnitRawat Induk berdasarkan data pengiriman yang ada pada periode terpilih.
     */
    public function satuanIndukOptions(Request $request): JsonResponse
    {
        try {
            Gate::authorize('monitoring', Pengiriman::class);

            $validated = $request->validate([
                'periode_id' => ['required', 'integer', 'exists:periode,id'],
            ]);

            $unit_rawatToInduk = $this->buildUnitRawatToIndukMap();

            $unit_rawatIds = Pengiriman::query()
                ->whereHas('alokasi', fn($q) => $q->where('periode_id', (int) $validated['periode_id']))
                ->with(['alokasi:id,nan,unit_rawat_id'])
                ->get(['id', 'id_nan'])
                ->map(fn(Pengiriman $p) => (int) ($p->alokasi?->unit_rawat_id ?? 0))
                ->filter(fn(int $id) => $id > 0)
                ->unique()
                ->values();

            $indukIds = $unit_rawatIds
                ->map(fn(int $sid) => (int) ($unit_rawatToInduk[$sid] ?? 0))
                ->filter(fn(int $id) => $id > 0)
                ->unique()
                ->values();

            $rows = Faskes::query()
                ->whereIn('id', $indukIds)
                ->orderBy('nama')
                ->get(['id', 'nama'])
                ->map(fn(Faskes $k) => ['id' => (int) $k->id, 'nama' => (string) $k->nama])
                ->values();

            return response()->json([
                'status' => true,
                'message' => 'Daftar unit_rawat induk berhasil dimuat.',
                'data' => $rows,
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk mengakses data ini.',
            ], 403);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ], 500);
        }
    }

    /**
     * Opsi UnitRawat Bawah berdasarkan UnitRawat Induk terpilih.
     */
    public function satuanBawahOptions(Request $request): JsonResponse
    {
        try {
            Gate::authorize('monitoring', Pengiriman::class);

            $validated = $request->validate([
                'periode_id' => ['required', 'integer', 'exists:periode,id'],
                'unit_rawat_induk_id' => ['required', 'integer', 'exists:faskes,id'],
            ]);

            $indukId = (int) $validated['unit_rawat_induk_id'];
            $unit_rawatToInduk = $this->buildUnitRawatToIndukMap();

            $unit_rawatIds = Pengiriman::query()
                ->whereHas('alokasi', fn($q) => $q->where('periode_id', (int) $validated['periode_id']))
                ->with(['alokasi:id,nan,unit_rawat_id'])
                ->get(['id', 'id_nan'])
                ->map(fn(Pengiriman $p) => (int) ($p->alokasi?->unit_rawat_id ?? 0))
                ->filter(fn(int $id) => $id > 0)
                ->unique()
                ->filter(fn(int $sid) => (int) ($unit_rawatToInduk[$sid] ?? 0) === $indukId)
                ->values();

            $rows = UnitRawat::query()
                ->whereIn('id', $unit_rawatIds)
                ->orderBy('nama')
                ->get(['id', 'nama'])
                ->map(fn(UnitRawat $s) => ['id' => (int) $s->id, 'nama' => (string) ($s->nama ?? '-')])
                ->values();

            return response()->json([
                'status' => true,
                'message' => 'Daftar unit_rawat bawah berhasil dimuat.',
                'data' => $rows,
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk mengakses data ini.',
            ], 403);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ], 500);
        }
    }

    /**
     * Ringkasan angka untuk monitoring distribusi berdasarkan filter (periode/unit_rawat induk/unit_rawat bawah).
     * Mengembalikan total dan breakdown jumlah per status terakhir.
     */
    public function summary(Request $request): JsonResponse
    {
        try {
            Gate::authorize('monitoring', Pengiriman::class);

            $validated = $request->validate([
                'periode_id' => ['required', 'integer', 'exists:periode,id'],
                'unit_rawat_induk_id' => ['nullable', 'integer'],
                'unit_rawat_id' => ['nullable', 'integer'],
            ]);

            $periodeId = (int) $validated['periode_id'];
            $unit_rawatId = isset($validated['unit_rawat_id']) && is_numeric($validated['unit_rawat_id']) ? (int) $validated['unit_rawat_id'] : 0;
            $indukId = isset($validated['unit_rawat_induk_id']) && is_numeric($validated['unit_rawat_induk_id']) ? (int) $validated['unit_rawat_induk_id'] : 0;

            // Base query (filter periode + unit_rawat)
            $base = Pengiriman::query()
                ->whereHas('alokasi', fn($q) => $q->where('periode_id', $periodeId));

            if ($unit_rawatId > 0) {
                $base->whereHas('alokasi', fn($q) => $q->where('unit_rawat_id', $unit_rawatId));
            } elseif ($indukId > 0) {
                $unit_rawatToInduk = $this->buildUnitRawatToIndukMap();

                $allowedUnitRawatIds = Pengiriman::query()
                    ->whereHas('alokasi', fn($q) => $q->where('periode_id', $periodeId))
                    ->with(['alokasi:id,nan,unit_rawat_id'])
                    ->get(['id', 'id_nan'])
                    ->map(fn(Pengiriman $p) => (int) ($p->alokasi?->unit_rawat_id ?? 0))
                    ->filter(fn(int $id) => $id > 0)
                    ->unique()
                    ->filter(fn(int $sid) => (int) ($unit_rawatToInduk[$sid] ?? 0) === $indukId)
                    ->values();

                if ($allowedUnitRawatIds->isEmpty()) {
                    return response()->json([
                        'status' => true,
                        'message' => 'Ringkasan berhasil dimuat.',
                        'data' => [
                            'total' => 0,
                            'byStatus' => [
                                '1' => 0,
                                '2' => 0,
                                '3' => 0,
                                '4' => 0,
                                '9' => 0,
                            ],
                        ],
                    ]);
                }

                $base->whereHas('alokasi', fn($q) => $q->whereIn('unit_rawat_id', $allowedUnitRawatIds));
            }

            $total = (int) (clone $base)->count();

            $lastStatusExpr = "(SELECT status FROM pengiriman_event WHERE pengiriman_id = pengiriman.id ORDER BY id DESC LIMIT 1)";

            $rows = (clone $base)
                ->selectRaw($lastStatusExpr . " as last_status")
                ->selectRaw('COUNT(*)::int as jumlah')
                ->groupByRaw($lastStatusExpr)
                ->get();

            $byStatus = [
                '1' => 0,
                '2' => 0,
                '3' => 0,
                '4' => 0,
                '9' => 0,
            ];

            foreach ($rows as $row) {
                $st = (string) ($row->last_status ?? '');
                if (array_key_exists($st, $byStatus)) {
                    $byStatus[$st] = (int) ($row->jumlah ?? 0);
                }
            }

            return response()->json([
                'status' => true,
                'message' => 'Ringkasan berhasil dimuat.',
                'data' => [
                    'total' => $total,
                    'byStatus' => $byStatus,
                ],
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk mengakses data ini.',
            ], 403);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ], 500);
        }
    }

    public function dataPengirimanListdata(Request $request): JsonResponse
    {
        try {
            Gate::authorize('monitoring', Pengiriman::class);

            $validated = $request->validate([
                'periode_id' => ['required', 'integer', 'exists:periode,id'],
                'unit_rawat_induk_id' => ['nullable', 'integer'],
                'unit_rawat_id' => ['nullable', 'integer'],
                'status' => ['nullable', 'integer'],
                'search' => ['nullable', 'string', 'max:100'],
                'page' => ['nullable', 'integer', 'min:1'],
                'perPage' => ['nullable', 'integer', 'min:1', 'max:100'],
                'sortField' => ['nullable', 'string'],
                'sortDirection' => ['nullable', 'string', 'in:asc,desc'],
            ]);

            $page = (int) ($validated['page'] ?? 1);
            $perPage = (int) ($validated['perPage'] ?? 100);
            $sortDirection = $validated['sortDirection'] ?? 'desc';
            $requestedSortField = $validated['sortField'] ?? 'created_at';

            $allowedSortFields = ['id', 'uid', 'id_nan', 'created_at', 'updated_at'];
            $sortField = in_array($requestedSortField, $allowedSortFields, true)
                ? $requestedSortField
                : 'created_at';

            $query = Pengiriman::query()
                ->with(['alokasi:id,nan,unit_rawat_id,periode', 'alokasi.unit_rawat:id,nama', 'user:id,id_tenaga_medis', 'user.tenaga_medis:id,data'])
                ->select(['id', 'uid', 'id_nan', 'created_at', 'updated_at'])
                ->addSelect([
                    'last_event_status' => PengirimanEvent::query()
                        ->select('status')
                        ->whereColumn('pengiriman_id', 'pengiriman.id')
                        ->latest('id')
                        ->limit(1),
                    'last_event_at' => PengirimanEvent::query()
                        ->select('created_at')
                        ->whereColumn('pengiriman_id', 'pengiriman.id')
                        ->latest('id')
                        ->limit(1),
                    'last_event_created_by' => PengirimanEvent::query()
                        ->select('created_by')
                        ->whereColumn('pengiriman_id', 'pengiriman.id')
                        ->latest('id')
                        ->limit(1),
                ]);

            // Filter periode (wajib)
            $periodeId = (int) $validated['periode_id'];
            $query->whereHas('alokasi', fn($q) => $q->where('periode_id', $periodeId));

            // Filter unit_rawat induk/unit_rawat bawah (opsional)
            $unit_rawatId = isset($validated['unit_rawat_id']) && is_numeric($validated['unit_rawat_id']) ? (int) $validated['unit_rawat_id'] : 0;
            $indukId = isset($validated['unit_rawat_induk_id']) && is_numeric($validated['unit_rawat_induk_id']) ? (int) $validated['unit_rawat_induk_id'] : 0;

            if ($unit_rawatId > 0) {
                $query->whereHas('alokasi', fn($q) => $q->where('unit_rawat_id', $unit_rawatId));
            } elseif ($indukId > 0) {
                $unit_rawatToInduk = $this->buildUnitRawatToIndukMap();

                $allowedUnitRawatIds = Pengiriman::query()
                    ->whereHas('alokasi', fn($q) => $q->where('periode_id', $periodeId))
                    ->with(['alokasi:id,nan,unit_rawat_id'])
                    ->get(['id', 'id_nan'])
                    ->map(fn(Pengiriman $p) => (int) ($p->alokasi?->unit_rawat_id ?? 0))
                    ->filter(fn(int $id) => $id > 0)
                    ->unique()
                    ->filter(fn(int $sid) => (int) ($unit_rawatToInduk[$sid] ?? 0) === $indukId)
                    ->values();

                if ($allowedUnitRawatIds->isNotEmpty()) {
                    $query->whereHas('alokasi', fn($q) => $q->whereIn('unit_rawat_id', $allowedUnitRawatIds));
                } else {
                    return response()->json([
                        'status' => true,
                        'message' => 'Berhasil memproses permintaan.',
                        'data' => [],
                        'total' => 0,
                        'page' => $page,
                        'perPage' => $perPage,
                    ]);
                }
            }

            // Filter status terakhir (opsional)
            $status = isset($validated['status']) && is_numeric($validated['status']) ? (int) $validated['status'] : 0;
            if ($status > 0) {
                $query->whereRaw(
                    "(SELECT status FROM pengiriman_event WHERE pengiriman_id = pengiriman.id ORDER BY id DESC LIMIT 1) = ?",
                    [$status],
                );
            }

            // Pencarian ramah pengguna (UID / UnitRawat / NAN)
            $search = trim((string) ($validated['search'] ?? ''));
            if ($search !== '') {
                $query->where(function ($q) use ($search) {
                    $q->where('uid', 'ilike', '%' . $search . '%')
                        ->orWhereRaw('CAST(id_nan AS TEXT) ILIKE ?', ['%' . $search . '%'])
                        ->orWhereHas('alokasi.unit_rawat', fn($sq) => $sq->where('nama', 'ilike', '%' . $search . '%'));
                });
            }

            $query->orderBy($sortField, $sortDirection);
            $paginatedData = $query->paginate($perPage, ['*'], 'page', $page);
            $collection = $paginatedData->getCollection();

            // Map lokasi terakhir dari last_event_created_by -> user -> tenaga_medis.unit_rawat
            $lastCreatorIds = $collection
                ->pluck('last_event_created_by')
                ->filter(fn($id) => !is_null($id))
                ->map(fn($id) => (int) $id)
                ->unique()
                ->values();

            $lastCreators = User::query()
                ->with(['tenaga_medis:id,data'])
                ->whereIn('id', $lastCreatorIds)
                ->get(['id', 'id_tenaga_medis'])
                ->keyBy('id');

            $unit_rawatIds = $lastCreators
                ->map(fn(User $u) => (int) ($u->tenaga_medis?->data['unit_rawat'] ?? 0))
                ->filter(fn(int $id) => $id > 0)
                ->unique()
                ->values();

            $unit_rawatMap = UnitRawat::query()
                ->whereIn('id', $unit_rawatIds)
                ->pluck('nama', 'id');

            $rows = $collection->map(function (Pengiriman $pengiriman) use ($lastCreators, $unit_rawatMap): array {
                $lastStatus = (int) ($pengiriman->last_event_status ?? 0);
                $updatedAt = (string) ($pengiriman->last_event_at ?? $pengiriman->updated_at ?? $pengiriman->created_at ?? '');

                $lastCreatedBy = !is_null($pengiriman->last_event_created_by)
                    ? $lastCreators->get((int) $pengiriman->last_event_created_by)
                    : null;
                $sid = (int) ($lastCreatedBy?->tenaga_medis?->data['unit_rawat'] ?? 0);

                return [
                    'id' => $pengiriman->id,
                    'uid' => (string) $pengiriman->uid,
                    'nan' => (string) ($pengiriman->id_nan ?? '-'),
                    'unit_rawat' => (string) ($pengiriman->alokasi->unit_rawat->nama ?? '-'),
                    'status' => $lastStatus,
                    'statusLabel' => statusLabel($lastStatus),
                    'updatedAt' => $updatedAt,
                    'lokasiTerakhir' => (string) ($unit_rawatMap->get($sid) ?? '-'),
                ];
            })->values();



            return response()->json([
                'status' => true,
                'message' => 'Berhasil memproses permintaan.',
                'data' => $rows,
                'total' => $paginatedData->total(),
                'page' => $paginatedData->currentPage(),
                'perPage' => $paginatedData->perPage(),
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk mengakses data ini.',
            ], 403);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }

    public function detailPengiriman(Request $request): JsonResponse
    {
        try {
            Gate::authorize('monitoring', Pengiriman::class);

            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:pengiriman,id'],
            ], [
                'id.required' => 'ID pengiriman wajib diisi.',
                'id.integer' => 'ID pengiriman harus berupa angka.',
                'id.exists' => 'Data pengiriman tidak ditemukan.',
            ]);

            $pengiriman = Pengiriman::query()
                ->with(['alokasi:id,nan,unit_rawat_id,periode', 'alokasi.unit_rawat:id,nama', 'user:id,id_tenaga_medis', 'user.tenaga_medis:id,data'])
                ->addSelect([
                    'last_event_status' => PengirimanEvent::query()
                        ->select('status')
                        ->whereColumn('pengiriman_id', 'pengiriman.id')
                        ->latest('id')
                        ->limit(1),
                    'last_event_note' => PengirimanEvent::query()
                        ->select('note')
                        ->whereColumn('pengiriman_id', 'pengiriman.id')
                        ->latest('id')
                        ->limit(1),
                    'last_event_at' => PengirimanEvent::query()
                        ->select('created_at')
                        ->whereColumn('pengiriman_id', 'pengiriman.id')
                        ->latest('id')
                        ->limit(1),
                ])
                ->findOrFail($validated['id']);

            $lastStatus = (int) ($pengiriman->last_event_status ?? 0);

            $events = PengirimanEvent::query()
                ->where('pengiriman_id', $pengiriman->id)
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->get(['id', 'status', 'note', 'created_at', 'created_by']);

            $eventCreatorIds = $events
                ->pluck('created_by')
                ->filter(fn($id): bool => !is_null($id))
                ->map(fn($id): int => (int) $id)
                ->unique()
                ->values();

            $eventCreators = User::query()
                ->with(['tenaga_medis:id,data'])
                ->whereIn('id', $eventCreatorIds)
                ->get(['id', 'id_tenaga_medis'])
                ->keyBy('id');

            $unit_rawatIds = $eventCreators
                ->map(function (User $user): int {
                    $unit_rawatId = $user->tenaga_medis?->data['unit_rawat'] ?? null;

                    return is_numeric($unit_rawatId) ? (int) $unit_rawatId : 0;
                })
                ->filter(fn(int $id): bool => $id > 0)
                ->unique()
                ->values();

            $unit_rawatMap = UnitRawat::query()
                ->whereIn('id', $unit_rawatIds)
                ->pluck('nama', 'id');

            $eventHistory = $events->map(function (PengirimanEvent $event) use ($eventCreators, $unit_rawatMap, $pengiriman): array {
                $createdBy = !is_null($event->created_by) ? $eventCreators->get((int) $event->created_by) : null;
                $nama = (string) ($createdBy?->tenaga_medis?->data['nama'] ?? '-');
                $unit_rawatId = $createdBy?->tenaga_medis?->data['unit_rawat'] ?? null;
                $resolvedUnitRawatId = is_numeric($unit_rawatId) ? (int) $unit_rawatId : 0;

                return [
                    'uid' => (string) $pengiriman->uid,
                    'status' => (int) $event->status,
                    'statusLabel' => statusLabel((int) $event->status),
                    'lokasi' => (string) ($unit_rawatMap->get($resolvedUnitRawatId) ?? '-'),
                    'validator' => $nama,
                    'note' => trim((string) ($event->note ?? '')),
                    'createdAt' => (string) ($event->created_at ?? ''),
                ];
            })->values();

            return response()->json([
                'status' => true,
                'message' => 'Detail monitoring pengiriman berhasil dimuat.',
                'data' => [
                    'id' => $pengiriman->id,
                    'uid' => (string) $pengiriman->uid,
                    'nan' => (string) ($pengiriman->id_nan ?? '-'),
                    'unit_rawat' => $pengiriman->alokasi?->unit_rawat?->nama ?? '-',
                    'periode' => $pengiriman->alokasi?->periode ?? '-',
                    'createdBy' => (string) ($pengiriman->user?->tenaga_medis?->data['nama'] ?? '-'),
                    'status' => $lastStatus,
                    'statusLabel' => statusLabel($lastStatus),
                    'note' => trim((string) ($pengiriman->last_event_note ?? '')),
                    'updatedAt' => (string) ($pengiriman->last_event_at ?? $pengiriman->updated_at ?? $pengiriman->created_at ?? ''),
                    'createdAt' => (string) ($pengiriman->created_at ?? ''),
                    'eventHistory' => $eventHistory,
                ],
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk mengakses data ini.',
            ], 403);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }
}
