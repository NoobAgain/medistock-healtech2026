<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\Alokasi;
use App\Models\AuditLog;
use App\Models\Faskes;
use App\Models\Periode;
use App\Models\TenagaMedis;
use App\Models\UnitRawat;
use App\Models\User;
use App\Services\AuditService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class MonitoringAlokasi extends Controller
{
    /**
     * Bangun mapping unit_rawat_id -> unit_rawat_induk_id berdasarkan data tenaga_medis.
     *
     * Pada aplikasi saat ini, relasi formal unit_rawat->faskes_id tidak ada di tabel `unit_rawat`,
     * tetapi tersimpan di `tenaga_medis.data['faskes']` dan `tenaga_medis.data['unit_rawat']`.
     * Istilah "UnitRawat Induk" di UI akan memakai master `faskes` (tanpa menyebut kata faskes).
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
            arsort($indukCounts); // paling banyak di depan
            $topIndukId = array_key_first($indukCounts);
            if (is_numeric($topIndukId)) {
                $map[(int) $unit_rawatId] = (int) $topIndukId;
            }
        }

        return $map;
    }

    /**
     * Halaman monitoring pengajuan alokasi (nominatif).
     *
     * Catatan UX: sesuai arahan penguji, user akan memilih periode terlebih dahulu,
     * lalu UI memuat rekap per unit_rawat dan detail tracking per NAN.
     */
    public function index()
    {
        Gate::authorize('viewAny', Alokasi::class);
        AuditService::logMenuAccess('Monitoring Pengajuan Alokasi');

        return Inertia::render('MonitoringAlokasi');
    }

    /**
     * Ambil daftar periode sebagai opsi dropdown.
     * Dipisah endpoint-nya agar UI bisa "manual select periode" sebelum memuat data besar.
     */
    public function periodeOptions(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewAny', Alokasi::class);

            $rows = Periode::query()
                ->orderByDesc('id')
                ->get(['id', 'nama'])
                ->map(fn(Periode $periode): array => [
                    'id' => (int) $periode->id,
                    'nama' => (string) $periode->nama,
                ])
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
     * Rekap status pengajuan per unit_rawat untuk periode terpilih.
     *
     * Output dipakai untuk menjawab kebutuhan:
     * - mana unit_rawat yang belum tervalidasi (Open)
     * - mana yang menunggu validasi pusat (ACC)
     * - mana yang sudah final (ACC2)
     * - mana yang sudah LOCK (sudah terintegrasi dengan item inventory)
     */
    public function summary(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewAny', Alokasi::class);

            $validated = $request->validate([
                'periode_id' => ['required', 'integer', 'exists:periode,id'],
            ]);

            // Sama dengan DataAlokasi::dataAlokasi — LOCK jika sudah ada item_inventory.
            $statusGridSql = "CASE WHEN EXISTS (
                SELECT 1
                FROM alokasi_detail
                INNER JOIN item_inventory ON item_inventory.id_detail_alokasi = alokasi_detail.id
                WHERE alokasi_detail.alokasi_nan = alokasi.nan
            ) THEN '2' ELSE alokasi.status END";

            $raw = Alokasi::query()
                ->selectRaw('alokasi.unit_rawat_id as unit_rawat_id')
                ->selectRaw($statusGridSql . ' as status_grid')
                ->selectRaw('COUNT(*)::int as jumlah')
                ->where('alokasi.periode_id', (int) $validated['periode_id'])
                ->groupBy('alokasi.unit_rawat_id')
                ->groupByRaw($statusGridSql)
                ->get();

            $grouped = $raw->groupBy('unit_rawat_id');

            $totals = Alokasi::query()
                ->selectRaw('alokasi.unit_rawat_id as unit_rawat_id')
                ->selectRaw('COUNT(*)::int as total_pengajuan')
                ->selectRaw('MAX(alokasi.updated_at) as terakhir_diperbarui')
                ->where('alokasi.periode_id', (int) $validated['periode_id'])
                ->groupBy('alokasi.unit_rawat_id')
                ->get()
                ->keyBy('unit_rawat_id');

            // Mapping unit_rawat -> unit_rawat induk (berbasis data tenaga_medis)
            $unit_rawatToInduk = $this->buildUnitRawatToIndukMap();

            // Agregasi ke level "UnitRawat Induk"
            $indukAgg = []; // [indukId => row]

            foreach ($totals as $unit_rawatId => $totalItem) {
                $unit_rawatId = (int) $unit_rawatId;
                $indukId = (int) ($unit_rawatToInduk[$unit_rawatId] ?? 0);
                if ($indukId <= 0) {
                    continue;
                }

                $items = $grouped->get($unit_rawatId, collect());
                $counter = [
                    'open' => 0,
                    'acc' => 0,
                    'acc2' => 0,
                    'lock' => 0,
                ];

                foreach ($items as $item) {
                    $status = (string) ($item->status_grid ?? '');
                    $jumlah = (int) ($item->jumlah ?? 0);

                    if ($status === '1') {
                        $counter['open'] += $jumlah;
                    } elseif ($status === '100') {
                        $counter['acc'] += $jumlah;
                    } elseif ($status === '110') {
                        $counter['acc2'] += $jumlah;
                    } elseif ($status === '2') {
                        $counter['lock'] += $jumlah;
                    }
                }

                $row = $indukAgg[$indukId] ?? [
                    'unit_rawatId' => $indukId, // dipakai di UI sebagai "UnitRawat Induk"
                    'unit_rawatNama' => '-',    // diisi setelah load Faskes
                    'totalPengajuan' => 0,
                    'terakhirDiperbarui' => '',
                    'open' => 0,
                    'acc' => 0,
                    'acc2' => 0,
                    'lock' => 0,
                ];

                $row['totalPengajuan'] += (int) ($totalItem->total_pengajuan ?? 0);
                $row['open'] += $counter['open'];
                $row['acc'] += $counter['acc'];
                $row['acc2'] += $counter['acc2'];
                $row['lock'] += $counter['lock'];

                $last = (string) ($totalItem->terakhir_diperbarui ?? '');
                if ($last && (!$row['terakhirDiperbarui'] || $last > $row['terakhirDiperbarui'])) {
                    $row['terakhirDiperbarui'] = $last;
                }

                $indukAgg[$indukId] = $row;
            }

            $indukIds = collect(array_keys($indukAgg))->values();
            $indukNameMap = Faskes::query()
                ->whereIn('id', $indukIds)
                ->pluck('nama', 'id');

            $rows = collect(array_values($indukAgg))
                ->map(function (array $row) use ($indukNameMap): array {
                    $row['unit_rawatNama'] = (string) ($indukNameMap->get((int) $row['unit_rawatId']) ?? '-');
                    return $row;
                })
                ->sortBy('unit_rawatNama')
                ->values();

            return response()->json([
                'status' => true,
                'message' => 'Rekap monitoring alokasi berhasil dimuat.',
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
     * Daftar NAN untuk dropdown pencarian (dibatasi 500 row agar respons UI tetap ringan).
     */
    public function listNan(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewAny', Alokasi::class);

            $validated = $request->validate([
                'periode_id' => ['required', 'integer', 'exists:periode,id'],
                'unit_rawat_id' => ['nullable', 'integer'],
                'unit_rawat_induk_id' => ['nullable', 'integer'],
            ]);

            $statusGridSql = "CASE WHEN EXISTS (
                SELECT 1
                FROM alokasi_detail
                INNER JOIN item_inventory ON item_inventory.id_detail_alokasi = alokasi_detail.id
                WHERE alokasi_detail.alokasi_nan = alokasi.nan
            ) THEN '2' ELSE alokasi.status END";

            $query = Alokasi::query()
                ->select(['alokasi.id', 'alokasi.nan', 'alokasi.unit_rawat_id', 'alokasi.periode'])
                ->selectRaw($statusGridSql . ' as status_grid')
                ->with(['unit_rawat:id,nama'])
                ->where('alokasi.periode_id', (int) $validated['periode_id'])
                ->orderByDesc('alokasi.id');

            $unit_rawatId = isset($validated['unit_rawat_id']) && is_numeric($validated['unit_rawat_id']) ? (int) $validated['unit_rawat_id'] : 0;
            $indukId = isset($validated['unit_rawat_induk_id']) && is_numeric($validated['unit_rawat_induk_id']) ? (int) $validated['unit_rawat_induk_id'] : 0;

            if ($unit_rawatId > 0) {
                $query->where('alokasi.unit_rawat_id', $unit_rawatId);
            } elseif ($indukId > 0) {
                $unit_rawatToInduk = $this->buildUnitRawatToIndukMap();

                $allowedUnitRawatIds = Alokasi::query()
                    ->where('alokasi.periode_id', (int) $validated['periode_id'])
                    ->pluck('unit_rawat_id')
                    ->map(fn($id) => (int) $id)
                    ->unique()
                    ->filter(fn(int $sid) => ($unit_rawatToInduk[$sid] ?? 0) === $indukId)
                    ->values();

                if ($allowedUnitRawatIds->isNotEmpty()) {
                    $query->whereIn('alokasi.unit_rawat_id', $allowedUnitRawatIds);
                } else {
                    // tidak ada unit_rawat yang cocok, kembalikan kosong
                    return response()->json([
                        'status' => true,
                        'message' => 'Daftar pengajuan berhasil dimuat.',
                        'data' => [],
                    ]);
                }
            }

            $rows = $query
                ->limit(500)
                ->get()
                ->map(function (Alokasi $alokasi): array {
                    $unit_rawat = (string) ($alokasi->unit_rawat?->nama ?? '-');

                    return [
                        'id' => (int) $alokasi->id,
                        'nan' => (string) $alokasi->nan,
                        'unit_rawatId' => (int) ($alokasi->unit_rawat_id ?? 0),
                        'unit_rawat' => $unit_rawat,
                        'status' => (string) ($alokasi->status_grid ?? $alokasi->status),
                        'label' => trim((string) $alokasi->nan . ' - ' . $unit_rawat),
                    ];
                })
                ->values();

            return response()->json([
                'status' => true,
                'message' => 'Daftar pengajuan berhasil dimuat.',
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
     * Daftar UnitRawat Induk untuk filter (diambil dari master `faskes`, tapi label UI = UnitRawat Induk).
     */
    public function satuanIndukOptions(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewAny', Alokasi::class);

            $validated = $request->validate([
                'periode_id' => ['required', 'integer', 'exists:periode,id'],
            ]);

            $unit_rawatToInduk = $this->buildUnitRawatToIndukMap();

            $unit_rawatIds = Alokasi::query()
                ->where('alokasi.periode_id', (int) $validated['periode_id'])
                ->pluck('unit_rawat_id')
                ->map(fn($id) => (int) $id)
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
     * Daftar UnitRawat Bawah untuk filter, berdasarkan UnitRawat Induk terpilih.
     */
    public function satuanBawahOptions(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewAny', Alokasi::class);

            $validated = $request->validate([
                'periode_id' => ['required', 'integer', 'exists:periode,id'],
                'unit_rawat_induk_id' => ['required', 'integer', 'exists:faskes,id'],
            ]);

            $indukId = (int) $validated['unit_rawat_induk_id'];
            $unit_rawatToInduk = $this->buildUnitRawatToIndukMap();

            $unit_rawatIds = Alokasi::query()
                ->where('alokasi.periode_id', (int) $validated['periode_id'])
                ->pluck('unit_rawat_id')
                ->map(fn($id) => (int) $id)
                ->unique()
                ->filter(fn(int $sid) => ($unit_rawatToInduk[$sid] ?? 0) === $indukId)
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
     * Detail tracking per NAN.
     *
     * Mengembalikan:
     * - status terkini (status_grid: 1/100/110/2(lock))
     * - history perubahan status dari audit_logs (siapa, kapan, dari status apa ke apa)
     */
    public function detail(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewAny', Alokasi::class);

            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:alokasi,id'],
            ]);

            $statusGridSql = "CASE WHEN EXISTS (
                SELECT 1
                FROM alokasi_detail
                INNER JOIN item_inventory ON item_inventory.id_detail_alokasi = alokasi_detail.id
                WHERE alokasi_detail.alokasi_nan = alokasi.nan
            ) THEN '2' ELSE alokasi.status END";

            $alokasi = Alokasi::query()
                ->select('alokasi.*')
                ->selectRaw($statusGridSql . ' as status_grid')
                ->with(['unit_rawat:id,nama', 'user:id,id_tenaga_medis', 'user.tenaga_medis:id,data'])
                ->findOrFail((int) $validated['id']);

            $auditRows = AuditLog::query()
                ->where('model_type', Alokasi::class)
                ->where('model_id', $alokasi->id)
                ->whereIn('action', ['created', 'updated'])
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->get(['id', 'user_id', 'action', 'metadata', 'created_at']);

            $userIds = $auditRows
                ->pluck('user_id')
                ->filter(fn($id): bool => !is_null($id))
                ->map(fn($id): int => (int) $id)
                ->unique()
                ->values();

            $users = User::query()
                ->with(['tenaga_medis:id,data'])
                ->whereIn('id', $userIds)
                ->get(['id', 'id_tenaga_medis'])
                ->keyBy('id');

            $unit_rawatIds = $users
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

            $history = $auditRows
                ->filter(function (AuditLog $log): bool {
                    $changed = $log->metadata['changed'] ?? null;

                    return is_array($changed) && in_array('status', $changed, true);
                })
                ->map(function (AuditLog $log) use ($users, $unit_rawatMap): array {
                    $user = $log->user_id ? $users->get((int) $log->user_id) : null;
                    $nama = (string) ($user?->tenaga_medis?->data['nama'] ?? '-');
                    $unit_rawatId = $user?->tenaga_medis?->data['unit_rawat'] ?? null;
                    $resolvedUnitRawatId = is_numeric($unit_rawatId) ? (int) $unit_rawatId : 0;

                    $before = $log->metadata['before']['status'] ?? null;
                    $after = $log->metadata['after']['status'] ?? null;

                    return [
                        'id' => (int) $log->id,
                        'validator' => $nama,
                        'lokasi' => (string) ($unit_rawatMap->get($resolvedUnitRawatId) ?? '-'),
                        'dari' => $this->statusLabelForUi($before),
                        'ke' => $this->statusLabelForUi($after),
                        'keterangan' => $this->historyLabel($before, $after),
                        'waktu' => (string) ($log->created_at ?? ''),
                    ];
                })
                ->values();

            return response()->json([
                'status' => true,
                'message' => 'Detail monitoring alokasi berhasil dimuat.',
                'data' => [
                    'id' => (int) $alokasi->id,
                    'nan' => (string) $alokasi->nan,
                    'periode' => (string) ($alokasi->periode ?? '-'),
                    'unit_rawat' => (string) ($alokasi->unit_rawat?->nama ?? '-'),
                    'createdBy' => (string) ($alokasi->user?->tenaga_medis?->data['nama'] ?? '-'),
                    'status' => (string) ($alokasi->status_grid ?? $alokasi->status),
                    'createdAt' => (string) ($alokasi->created_at ?? ''),
                    'updatedAt' => (string) ($alokasi->updated_at ?? ''),
                    'history' => $history,
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

    /**
     * Ubah kode status menjadi label UI yang mudah dipahami pengguna.
     */
    private function statusLabelForUi(?string $status): string
    {
        return match ((string) $status) {
            '1' => 'Menunggu Validasi',
            '100' => 'Disetujui UnitRawat Induk',
            '110' => 'Disetujui Pusbekangad',
            '2' => 'Validasi Berhasil',
            default => is_null($status) || $status === '' ? '-' : (string) $status,
        };
    }

    /**
     * Buat keterangan ringkas untuk riwayat perubahan status.
     */
    private function historyLabel(?string $before, ?string $after): string
    {
        $from = $this->statusLabelForUi($before);
        $to = $this->statusLabelForUi($after);

        if ($from === '-' && $to !== '-') {
            return 'Data dibuat dengan status ' . $to;
        }

        return 'Status berubah dari ' . $from . ' menjadi ' . $to;
    }
}
