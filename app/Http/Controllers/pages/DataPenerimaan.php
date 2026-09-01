<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\Pengiriman;
use App\Models\PengirimanEvent;
use App\Models\UnitRawat;
use App\Models\User;
use App\Services\AuditService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class DataPenerimaan extends Controller
{
    public function index(Request $request): Response
    {
        Gate::authorize('dataItemKonfirmasi', Pengiriman::class);
        AuditService::logMenuAccess('Data Penerimaan');

        return Inertia::render('DataPenerimaan', [
            'isAdmin' => $this->isAdmin($request),
        ]);
    }

    public function listDataPenerimaan(Request $request): JsonResponse
    {
        try {
            Gate::authorize('dataItemKonfirmasi', Pengiriman::class);

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
                ])
                ->whereHas('pengiriman_events', function ($eventQuery): void {
                    $eventQuery->whereIn('status', [3, 4, 9]);
                });

            $this->applyUnitRawatScopeForNonAdmin($query, $request);

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

    public function detailDataPenerimaan(Request $request): JsonResponse
    {
        try {
            Gate::authorize('dataItemKonfirmasi', Pengiriman::class);

            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:pengiriman,id'],
            ], [
                'id.required' => 'ID pengiriman wajib diisi.',
                'id.integer' => 'ID pengiriman harus berupa angka.',
                'id.exists' => 'Data pengiriman tidak ditemukan.',
            ]);

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
                ])
                ->whereHas('pengiriman_events', function ($eventQuery): void {
                    $eventQuery->whereIn('status', [3, 4, 9]);
                });

            $this->applyUnitRawatScopeForNonAdmin($query, $request);

            $pengiriman = $query->findOrFail($validated['id']);
            $lastStatus = (int) ($pengiriman->last_event_status ?? 0);

            $events = PengirimanEvent::query()
                ->where('pengiriman_id', $pengiriman->id)
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->get(['id', 'status', 'created_at', 'created_by']);

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
                $unit_rawatId = $createdBy?->tenaga_medis?->data['unit_rawat'] ?? null;
                $resolvedUnitRawatId = is_numeric($unit_rawatId) ? (int) $unit_rawatId : 0;

                return [
                    'uid' => (string) $pengiriman->uid,
                    'status' => (int) $event->status,
                    'statusLabel' => statusLabel((int) $event->status),
                    'lokasi' => (string) ($unit_rawatMap->get($resolvedUnitRawatId) ?? '-'),
                    'createdAt' => (string) ($event->created_at ?? ''),
                ];
            })->values();

            return response()->json([
                'status' => true,
                'message' => 'Detail data penerimaan berhasil dimuat.',
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

    private function isAdmin(Request $request): bool
    {
        return (bool) $request->user()?->hasRole('admin_pusat');
    }

    private function applyUnitRawatScopeForNonAdmin(Builder $query, Request $request): void
    {
        if ($this->isAdmin($request)) {
            return;
        }

        $currentUnitRawatId = $request->user()?->loadMissing('tenaga_medis:id,data')?->tenaga_medis?->data['unit_rawat'] ?? null;

        if (!is_numeric($currentUnitRawatId) || (int) $currentUnitRawatId <= 0) {
            $query->whereRaw('1 = 0');

            return;
        }

        $resolvedUnitRawatId = (int) $currentUnitRawatId;

        $query->whereHas('alokasi', function ($alokasiQuery) use ($resolvedUnitRawatId): void {
            $alokasiQuery->where('unit_rawat_id', $resolvedUnitRawatId);
        });
    }
}
