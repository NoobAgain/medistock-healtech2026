# Monitoring Pengajuan Alokasi (Nominatif) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menambahkan halaman “Monitoring Pengajuan Alokasi (Nominatif)” yang menampilkan rekap status per unit_rawat/periode dan detail tracking per NAN (mirip “Monitoring Distribusi”), termasuk riwayat validasi (ACC/ACC2) yang dapat diaudit.

**Architecture:** Inertia (Vue 3) menampilkan halaman baru dengan 2 panel (rekap + detail). Backend Laravel menyediakan 3 endpoint JSON (`periode-options`, `summary`, `detail`) + 1 endpoint list NAN untuk dropdown. Riwayat validasi diambil dari `audit_logs` melalui trait audit pada model `Alokasi`.

**Tech Stack:** Laravel 12, Inertia Vue 3 + TypeScript, shadcn/ui components (Stepper/Badge), PostgreSQL (audit_logs).

---

## Peta File (yang akan dibuat/diubah)

**Backend**
- Create: `app/Http/Controllers/pages/MonitoringAlokasi.php`
- Modify: `routes/web.php` (tambah route baru)
- Modify: `app/Models/Alokasi.php` (aktifkan audit log via trait)
- Modify: `app/Policies/PageAlokasi.php` (otorisasi ACC/ACC2 dipisah dari edit)
- Modify: `app/Http/Controllers/pages/DataAlokasi.php` (gunakan gate ACC khusus)

**Frontend**
- Create: `resources/js/pages/MonitoringAlokasi.vue`
- Modify: `resources/js/routes/index.ts` (tambah definisi route baru untuk konsisten dengan pola project)
- (Build output) `public/build/*` akan berubah setelah `npm run build`.

**Verifikasi**
- Jalankan ulang build asset: `npm run build`
- Rebuild image Docker: `docker compose build app nginx`
- Jalankan stack: `docker compose up -d`

---

## Task 1: Backend — Halaman & API Monitoring Alokasi

**Files:**
- Create: `app/Http/Controllers/pages/MonitoringAlokasi.php`
- Modify: `routes/web.php`

- [ ] **Step 1: Buat controller `MonitoringAlokasi` (Inertia + 4 endpoint JSON)**

