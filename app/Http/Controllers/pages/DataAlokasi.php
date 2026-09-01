<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAlokasi;
use App\Models\Alokasi;
use App\Models\AlokasiDetail;
use App\Models\Periode;
use App\Services\AuditService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class DataAlokasi extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Alokasi::class);
        AuditService::logMenuAccess('Data Alokasi');

        return Inertia::render('DataAlokasi');
    }

    public function dataAlokasi(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewAny', Alokasi::class);

            $statusGridSql = "CASE WHEN EXISTS (
                SELECT 1
                FROM alokasi_detail
                INNER JOIN item_inventory ON item_inventory.id_detail_alokasi = alokasi_detail.id
                WHERE alokasi_detail.alokasi_nan = alokasi.nan
            ) THEN '2' ELSE alokasi.status END";

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
                'jumlahItem' => 'details_count',
                'totalJumlah' => 'total_jumlah',
                'namaUnitRawat' => 'unit_rawat_id',
                'status' => 'status_grid',
                default => $requestedSortField,
            };

            $allowedSortFields = [
                'id',
                'nan',
                'periode',
                'status',
                'unit_rawat_id',
                'created_at',
                'updated_at',
                'details_count',
                'total_jumlah',
                'status_grid',
            ];

            if (! in_array($sortField, $allowedSortFields, true)) {
                $sortField = 'id';
            }

            $query = Alokasi::query()
                ->select('alokasi.*')
                ->selectRaw($statusGridSql . ' as status_grid')
                ->with([
                    'unit_rawat:id,kode,nama',
                    'details' => function ($query) {
                        $query->select('id', 'alokasi_nan', 'jenis', 'ukuran', 'kategori', 'tenaga_medis_id', 'jumlah')
                            ->with('tenaga_medis:id,data');
                    },
                ])
                ->withCount('details')
                ->withSum('details as total_jumlah', 'jumlah');

            if (is_array($advancedFilterModel)) {
                $filter = trim((string) ($advancedFilterModel['filter'] ?? ''));
                $column = $advancedFilterModel['colId'] ?? null;

                if ($filter !== '') {
                    if (is_string($column) && $column !== '') {
                        match ($column) {
                            'nan' => $query->where('nan', 'ilike', '%' . $filter . '%'),
                            'periode' => $query->where('periode', 'ilike', '%' . $filter . '%'),
                            'status' => $query->whereRaw($statusGridSql . ' ilike ?', ['%' . $filter . '%']),
                            'namaUnitRawat' => $query->whereHas('unit_rawat', function ($unit_rawatQuery) use ($filter): void {
                                $unit_rawatQuery->where('nama', 'ilike', '%' . $filter . '%');
                            }),
                            default => $query->where(function ($nestedQuery) use ($filter): void {
                                $nestedQuery
                                    ->where('nan', 'ilike', '%' . $filter . '%')
                                    ->orWhere('periode', 'ilike', '%' . $filter . '%')
                                    ->orWhereHas('unit_rawat', function ($unit_rawatQuery) use ($filter): void {
                                        $unit_rawatQuery->where('nama', 'ilike', '%' . $filter . '%');
                                    });
                            }),
                        };
                    } else {
                        $query->where(function ($nestedQuery) use ($filter): void {
                            $nestedQuery
                                ->where('nan', 'ilike', '%' . $filter . '%')
                                ->orWhere('periode', 'ilike', '%' . $filter . '%')
                                ->orWhereHas('unit_rawat', function ($unit_rawatQuery) use ($filter): void {
                                    $unit_rawatQuery->where('nama', 'ilike', '%' . $filter . '%');
                                });
                        });
                    }
                }
            }

            $query->orderBy($sortField, $sortDirection);
            $paginatedAlokasi = $query->paginate($perPage, ['*'], 'page', $page);

            $rows = $paginatedAlokasi->getCollection()->map(function (Alokasi $alokasi): array {
                return [
                    'id' => $alokasi->id,
                    'nan' => (string) $alokasi->nan,
                    'periode' => $alokasi->periode,
                    'status' => (string) ($alokasi->status_grid ?? $alokasi->status),
                    'namaUnitRawat' => $alokasi->unit_rawat?->nama ?? '-',
                    'jumlahItem' => (int) $alokasi->details_count,
                    'totalJumlah' => (int) ($alokasi->total_jumlah ?? 0),
                    'details' => $alokasi->details->map(function (AlokasiDetail $detail): array {
                        $tenaga_medisNrp = (string) ($detail->tenaga_medis?->data['nrp'] ?? '');
                        $tenaga_medisNama = (string) ($detail->tenaga_medis?->data['nama'] ?? '');

                        return [
                            'id' => $detail->id,
                            'jenis' => $detail->jenis,
                            'ukuran' => $detail->ukuran,
                            'kategori' => $detail->kategori,
                            'tenaga_medis' => $tenaga_medisNrp || $tenaga_medisNama ? trim($tenaga_medisNrp . ' - ' . $tenaga_medisNama, ' -') : '-',
                            'jumlah' => (int) $detail->jumlah,
                        ];
                    })->values()->all(),
                ];
            })->values();

            return response()->json([
                'status' => true,
                'message' => 'Berhasil memproses permintaan.',
                'data' => $rows,
                'total' => $paginatedAlokasi->total(),
                'page' => $paginatedAlokasi->currentPage(),
                'perPage' => $paginatedAlokasi->perPage(),
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ]);
        } catch (\Exception $e) {
            Log::error('Error loading alokasi data', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem: ' . $e->getMessage(),
            ]);
        }
    }

    public function alokasiBaru(Request $request)
    {
        $validated = $request->validate([
            'id' => ['sometimes', 'integer', Rule::exists('alokasi', 'id')],
        ]);

        $data = [];
        if (array_key_exists('id', $validated)) {
            $dataAlokasi = Alokasi::with(['details.tenaga_medis'])->findOrFail($validated['id']);
            Gate::authorize('update', $dataAlokasi);
            $data['data'] = $dataAlokasi;
        } else {
            Gate::authorize('create', Alokasi::class);
        }
        AuditService::logMenuAccess('Data Alokasi Baru');

        return Inertia::render('DataAlokasiBaru', $data);
    }

    public function addEditAlokasiBaru(StoreAlokasi $request)
    {
        try {
            $validated = $request->validated();
            // Cek apakah mode edit (alokasi dengan NAN sudah ada)
            $alokasi = Alokasi::where('nan', $validated['nan'])->first();

            if ($alokasi) {
                // Mode Edit
                Gate::authorize('update', $alokasi);
                AuditService::logMenuAccess('Edit Alokasi');

                // Get periode name if periode_id is provided
                $periodeModel = Periode::find($validated['periode']);
                $periodeName = $periodeModel?->nama ?? '';

                $alokasi->update([
                    'unit_rawat_id' => $validated['unit_rawat'],
                    'periode_id' => $validated['periode'],
                    'periode' => $periodeName,
                ]);

                // Hapus detail lama sebelom insert baru
                $alokasi->details()->delete();

                $message = 'Data alokasi berhasil diperbarui.';
            } else {
                // Mode Tambah Baru
                Gate::authorize('create', Alokasi::class);
                AuditService::logMenuAccess('Tambah Alokasi Baru');

                // Get periode name if periode_id is provided
                $periodeModel = Periode::find($validated['periode']);
                $periodeName = $periodeModel?->nama ?? '';

                $alokasi = Alokasi::create([
                    'nan' => $validated['nan'],
                    'unit_rawat_id' => $validated['unit_rawat'],
                    'periode_id' => $validated['periode'],
                    'periode' => $periodeName,
                    'status' => '1',
                    'created_by' => Auth::id(),
                ]);

                $message = 'Data alokasi berhasil ditambahkan.';
            }

            // Simpan detail alokasi
            foreach ($validated['rowData'] as $row) {
                $alokasi->details()->create([
                    'jenis' => json_decode($row['jenis'], true),
                    'ukuran' => json_decode($row['ukuran'], true),
                    'kategori' => json_decode($row['kategori'], true),
                    'tenaga_medis_id' => $row['tenaga_medis_id'] ?? null,
                    'jumlah' => $row['jumlah'],
                ]);
            }

            return response()->json([
                'status' => true,
                'message' => $message,
                'data' => [
                    'id' => $alokasi->id,
                    'nan' => (string) $alokasi->nan,
                ],
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk melakukan aksi ini.',
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem: ' . $e->getMessage(),
            ], 200);
        }
    }

    public function alokasiNAN(Request $request)
    {
        try {
            Gate::authorize('viewAny', Alokasi::class);

            return response()->json([
                'status' => true,
                'nan' => generateNAN(),
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk menghapus data ini.',
            ], 200);
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

    public function destroy(Alokasi $alokasi)
    {
        try {
            Gate::authorize('delete', $alokasi);

            // Cek status: hanya bisa hapus jika status 1 (open)
            if ($alokasi->status != '1') {
                return response()->json([
                    'status' => false,
                    'message' => 'Data alokasi sudah terkunci dan tidak dapat dihapus.',
                ], 200);
            }

            AuditService::logMenuAccess('Hapus Alokasi');

            $alokasi->details()->delete();
            $alokasi->delete();

            return response()->json([
                'status' => true,
                'message' => 'Data alokasi berhasil dihapus.',
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk menghapus data ini.',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting alokasi', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem: ' . $e->getMessage(),
            ], 200);
        }
    }

    public function acc(Alokasi $alokasi)
    {
        try {
            // Izin ACC dipisah dari izin edit agar sesuai SOP validasi.
            Gate::authorize('accRencana', $alokasi);

            // Cek status: hanya bisa acc jika status 1 (open)
            if ($alokasi->status != '1') {
                return response()->json([
                    'status' => false,
                    'message' => 'Data alokasi sudah terkunci dan tidak dapat di-acc.',
                ], 200);
            }

            AuditService::logMenuAccess('Acc Alokasi');

            $alokasi->update(['status' => '100']);

            return response()->json([
                'status' => true,
                'message' => 'Data alokasi berhasil di-acc.',
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk melakukan aksi ini.',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error acc alokasi', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem: ' . $e->getMessage(),
            ], 200);
        }
    }

    public function acc2(Alokasi $alokasi)
    {
        try {
            // Izin ACC (Pusat) dipisah dari izin edit agar sesuai SOP validasi.
            Gate::authorize('accRencanaPusat', $alokasi);

            // Cek status: hanya bisa acc jika status 1 (open)
            if ($alokasi->status != '100') {
                return response()->json([
                    'status' => false,
                    'message' => 'Data alokasi sudah terkunci dan tidak dapat di-acc.',
                ], 200);
            }

            AuditService::logMenuAccess('Acc Alokasi Oleh Pusat');

            $alokasi->update(['status' => '110']);

            return response()->json([
                'status' => true,
                'message' => 'Data alokasi berhasil di-acc.',
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk melakukan aksi ini.',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error acc alokasi', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem: ' . $e->getMessage(),
            ], 200);
        }
    }
}
