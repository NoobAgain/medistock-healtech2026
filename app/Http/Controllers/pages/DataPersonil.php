<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTenagaMedisRequest;
use App\Models\Faskes;
use App\Models\TenagaMedis;
use App\Models\UnitRawat;
use App\Models\User;
use App\Services\AuditService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class DataPersonil extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', TenagaMedis::class);
        AuditService::logMenuAccess('Data TenagaMedis');
        return Inertia::render('DataPersonil');
    }

    public function listDataPersonil(Request $request)
    {
        try {
            Gate::authorize('viewAny', TenagaMedis::class);

            $validated = $request->validate([
                'page' => ['nullable', 'integer', 'min:1'],
                'perPage' => ['nullable', 'integer', 'min:1', 'max:100'],
                'sortField' => ['nullable', 'string'],
                'sortDirection' => ['nullable', 'string', 'in:asc,desc'],
                'filterModel' => ['nullable', 'array'],
                'advancedFilterModel' => ['nullable', 'array'],
            ]);
            $page = (int) ($validated['page'] ?? 1);
            $perPage = (int) ($validated['perPage'] ?? 10);
            $requestedSortField = $validated['sortField'] ?? 'id';
            $sortDirection = $validated['sortDirection'] ?? 'asc';
            $advancedFilterModel = $validated['advancedFilterModel'] ?? normalizeFilterModel($validated['filterModel'] ?? null);

            $sortField = match ($requestedSortField) {
                default => $requestedSortField,
            };

            $query = TenagaMedis::query();
            if (is_array($advancedFilterModel)) {
                $value = $advancedFilterModel['filter'];
                $cleanValue = trim($value);

                $id_hash = hash_hmac('sha256', $cleanValue, config('app.key'));
                $query->where('id_hash', 'ilike', $id_hash);
            }

            $currentUser = $request->user();
            $canManageRoles = $currentUser?->can('system.manage_roles') ?? false;

            if ($canManageRoles) {
                $paginatedRoles = $query->paginate($perPage, ['*'], 'page', $page);
            } else {
                $currentUnitRawatId = $currentUser?->tenaga_medis?->data['unit_rawat'] ?? null;
                $currentFaskesId = $currentUser?->tenaga_medis?->data['faskes'] ?? null;

                $filteredRoles = $query->get()->filter(function (TenagaMedis $tenaga_medis) use ($currentFaskesId, $currentUnitRawatId): bool {
                    $tenaga_medisFaskes = (string) ($tenaga_medis->data['faskes'] ?? '');
                    $tenaga_medisUnitRawat = (string) ($tenaga_medis->data['unit_rawat'] ?? '');

                    return $currentFaskesId !== null
                        && $currentUnitRawatId !== null
                        && $tenaga_medisFaskes === (string) $currentFaskesId
                        && $tenaga_medisUnitRawat === (string) $currentUnitRawatId;
                });

                $paginatedRoles = new LengthAwarePaginator(
                    $filteredRoles->slice(($page - 1) * $perPage, $perPage)->values(),
                    $filteredRoles->count(),
                    $perPage,
                    $page,
                    [
                        'path' => Paginator::resolveCurrentPath(),
                        'query' => $request->query(),
                    ]
                );
            }

            $rows = $paginatedRoles->getCollection()->map(function (TenagaMedis $tenaga_medis): array {
                $data = $tenaga_medis->toArray();
                $data['data']['pangkat'] = $tenaga_medis->pangkat();
                $data['data']['unit_rawat'] = $tenaga_medis->unit_rawat->nama ?? '';
                $data['data']['faskes'] = $tenaga_medis->faskes->nama ?? '';
                return $data;
            })->values();

            return response()->json([
                'status' => true,
                'message' => 'Berhasil memproses permintaan.',
                'data' => $rows,
                'total' => $paginatedRoles->total(),
                'page' => $paginatedRoles->currentPage(),
                'perPage' => $paginatedRoles->perPage(),
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

    public function deletePersonil(Request $request)
    {
        try {
            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:tenaga_medis,id'],
            ], [
                'id.integer' => 'ID harus berupa angka.',
                'id.exists'  => 'Data tenaga_medis tidak ditemukan.',
            ]);

            $userIsExist = User::where('id_tenaga_medis', $validated['id'])->exists();
            if ($userIsExist) {
                return response()->json([
                    'status' => false,
                    'message' => 'Maaf, TenagaMedis tidak dapat dihapus karena masih terhubung dengan akun pengguna.'
                ]);
            }

            $tenaga_medis = TenagaMedis::findOrFail($validated['id']);
            Gate::authorize('delete', $tenaga_medis);

            $tenaga_medis->delete();
            return response()->json([
                'status' => true,
                'message' => 'Data tenaga_medis berhasil dihapus.'
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk menghapus data ini.',
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

    public function personilBaru(Request $request)
    {

        $validated = $request->validate([
            'id' => ['sometimes', 'integer', Rule::exists('tenaga_medis', 'id')],
        ]);

        if (array_key_exists('id', $validated)) {
            $tenaga_medis = TenagaMedis::query()->findOrFail($validated['id']);
            Gate::authorize('update', $tenaga_medis);
        } else {
            Gate::authorize('create', TenagaMedis::class);
        }

        AuditService::logMenuAccess('Form Data TenagaMedis Baru');
        $dataFaskes = Faskes::get();

        $props = [
            'faskes' => $dataFaskes,
        ];

        if (array_key_exists('id', $validated)) {
            $tenaga_medis = TenagaMedis::query()->find($validated['id']);

            if ($tenaga_medis) {
                $props['id'] = $tenaga_medis->id;
                $props['data'] = $tenaga_medis->data;
            }
        }

        return Inertia::render('DataPersonilBaru', $props);
    }

    public function dataPersonilBaru(StoreTenagaMedisRequest $request)
    {
        try {
            $validated = $request->validated();
            AuditService::logMenuAccess('Tambah Data TenagaMedis Baru');

            $tenaga_medisId = $validated['id'] ?? null;
            $nrp = $validated['nrp'];
            $data = $validated;
            unset($data['id']);

            $id_hash = hash_hmac('sha256', $nrp, config('app.key'));
            if ($tenaga_medisId) {
                $tenaga_medis = TenagaMedis::query()->findOrFail($tenaga_medisId);
                Gate::authorize('update', $tenaga_medis);

                $duplicate = TenagaMedis::query()
                    ->where('id_hash', $id_hash)
                    ->where('id', '!=', $tenaga_medisId)
                    ->exists();

                if ($duplicate) {
                    return response()->json([
                        'status' => false,
                        'message' => 'NRP sudah digunakan oleh tenaga_medis lain.',
                    ]);
                }

                $tenaga_medis->update([
                    'id_hash' => $id_hash,
                    'data' => $data,
                ]);

                return response()->json([
                    'status' => true,
                    'message' => 'Data tenaga_medis/nakes berhasil diperbarui.',
                ]);
            }

            Gate::authorize('create', TenagaMedis::class);

            $exists = TenagaMedis::query()->where('id_hash', $id_hash)->exists();
            if ($exists) {
                return response()->json([
                    'status' => false,
                    'message' => 'Data tenaga_medis/nakes sudah tersedia',
                ]);
            }

            TenagaMedis::create([
                'id_hash' => $id_hash,
                'data' => $data,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Data tenaga_medis/nakes berhasil di tambahkan.',
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk menjalankan aksi ini.',
            ], 403);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }

    private function newDummyTenagaMedis()
    {
        $tenaga_medis = [
            [
                "nrp" => "12000000000001",
                "nama" => "Budi Santoso",
                "pangkat" => "pratu",
                "faskes" => "4",
                "unit_rawat" => "2",
                "lokasi" => "Semarang, Jawa Tengah",
                "posisi" => "Gudang Amunisi",
                "tgllahir" => "1996-05-12",
                "tglmasukunit_rawat" => "2022-03-10",
                "alamat" => "Jl. Pandanaran No.12 Semarang",
                "activeTenagaMedis" => true
            ],
            [
                "nrp" => "12000000000002",
                "nama" => "Rudi Hartono",
                "pangkat" => "praka",
                "faskes" => "5",
                "unit_rawat" => "3",
                "lokasi" => "Surabaya, Jawa Timur",
                "posisi" => "Gudang Logistik",
                "tgllahir" => "1994-08-21",
                "tglmasukunit_rawat" => "2021-06-15",
                "alamat" => "Jl. Darmo No.45 Surabaya",
                "activeTenagaMedis" => true
            ],
            [
                "nrp" => "12000000000003",
                "nama" => "Agus Prasetyo",
                "pangkat" => "pratu",
                "faskes" => "3",
                "unit_rawat" => "1",
                "lokasi" => "Bandung, Jawa Barat",
                "posisi" => "Gudang Perbekalan",
                "tgllahir" => "1997-11-02",
                "tglmasukunit_rawat" => "2023-01-20",
                "alamat" => "Jl. Asia Afrika No.8 Bandung",
                "activeTenagaMedis" => true
            ],
            [
                "nrp" => "12000000000004",
                "nama" => "Dedi Kurniawan",
                "pangkat" => "kopda",
                "faskes" => "2",
                "unit_rawat" => "4",
                "lokasi" => "Malang, Jawa Timur",
                "posisi" => "Gudang Alat Berat",
                "tgllahir" => "1992-03-18",
                "tglmasukunit_rawat" => "2019-09-05",
                "alamat" => "Jl. Ijen No.17 Malang",
                "activeTenagaMedis" => true
            ],
            [
                "nrp" => "12000000000005",
                "nama" => "Fajar Nugroho",
                "pangkat" => "praka",
                "faskes" => "1",
                "unit_rawat" => "2",
                "lokasi" => "Yogyakarta, DIY",
                "posisi" => "Gudang Peralatan",
                "tgllahir" => "1995-12-09",
                "tglmasukunit_rawat" => "2020-07-12",
                "alamat" => "Jl. Malioboro No.22 Yogyakarta",
                "activeTenagaMedis" => true
            ],
            [
                "nrp" => "12000000000006",
                "nama" => "Andi Saputra",
                "pangkat" => "pratu",
                "faskes" => "6",
                "unit_rawat" => "5",
                "lokasi" => "Balikpapan, Kalimantan Timur",
                "posisi" => "Gudang BBM",
                "tgllahir" => "1998-01-14",
                "tglmasukunit_rawat" => "2024-02-01",
                "alamat" => "Jl. Jendral Sudirman No.33 Balikpapan",
                "activeTenagaMedis" => false
            ],
            [
                "nrp" => "12000000000007",
                "nama" => "Hendra Wijaya",
                "pangkat" => "kopda",
                "faskes" => "9",
                "unit_rawat" => "3",
                "lokasi" => "Denpasar, Bali",
                "posisi" => "Gudang Logistik",
                "tgllahir" => "1993-07-30",
                "tglmasukunit_rawat" => "2018-11-10",
                "alamat" => "Jl. Teuku Umar No.14 Denpasar",
                "activeTenagaMedis" => true
            ],
            [
                "nrp" => "12000000000008",
                "nama" => "Yusuf Maulana",
                "pangkat" => "praka",
                "faskes" => "17",
                "unit_rawat" => "6",
                "lokasi" => "Jayapura, Papua",
                "posisi" => "Gudang Persenjataan",
                "tgllahir" => "1991-04-25",
                "tglmasukunit_rawat" => "2017-05-03",
                "alamat" => "Jl. Ahmad Yani No.9 Jayapura",
                "activeTenagaMedis" => true
            ],
            [
                "nrp" => "12000000000009",
                "nama" => "Rizky Ramadhan",
                "pangkat" => "pratu",
                "faskes" => "2",
                "unit_rawat" => "2",
                "lokasi" => "Palembang, Sumatera Selatan",
                "posisi" => "Gudang Perbekalan",
                "tgllahir" => "1999-10-11",
                "tglmasukunit_rawat" => "2024-08-17",
                "alamat" => "Jl. Sudirman No.101 Palembang",
                "activeTenagaMedis" => false
            ],
            [
                "nrp" => "12000000000010",
                "nama" => "Teguh Setiawan",
                "pangkat" => "kopda",
                "faskes" => "4",
                "unit_rawat" => "7",
                "lokasi" => "Solo, Jawa Tengah",
                "posisi" => "Gudang Transportasi",
                "tgllahir" => "1990-02-05",
                "tglmasukunit_rawat" => "2015-03-01",
                "alamat" => "Jl. Slamet Riyadi No.55 Solo",
                "activeTenagaMedis" => true
            ]
        ];


        foreach ($tenaga_medis as &$value) {
            $id_hash = hash_hmac('sha256', $value['nrp'], config('app.key'));
            TenagaMedis::create([
                'id_hash' => $id_hash,
                'data' => $value,
            ]);
        }
    }

    public function datapersonilupload(Request $request)
    {
        try {
            Gate::authorize('viewAny', TenagaMedis::class);
            AuditService::logMenuAccess('Upload Data TenagaMedis');

            $dataFaskes = Faskes::get();
            $dataUnitRawat = UnitRawat::all();

            return Inertia::render('DataPersonilUpload', [
                'faskes' => $dataFaskes->map(fn($k) => ['id' => $k->id, 'nama' => $k->nama]),
                'unit_rawat' => $dataUnitRawat->map(fn($s) => ['id' => $s->id, 'nama' => $s->nama]),
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk mengakses halaman ini.',
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

    public function uploadPersonil(Request $request)
    {
        try {
            Gate::authorize('create', TenagaMedis::class);

            $validated = $request->validate([
                'file' => ['required', 'file', 'mimes:csv,txt'],
            ], [
                'file.required' => 'File harus diunggah',
                'file.mimes' => 'File harus berformat CSV',
            ]);

            $file = $validated['file'];
            $fileContent = file_get_contents($file->getRealPath());
            $lines = array_filter(explode(PHP_EOL, trim($fileContent)));

            if (count($lines) < 2) {
                return response()->json([
                    'status' => false,
                    'message' => 'File CSV harus memiliki minimal 1 baris header dan 1 baris data',
                ]);
            }

            $headers = array_map('trim', str_getcsv(array_shift($lines)));
            $createdCount = 0;
            $skippedCount = 0;
            $errors = [];

            // Load valid IDs for validation
            $validUnitRawatIds = UnitRawat::pluck('id')->toArray();
            $validFaskesIds = Faskes::pluck('id')->toArray();
            $validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

            foreach ($lines as $index => $line) {
                if (empty(trim($line))) {
                    continue;
                }

                $values = array_map('trim', str_getcsv($line));

                if ($values === false || count($values) !== count($headers)) {
                    $errors[] = "Baris " . ($index + 2) . ": Jumlah kolom tidak sesuai";
                    $skippedCount++;
                    continue;
                }

                $row = array_combine($headers, $values);
                if ($row === false) {
                    $errors[] = "Baris " . ($index + 2) . ": Gagal membaca baris CSV";
                    $skippedCount++;
                    continue;
                }

                $nrp = $row['NRP'] ?? $row['nrp'] ?? '';

                if (empty($nrp)) {
                    $errors[] = "Baris " . ($index + 2) . ": NRP tidak boleh kosong";
                    $skippedCount++;
                    continue;
                }

                // Validate Faskes ID
                $faskes = data_get($row, 'Faskes') ?? $row['faskes'] ?? '';
                if (!in_array($faskes, $validFaskesIds)) {
                    $errors[] = "Baris " . ($index + 2) . ": Faskes ID '{$faskes}' tidak valid";
                    $skippedCount++;
                    continue;
                }

                // Validate UnitRawat ID
                $unit_rawat = data_get($row, 'UnitRawat') ?? $row['unit_rawat'] ?? '';
                if (!in_array($unit_rawat, $validUnitRawatIds)) {
                    $errors[] = "Baris " . ($index + 2) . ": UnitRawat ID '{$unit_rawat}' tidak valid";
                    $skippedCount++;
                    continue;
                }

                // Validate Ukuran Baju
                $ukuranBaju = strtoupper(data_get($row, 'Ukuran Baju') ?? $row['ukuran_baju'] ?? $row['ukuranBaju'] ?? '');
                if (!empty($ukuranBaju) && !in_array($ukuranBaju, $validSizes)) {
                    $errors[] = "Baris " . ($index + 2) . ": Ukuran Baju '{$ukuranBaju}' tidak valid. Pilihan: " . implode(', ', $validSizes);
                    $skippedCount++;
                    continue;
                }

                $tglLahirRaw = data_get($row, 'Tgl Lahir') ?? data_get($row, 'tgl_lahir') ?? $row['tgllahir'] ?? '';
                $tglMasukRaw = data_get($row, 'Tgl Masuk UnitRawat') ?? data_get($row, 'Tanggal Masuk UnitRawat') ?? data_get($row, 'Tgl Masuk') ?? data_get($row, 'TGL MASUK UNIT_RAWAT') ?? data_get($row, 'Tgl masuk unit_rawat') ?? data_get($row, 'Tgl_Masuk_UnitRawat') ?? data_get($row, 'tgl_masuk_unit_rawat') ?? data_get($row, 'tgl masuk unit_rawat') ?? data_get($row, 'Tgl masuk unit_rawat') ?? data_get($row, 'tglmasukunit_rawat') ?? $row['tglmasukunit_rawat'] ?? '';
                // dd($row, $tglMasukRaw);

                $tglLahir = $this->normalizeDateString($tglLahirRaw);
                $tglMasukUnitRawat = $this->normalizeDateString($tglMasukRaw);

                if ($tglLahirRaw !== '' && $tglLahir === '') {
                    $errors[] = "Baris " . ($index + 2) . ": Tgl Lahir tidak valid. Gunakan format MM/DD/YYYY atau YYYY-MM-DD";
                    $skippedCount++;
                    continue;
                }

                if ($tglMasukRaw !== '' && $tglMasukUnitRawat === '') {
                    $errors[] = "Baris " . ($index + 2) . ": Tgl. Masuk UnitRawat tidak valid. Gunakan format seperti 05/12/1990, 12/05/1990, 1990-05-12, 12 May 1990, dll.";
                    $skippedCount++;
                    continue;
                }

                $id_hash = hash_hmac('sha256', $nrp, config('app.key'));
                $exists = TenagaMedis::query()->where('id_hash', $id_hash)->exists();

                if ($exists) {
                    $errors[] = "Baris " . ($index + 2) . ": NRP {$nrp} sudah ada";
                    $skippedCount++;
                    continue;
                }

                try {
                    // Normalize the row data
                    $data = [
                        'nrp' => $nrp,
                        'nama' => data_get($row, 'Nama') ?? data_get($row, 'nama') ?? data_get($row, 'Nama Lengkap') ?? data_get($row, 'nama_lengkap') ?? '',
                        'tgllahir' => $tglLahir,
                        'alamat' => data_get($row, 'Alamat') ?? $row['alamat'] ?? '',
                        'pangkat' => data_get($row, 'Pangkat') ?? $row['pangkat'] ?? '',
                        'unit_rawat' => $unit_rawat,
                        'faskes' => $faskes,
                        'lokasi' => data_get($row, 'Dislokasi') ?? $row['dislokasi'] ?? '',
                        'tglmasukunit_rawat' => $tglMasukUnitRawat,
                        'ukuran_baju' => $ukuranBaju,
                        'activeTenagaMedis' => false,
                    ];
                    TenagaMedis::create([
                        'id_hash' => $id_hash,
                        'data' => $data,
                    ]);
                    $createdCount++;
                } catch (\Exception $e) {
                    $errors[] = "Baris " . ($index + 2) . ": " . $e->getMessage();
                    $skippedCount++;
                }
            }

            AuditService::logMenuAccess('Upload Data TenagaMedis - Berhasil: ' . $createdCount . ' data');

            $message = "Data tenaga_medis berhasil diunggah. " .
                "Berhasil: {$createdCount}, Terlewat: {$skippedCount}";

            if (count($errors) > 0) {
                $message .= ". Kesalahan: " . implode("; ", array_slice($errors, 0, 5));
            }

            return response()->json([
                'status' => true,
                'message' => $message,
                'data' => [
                    'created' => $createdCount,
                    'skipped' => $skippedCount,
                    'errors' => array_slice($errors, 0, 10),
                ],
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk mengunggah data.',
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
                'message' => 'Terjadi kesalahan sistem: ' . $e->getMessage(),
            ]);
        }
    }

    public function downloadTemplate()
    {
        try {
            Gate::authorize('create', TenagaMedis::class);

            $dataFaskes = Faskes::all(['id', 'nama'])->toArray();
            $dataUnitRawat = UnitRawat::all(['id', 'nama'])->toArray();
            $ukuranBaju = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

            // Create CSV content
            $csvContent = '';
            $csvContent .= "NRP,Nama,Tgl Lahir,Alamat,Pangkat,UnitRawat,Faskes,Dislokasi,Tgl Masuk UnitRawat,Ukuran Baju\n";
            $csvContent .= "12000000001,Budi Santoso,05/12/1990,Jl. Contoh No.1,pratu,1,1,Semarang,03/10/2020,L\n";
            $csvContent .= "12000000002,Rudi Hartono,21/08/1992,Jl. Contoh No.2,praka,2,2,Surabaya,15/06/2021,XL\n";
            $csvContent .= "12000000003,Agus Prasetyo,1995-11-02,Jl. Contoh No.3,pratu,1,1,Bandung,2023-01-20,M\n";
            $csvContent .= "12000000004,Siti Aminah,02-11-1995,Jl. Contoh No.4,pratu,1,1,Jakarta,20-01-2023,S\n";
            $csvContent .= "12000000005,Joko Widodo,12 May 1990,Jl. Contoh No.5,praka,3,3,Yogyakarta,10 Jun 2020,L\n";

            // Add reference data
            $csvContent .= "\n\n=== REFERENSI UNIT_RAWAT ===\n";
            $csvContent .= "ID,Nama\n";
            foreach ($dataUnitRawat as $s) {
                $csvContent .= "{$s['id']},{$s['nama']}\n";
            }

            $csvContent .= "\n\n=== REFERENSI FASKES ===\n";
            $csvContent .= "ID,Nama\n";
            foreach ($dataFaskes as $k) {
                $csvContent .= "{$k['id']},{$k['nama']}\n";
            }

            $csvContent .= "\n\n=== REFERENSI UKURAN BAJU ===\n";
            $csvContent .= "Ukuran\n";
            foreach ($ukuranBaju as $size) {
                $csvContent .= "$size\n";
            }

            return response($csvContent, 200, [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment; filename="Template_Upload_TenagaMedis.csv"',
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk mengunduh template.',
            ], 403);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem: ' . $e->getMessage(),
            ]);
        }
    }

    private function normalizeDateString(?string $value): string
    {
        $value = trim((string) $value);
        if ($value === '') {
            return '';
        }
        $formats = ['n/j/Y', 'j/n/Y', 'Y-m-d', 'd/m/Y', 'm/d/Y', 'd-m-Y', 'm-d-Y', 'Y/m/d', 'd-m-y', 'm-d-y', 'j F Y', 'd F Y', 'F j, Y', 'F d, Y'];

        foreach ($formats as $format) {
            $date = \DateTime::createFromFormat($format, $value);
            if ($date === false) {
                continue;
            }

            // PHP 8.2+ getLastErrors() bisa return false jika tidak ada error
            $errors = \DateTime::getLastErrors();
            if ($errors === false || ($errors['warning_count'] === 0 && $errors['error_count'] === 0)) {
                return $date->format('Y-m-d');
            }
        }

        return '';
    }
}
