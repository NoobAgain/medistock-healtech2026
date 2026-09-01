<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\ItemInventory;
use App\Models\Pengiriman;
use App\Models\PengirimanEvent;
use App\Models\Pod;
use App\Services\AuditService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DataPoD extends Controller
{
    public function index(): Response
    {
        Gate::authorize('viewPOD');
        AuditService::logMenuAccess('Data Penyaluran (PoD)');

        return Inertia::render('DataPoD');
    }

    public function listData(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewPOD');

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
            $sortDirection = $validated['sortDirection'] ?? 'desc';
            $requestedSortField = $validated['sortField'] ?? 'created_at';
            $advancedFilterModel = $validated['advancedFilterModel'] ?? normalizeFilterModel($validated['filterModel'] ?? null);

            $allowedSortFields = ['id', 'nsn', 'created_at'];
            $sortField = in_array($requestedSortField, $allowedSortFields, true)
                ? $requestedSortField
                : 'created_at';

            $query = Pod::query()
                ->with([
                    'tenaga_medis:id,data',
                    'item_inventory:id,nsn,id_detail_alokasi,keterangan',
                    'item_inventory.alokasi_detail:id,jenis,ukuran,kategori',
                    'pengiriman:id,uid',
                ]);

            if (is_array($advancedFilterModel)) {
                $filter = trim((string) ($advancedFilterModel['filter'] ?? ''));
                $column = (string) ($advancedFilterModel['colId'] ?? '');

                if ($filter !== '') {
                    $query->where(function ($nestedQuery) use ($column, $filter): void {
                        if ($column === 'nsn') {
                            $nestedQuery->whereHas('item_inventory', function ($q) use ($filter): void {
                                $q->where('nsn', 'ilike', '%' . $filter . '%');
                            });

                            return;
                        }

                        if ($column === 'pengirimanUid') {
                            $nestedQuery->whereHas('pengiriman', function ($q) use ($filter): void {
                                $q->where('uid', 'ilike', '%' . $filter . '%');
                            });

                            return;
                        }

                        $nestedQuery
                            ->whereHas('item_inventory', function ($q) use ($filter): void {
                                $q->where('nsn', 'ilike', '%' . $filter . '%');
                            })
                            ->orWhereHas('pengiriman', function ($q) use ($filter): void {
                                $q->where('uid', 'ilike', '%' . $filter . '%');
                            });
                    });
                }
            }

            $query->orderBy($sortField, $sortDirection);

            $paginatedData = $query->paginate($perPage, ['*'], 'page', $page);

            $rows = $paginatedData->getCollection()->map(function (Pod $pod): array {
                $tenaga_medisData = $pod->tenaga_medis?->data ?? [];
                $alokasiDetail = $pod->item_inventory?->alokasi_detail;

                $jenis = data_get($alokasiDetail, 'jenis');
                $ukuran = data_get($alokasiDetail, 'ukuran');
                $kategori = data_get($alokasiDetail, 'kategori');

                $toDisplayText = static function (mixed $value): string {
                    $extractTexts = static function (mixed $item) use (&$extractTexts): array {
                        if ($item === null) {
                            return [];
                        }

                        if (is_array($item)) {
                            $result = [];

                            foreach ($item as $child) {
                                $result = [...$result, ...$extractTexts($child)];
                            }

                            return $result;
                        }

                        $text = trim((string) $item);

                        if ($text === '') {
                            return [];
                        }

                        return [$text];
                    };

                    $texts = $extractTexts($value);

                    if (count($texts) === 0) {
                        return '-';
                    }

                    $withoutNumericIds = array_values(array_filter($texts, static fn(string $text): bool => ! preg_match('/^\d+$/', $text)));
                    $finalTexts = count($withoutNumericIds) > 0 ? $withoutNumericIds : $texts;

                    return implode(', ', array_values(array_unique($finalTexts)));
                };

                return [
                    'id' => $pod->id,
                    'nsn' => (string) ($pod->item_inventory?->nsn ?? '-'),
                    'itemNsn' => (string) ($pod->item_inventory?->nsn ?? '-'),
                    'itemJenis' => $toDisplayText($jenis),
                    'itemUkuran' => $toDisplayText($ukuran),
                    'itemKategori' => $toDisplayText($kategori),
                    'nrp' => (string) ($tenaga_medisData['nrp'] ?? '-'),
                    'nama' => (string) ($tenaga_medisData['nama'] ?? '-'),
                    'pangkat' => (string) ($pod->tenaga_medis?->pangkat() ?? '-'),
                    'pengirimanUid' => (string) ($pod->pengiriman?->uid ?? '-'),
                    'file' => (string) ($pod->file ?? ''),
                    'status' => (int) ($pod->status ?? 0),
                    'keterangan' => (string) ($pod->item_inventory?->keterangan ?? '-'),
                    'createdAt' => (string) ($pod->created_at ?? ''),
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

    public function destroy(Request $request): JsonResponse
    {
        try {
            Gate::authorize('createPOD');

            $validated = $request->validate([
                'id' => ['required', 'integer', 'min:1'],
            ]);

            $pod = Pod::query()
                ->select('id', 'pengiriman_id', 'item_id', 'file')
                ->findOrFail((int) $validated['id']);

            $filePath = (string) ($pod->file ?? '');

            DB::transaction(function () use ($pod): void {
                ItemInventory::query()
                    ->where('id', $pod->item_id)
                    ->update([
                        'status' => 1,
                    ]);

                $pengiriman = Pengiriman::query()
                    ->select('id', 'id_nan')
                    ->find($pod->pengiriman_id);

                if ($pengiriman) {
                    $remainingNonReadyItems = ItemInventory::query()
                        ->whereHas('alokasi_detail', function ($query) use ($pengiriman): void {
                            $query->where('alokasi_nan', $pengiriman->id_nan);
                        })
                        ->where('status', '!=', 1)
                        ->count();

                    if ($remainingNonReadyItems === 0) {
                        PengirimanEvent::query()
                            ->where('pengiriman_id', $pengiriman->id)
                            ->where('status', 4)
                            ->delete();
                    }
                }

                $pod->delete();
            });

            if ($filePath !== '' && Storage::disk('local')->exists($filePath)) {
                Storage::disk('local')->delete($filePath);
            }

            return response()->json([
                'status' => true,
                'message' => 'Data penyaluran berhasil dihapus.',
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk melakukan tindakan ini.',
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

    public function serveFile(int $id): StreamedResponse|\Illuminate\Http\Response
    {
        Gate::authorize('viewPOD');

        $pod = Pod::query()->findOrFail($id);

        if (! $pod->file || ! Storage::disk('local')->exists($pod->file)) {
            abort(404, 'File tidak ditemukan.');
        }


        return Storage::disk('local')->response($pod->file);
    }
}