```php
<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\Alokasi;
use App\Models\AuditLog;
use App\Models\Periode;
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
     * Halaman utama monitoring pengajuan alokasi.
     * Catatan: user wajib memilih periode di UI sebelum data dimuat.
     */
    public function index()
    {
        Gate::authorize('viewAny', Alokasi::class);
        AuditService::logMenuAccess('Monitoring Pengajuan Alokasi');

        return Inertia::render('MonitoringAlokasi');
    }

    /**
     * Ambil daftar periode sebagai opsi dropdown (manual select).
     */
    public function periodeOptions(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewAny', Alokasi::class);

            $rows = Periode::query()
                ->orderByDesc('id')
                ->get(['id', 'nama'])
                ->map(fn (Periode $p): array => ['id' => (int) $p->id, 'nama' => (string) $p->nama])
                ->values();

            return response()->json([
                'status' => true,
                'message' => 'Berhasil memuat periode.',
                'data' => $rows,
            ]);
        } catch (AuthorizationException $e) {
            return response()->json(['status' => false, 'message' => 'Anda tidak memiliki izin.'], 403);
        } catch (\Throwable $e) {
            return response()->json(['status' => false, 'message' => 'Terjadi kesalahan sistem.'], 500);
        }
    }

    /**
     * Rekap per unit_rawat: open/acc/acc2/lock untuk periode terpilih.
     */
    public function summary(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewAny', Alokasi::class);
            $validated = $request->validate([
                'periode_id' => ['required', 'integer', 'exists:periode,id'],
            ]);

            // Sama seperti DataAlokasi::dataAlokasi (LOCK jika sudah ada item_inventory).
            $statusGridSql = "CASE WHEN EXISTS (
                SELECT 1
                FROM alokasi_detail
                INNER JOIN item_inventory ON item_inventory.id_detail_alokasi = alokasi_detail.id
                WHERE alokasi_detail.alokasi_nan = alokasi.nan
            ) THEN '2' ELSE alokasi.status END";

            $rows = Alokasi::query()
                ->selectRaw('alokasi.unit_rawat_id as unit_rawat_id')
                ->selectRaw($statusGridSql . ' as status_grid')
                ->where('alokasi.periode_id', (int) $validated['periode_id'])
                ->groupBy('alokasi.unit_rawat_id')
                ->groupByRaw($statusGridSql)
                ->selectRaw('COUNT(*)::int as jumlah')
                ->get()
                ->groupBy('unit_rawat_id');

            $unit_rawatMap = UnitRawat::query()
                ->whereIn('id', $rows->keys()->values())
                ->pluck('nama', 'id');

            $normalized = $rows->map(function ($items, $unit_rawatId) use ($unit_rawatMap): array {
                $counter = [
                    'open' => 0,
                    'acc' => 0,
                    'acc2' => 0,
                    'lock' => 0,
                ];

                foreach ($items as $item) {
                    $status = (string) ($item->status_grid ?? '');
                    $jumlah = (int) ($item->jumlah ?? 0);
                    if ($status === '1') $counter['open'] += $jumlah;
                    if ($status === '100') $counter['acc'] += $jumlah;
                    if ($status === '110') $counter['acc2'] += $jumlah;
                    if ($status === '2') $counter['lock'] += $jumlah;
                }

                return [
                    'unit_rawatId' => (int) $unit_rawatId,
                    'unit_rawatNama' => (string) ($unit_rawatMap->get((int) $unit_rawatId) ?? '-'),
                    ...$counter,
                ];
            })->values();

            return response()->json([
                'status' => true,
                'message' => 'Rekap monitoring alokasi berhasil dimuat.',
                'data' => $normalized,
            ]);
        } catch (AuthorizationException $e) {
            return response()->json(['status' => false, 'message' => 'Anda tidak memiliki izin.'], 403);
        } catch (ValidationException $e) {
            return response()->json(['status' => false, 'message' => 'Validasi gagal.', 'errors' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return response()->json(['status' => false, 'message' => 'Terjadi kesalahan sistem.'], 500);
        }
    }

    /**
     * Daftar NAN (untuk dropdown pencarian) pada periode terpilih.
     */
    public function listNan(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewAny', Alokasi::class);
            $validated = $request->validate([
                'periode_id' => ['required', 'integer', 'exists:periode,id'],
            ]);

            $statusGridSql = "CASE WHEN EXISTS (
                SELECT 1
                FROM alokasi_detail
                INNER JOIN item_inventory ON item_inventory.id_detail_alokasi = alokasi_detail.id
                WHERE alokasi_detail.alokasi_nan = alokasi.nan
            ) THEN '2' ELSE alokasi.status END";

            $rows = Alokasi::query()
                ->select(['alokasi.id', 'alokasi.nan', 'alokasi.unit_rawat_id', 'alokasi.periode'])
                ->selectRaw($statusGridSql . ' as status_grid')
                ->with(['unit_rawat:id,nama'])
                ->where('alokasi.periode_id', (int) $validated['periode_id'])
                ->orderByDesc('alokasi.id')
                ->limit(500)
                ->get()
                ->map(function (Alokasi $a): array {
                    return [
                        'id' => (int) $a->id,
                        'nan' => (string) $a->nan,
                        'unit_rawat' => (string) ($a->unit_rawat?->nama ?? '-'),
                        'status' => (string) ($a->status_grid ?? $a->status),
                        'label' => trim((string) $a->nan . ' - ' . (string) ($a->unit_rawat?->nama ?? '-')),
                    ];
                })
                ->values();

            return response()->json([
                'status' => true,
                'message' => 'Daftar NAN berhasil dimuat.',
                'data' => $rows,
            ]);
        } catch (AuthorizationException $e) {
            return response()->json(['status' => false, 'message' => 'Anda tidak memiliki izin.'], 403);
        } catch (ValidationException $e) {
            return response()->json(['status' => false, 'message' => 'Validasi gagal.', 'errors' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return response()->json(['status' => false, 'message' => 'Terjadi kesalahan sistem.'], 500);
        }
    }

    /**
     * Detail tracking per NAN + riwayat perubahan status (audit_logs).
     */
    public function detail(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewAny', Alokasi::class);
            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:alokasi,id'],
            ]);

            $alokasi = Alokasi::query()
                ->with(['unit_rawat:id,nama', 'user:id,id_tenaga_medis', 'user.tenaga_medis:id,data'])
                ->findOrFail((int) $validated['id']);

            $auditRows = AuditLog::query()
                ->where('model_type', Alokasi::class)
                ->where('model_id', $alokasi->id)
                ->whereIn('action', ['created', 'updated'])
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->get(['id', 'user_id', 'action', 'metadata', 'created_at']);

            $userIds = $auditRows->pluck('user_id')->filter()->unique()->values();

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
                ->filter(fn (int $id): bool => $id > 0)
                ->unique()
                ->values();

            $unit_rawatMap = UnitRawat::query()
                ->whereIn('id', $unit_rawatIds)
                ->pluck('nama', 'id');

            $history = $auditRows
                ->filter(function (AuditLog $log): bool {
                    // hanya tampilkan yang mengubah field status
                    $changed = $log->metadata['changed'] ?? [];
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
                        'oleh' => $nama,
                        'lokasi' => (string) ($unit_rawatMap->get($resolvedUnitRawatId) ?? '-'),
                        'dari' => is_null($before) ? '-' : (string) $before,
                        'ke' => is_null($after) ? '-' : (string) $after,
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
                    'status' => (string) $alokasi->status,
                    'createdAt' => (string) ($alokasi->created_at ?? ''),
                    'updatedAt' => (string) ($alokasi->updated_at ?? ''),
                    'history' => $history,
                ],
            ]);
        } catch (AuthorizationException $e) {
            return response()->json(['status' => false, 'message' => 'Anda tidak memiliki izin.'], 403);
        } catch (ValidationException $e) {
            return response()->json(['status' => false, 'message' => 'Validasi gagal.', 'errors' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return response()->json(['status' => false, 'message' => 'Terjadi kesalahan sistem.'], 500);
        }
    }
}
```

