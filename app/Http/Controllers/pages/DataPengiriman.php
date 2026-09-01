<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\Pengiriman;
use App\Models\PengirimanEvent;
use App\Services\AuditService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;


class DataPengiriman extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', Pengiriman::class);
        AuditService::logMenuAccess('Data Pengiriman');

        return Inertia::render('DataPengiriman');
    }

    public function listDataPengiriman(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewAny', Pengiriman::class);

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

            $allowedSortFields = [
                'id',
                'uid',
                'id_nan',
                'created_at',
                'updated_at',
                'last_event_status',
                'last_event_at',
            ];

            $sortField = in_array($requestedSortField, $allowedSortFields, true)
                ? $requestedSortField
                : 'created_at';

            $query = Pengiriman::query()
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
                ]);

            if (is_array($advancedFilterModel)) {
                $filter = trim((string) ($advancedFilterModel['filter'] ?? ''));
                $column = (string) ($advancedFilterModel['colId'] ?? '');

                if ($filter !== '') {
                    $query->where(function ($nestedQuery) use ($column, $filter): void {
                        if ($column === 'uid') {
                            $nestedQuery->where('uid', 'ilike', '%' . $filter . '%');

                            return;
                        }

                        if ($column === 'nan') {
                            $nestedQuery->where('id_nan', 'ilike', '%' . $filter . '%');

                            return;
                        }

                        if ($column === 'unit_rawat') {
                            $nestedQuery->whereHas('alokasi.unit_rawat', function ($unit_rawatQuery) use ($filter): void {
                                $unit_rawatQuery->where('nama', 'ilike', '%' . $filter . '%');
                            });

                            return;
                        }

                        if ($column === 'periode') {
                            $nestedQuery->whereHas('alokasi', function ($alokasiQuery) use ($filter): void {
                                $alokasiQuery->where('periode', 'ilike', '%' . $filter . '%');
                            });

                            return;
                        }

                        if ($column === 'statusLabel') {
                            $nestedQuery->whereHas('pengiriman_events', function ($eventQuery) use ($filter): void {
                                $eventQuery->whereRaw('CAST(status AS TEXT) ilike ?', ['%' . $filter . '%'])
                                    ->orWhere('note', 'ilike', '%' . $filter . '%');
                            });

                            return;
                        }

                        if ($column === 'note') {
                            $nestedQuery->whereHas('pengiriman_events', function ($eventQuery) use ($filter): void {
                                $eventQuery->where('note', 'ilike', '%' . $filter . '%');
                            });

                            return;
                        }

                        $nestedQuery
                            ->where('uid', 'ilike', '%' . $filter . '%')
                            ->orWhere('id_nan', 'ilike', '%' . $filter . '%')
                            ->orWhereHas('alokasi', function ($alokasiQuery) use ($filter): void {
                                $alokasiQuery->where('periode', 'ilike', '%' . $filter . '%');
                            })
                            ->orWhereHas('alokasi.unit_rawat', function ($unit_rawatQuery) use ($filter): void {
                                $unit_rawatQuery->where('nama', 'ilike', '%' . $filter . '%');
                            })
                            ->orWhereHas('pengiriman_events', function ($eventQuery) use ($filter): void {
                                $eventQuery->where('note', 'ilike', '%' . $filter . '%');
                            });
                    });
                }
            }

            $query->orderBy($sortField, $sortDirection);

            $paginatedData = $query->paginate($perPage, ['*'], 'page', $page);

            $rows = $paginatedData->getCollection()->map(function (Pengiriman $pengiriman): array {
                $lastStatus = (int) ($pengiriman->last_event_status ?? 0);

                return [
                    'id' => $pengiriman->id,
                    'uid' => (string) $pengiriman->uid,
                    'nan' => (string) ($pengiriman->id_nan ?? '-'),
                    'unit_rawat' => $pengiriman->alokasi?->unit_rawat?->nama ?? '-',
                    'periode' => $pengiriman->alokasi?->periode ?? '-',
                    'createdBy' => (string) ($pengiriman->user?->tenaga_medis?->data['nama'] ?? '-'),
                    'status' => $lastStatus,
                    'statusLabel' => statusLabel($lastStatus),
                    'note' => (string) ($pengiriman->last_event_note ?? '-'),
                    'updatedAt' => (string) ($pengiriman->last_event_at ?? $pengiriman->updated_at ?? $pengiriman->created_at ?? ''),
                    'createdAt' => (string) ($pengiriman->created_at ?? ''),
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

    public function deletePengiriman(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:pengiriman,id'],
            ], [
                'id.required' => 'ID wajib diisi.',
                'id.integer' => 'ID harus berupa angka.',
                'id.exists' => 'Data pengiriman tidak ditemukan.',
            ]);

            $pengiriman = Pengiriman::query()->findOrFail($validated['id']);
            Gate::authorize('delete', $pengiriman);

            $pengiriman->delete();

            return response()->json([
                'status' => true,
                'message' => 'Data pengiriman berhasil dihapus.',
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
}