- [ ] **Step 2: Tambahkan route di `routes/web.php`**

Tambahkan di dalam group `Route::middleware(['auth'])->group(function () { ... })`:

```php
use App\Http\Controllers\pages\MonitoringAlokasi;

Route::get('/monitoring-alokasi', [MonitoringAlokasi::class, 'index'])->name('monitoring-alokasi');
Route::post('/monitoring-alokasi-periode-options', [MonitoringAlokasi::class, 'periodeOptions'])->name('monitoring-alokasi-periode-options');
Route::post('/monitoring-alokasi-summary', [MonitoringAlokasi::class, 'summary'])->name('monitoring-alokasi-summary');
Route::post('/monitoring-alokasi-listnan', [MonitoringAlokasi::class, 'listNan'])->name('monitoring-alokasi-listnan');
Route::post('/monitoring-alokasi-detail', [MonitoringAlokasi::class, 'detail'])->name('monitoring-alokasi-detail');
```

- [ ] **Step 3: Verifikasi route terdaftar**

Run:
```bash
docker compose exec app php artisan route:list | grep monitoring-alokasi
```

Expected: muncul 5 route baru.

---

## Task 2: Backend — Audit status alokasi & perbaikan kontrol akses ACC/ACC2

**Files:**
- Modify: `app/Models/Alokasi.php`
- Modify: `app/Policies/PageAlokasi.php`
- Modify: `app/Http/Controllers/pages/DataAlokasi.php`

- [ ] **Step 1: Aktifkan audit log pada model Alokasi**

Di `app/Models/Alokasi.php` tambahkan:

```php
use App\Trait\HasAuditLog;

class Alokasi extends Model
{
    use HasAuditLog;
    // ...
}
```

- [ ] **Step 2: Tambahkan policy khusus untuk ACC/ACC2**

Di `app/Policies/PageAlokasi.php` tambahkan method:

```php
public function accRencana(User $user, Alokasi $alokasi): bool
{
    return $user->can('menu.alokasi.accrencana');
}

public function accRencanaPusat(User $user, Alokasi $alokasi): bool
{
    return $user->can('menu.alokasi.accrencanapusat');
}
```

- [ ] **Step 3: Ubah `DataAlokasi::acc` dan `DataAlokasi::acc2` agar pakai gate yang tepat**

Ganti:
```php
Gate::authorize('update', $alokasi);
```

Menjadi:
```php
Gate::authorize('accRencana', $alokasi); // untuk acc()
Gate::authorize('accRencanaPusat', $alokasi); // untuk acc2()
```

Run verifikasi minimal (manual):
- Login user tanpa permission ACC → pastikan endpoint acc/acc2 ditolak.

---

## Task 3: Frontend — Halaman Monitoring Pengajuan Alokasi

**Files:**
- Create: `resources/js/pages/MonitoringAlokasi.vue`
- Modify: `resources/js/routes/index.ts`

- [ ] **Step 1: Tambahkan definisi route di `resources/js/routes/index.ts`**

Tempatkan setelah blok `monitoringDetail` agar berdekatan:

```ts
export const monitoringAlokasi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
  url: monitoringAlokasi.url(options),
  method: 'get',
})
monitoringAlokasi.definition = { methods: ['get','head'], url: '/monitoring-alokasi' } satisfies RouteDefinition<['get','head']>
monitoringAlokasi.url = (options?: RouteQueryOptions) => monitoringAlokasi.definition.url + queryParams(options)
monitoringAlokasi.get = (options?: RouteQueryOptions) => ({ url: monitoringAlokasi.url(options), method: 'get' })
monitoringAlokasi.head = (options?: RouteQueryOptions) => ({ url: monitoringAlokasi.url(options), method: 'head' })

export const monitoringAlokasiPeriodeOptions = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
  url: monitoringAlokasiPeriodeOptions.url(options),
  method: 'post',
})
monitoringAlokasiPeriodeOptions.definition = { methods: ['post'], url: '/monitoring-alokasi-periode-options' } satisfies RouteDefinition<['post']>
monitoringAlokasiPeriodeOptions.url = (options?: RouteQueryOptions) => monitoringAlokasiPeriodeOptions.definition.url + queryParams(options)
monitoringAlokasiPeriodeOptions.post = (options?: RouteQueryOptions) => ({ url: monitoringAlokasiPeriodeOptions.url(options), method: 'post' })

export const monitoringAlokasiSummary = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
  url: monitoringAlokasiSummary.url(options),
  method: 'post',
})
monitoringAlokasiSummary.definition = { methods: ['post'], url: '/monitoring-alokasi-summary' } satisfies RouteDefinition<['post']>
monitoringAlokasiSummary.url = (options?: RouteQueryOptions) => monitoringAlokasiSummary.definition.url + queryParams(options)
monitoringAlokasiSummary.post = (options?: RouteQueryOptions) => ({ url: monitoringAlokasiSummary.url(options), method: 'post' })

export const monitoringAlokasiListnan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
  url: monitoringAlokasiListnan.url(options),
  method: 'post',
})
monitoringAlokasiListnan.definition = { methods: ['post'], url: '/monitoring-alokasi-listnan' } satisfies RouteDefinition<['post']>
monitoringAlokasiListnan.url = (options?: RouteQueryOptions) => monitoringAlokasiListnan.definition.url + queryParams(options)
monitoringAlokasiListnan.post = (options?: RouteQueryOptions) => ({ url: monitoringAlokasiListnan.url(options), method: 'post' })

export const monitoringAlokasiDetail = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
  url: monitoringAlokasiDetail.url(options),
  method: 'post',
})
monitoringAlokasiDetail.definition = { methods: ['post'], url: '/monitoring-alokasi-detail' } satisfies RouteDefinition<['post']>
monitoringAlokasiDetail.url = (options?: RouteQueryOptions) => monitoringAlokasiDetail.definition.url + queryParams(options)
monitoringAlokasiDetail.post = (options?: RouteQueryOptions) => ({ url: monitoringAlokasiDetail.url(options), method: 'post' })
```

- [ ] **Step 2: Buat halaman `MonitoringAlokasi.vue` (rekap + detail)**

Struktur minimal:
- Dropdown periode (wajib dipilih)
- Panel rekap per unit_rawat (table sederhana)
- Panel detail: dropdown NAN + stepper + tabel riwayat audit

Catatan mapping step:
- `status === '1'` → Step 1 (Open)
- `status === '100'` → Step 2 (ACC Rencana)
- `status === '110'` → Step 3 (ACC Pusat/Pabrik)
- `LOCK` ditentukan dari API (jika ingin, tambahkan `status_grid` ke detail; jika belum, tampilkan Step 4 hanya jika `history` menunjukkan integrasi, atau tampilkan badge LOCK saat API summary/listNan status '2')

---

## Task 4: Build & Verifikasi End-to-End (Docker)

**Files:**
- Modify output build: `public/build/*`

- [ ] **Step 1: Build asset frontend**

Run:
```bash
npm run build
```

- [ ] **Step 2: Rebuild image**

Run:
```bash
docker compose build app nginx
docker compose up -d
```

- [ ] **Step 3: Smoke test**

1) Buka `https://localhost/`
2) Login
3) Akses `https://localhost/monitoring-alokasi`
4) Pilih periode → cek:
   - tabel rekap terisi
   - dropdown NAN terisi
   - detail menampilkan stepper + riwayat status (jika ada audit)

---

## Self-review checklist (wajib)

- [ ] Semua endpoint menggunakan validasi input (`periode_id`, `id`).
- [ ] ACC/ACC2 tidak lagi memakai permission edit, tetapi permission ACC sesuai role.
- [ ] Halaman monitoring tidak menampilkan data sebelum periode dipilih.
- [ ] Tidak ada perubahan yang mengandung kredensial / isi `.env` di repository.

