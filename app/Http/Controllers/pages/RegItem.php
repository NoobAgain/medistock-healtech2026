<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\AlokasiDetail;
use App\Models\ItemInventory;
use App\Models\Pengiriman;
use App\Services\AuditService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegItem extends Controller
{
    public function index(): Response
    {
        Gate::authorize('viewAny', ItemInventory::class);
        AuditService::logMenuAccess('Manajemen Inventory');

        return Inertia::render('RegItem');
    }

    public function delItem(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:item_inventory,id'],
            ], [
                'id.integer' => 'ID harus berupa angka.',
                'id.exists' => 'Data tidak ditemukan.',
            ]);

            $dataItem = ItemInventory::findOrFail($validated['id']);
            Gate::authorize('delete', $dataItem);
            $dataItem->delete();

            AuditService::logMenuAccess('Hapus Data Inventory');

            return response()->json([
                'status' => true,
                'message' => 'Data Inventori berhasil dihapus.',
            ]);
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

    public function listDataInventory(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewAny', ItemInventory::class);

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
            $sortField = is_string($validated['sortField'] ?? null) ? $validated['sortField'] : 'id';
            $sortDirection = ($validated['sortDirection'] ?? 'asc') === 'desc' ? 'desc' : 'asc';

            $sentNans = Pengiriman::query()->pluck('id_nan')->all();

            $query = ItemInventory::query()
                ->with([
                    'alokasi_detail:id,alokasi_nan,jenis,ukuran,kategori,tenaga_medis_id',
                    'alokasi_detail.tenaga_medis:id,data',
                ])
                ->select(
                    'item_inventory.id',
                    'item_inventory.nsn',
                    'item_inventory.hash',
                    'item_inventory.status',
                    'item_inventory.id_detail_alokasi',
                    'item_inventory.created_at',
                );

            $this->applyInventoryFilters($query, $validated['advancedFilterModel'] ?? null, $validated['filterModel'] ?? null);
            $this->applyInventorySorting($query, $sortField, $sortDirection);

            $data = $query->paginate($perPage, ['*'], 'page', $page);
            $items = collect($data->items())->map(function ($item) use ($sentNans) {
                if (isset($item->hash) && ! empty($item->hash)) {
                    $hash = $item->hash;
                    if (strlen($hash) <= 12) {
                        $item->hash = str_repeat('*', strlen($hash));
                    } else {
                        $item->hash = substr($hash, 0, 8) . str_repeat('*', strlen($hash) - 12) . substr($hash, -8);
                    }
                }

                $nan = $item->alokasi_detail?->alokasi_nan;
                $item->is_sent = $nan !== null && in_array($nan, $sentNans, true);

                $item->tenaga_medis_nama = $item->alokasi_detail?->tenaga_medis?->data['nama'] ?? null;

                return $item;
            })->toArray();

            return response()->json([
                'status' => true,
                'message' => 'Berhasil memproses permintaan.',
                'data' => $items,
                'total' => $data->total(),
            ]);
        } catch (\Illuminate\Auth\Access\AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki akses untuk melihat data ini.',
            ], 403);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem: ' . $e->getMessage(),
            ]);
        }
    }

    private function applyInventoryFilters(Builder $query, mixed $advancedFilterModel, mixed $filterModel): void
    {
        if (is_array($advancedFilterModel) && (($advancedFilterModel['filterType'] ?? null) === 'join' || isset($advancedFilterModel['colId']))) {
            $this->applyFilterNode($query, $advancedFilterModel, 'and');

            return;
        }

        foreach ($this->normalizeFilterModel($filterModel) as $columnId => $condition) {
            $this->applyColumnFilter($query, $columnId, $condition, 'and');
        }
    }

    private function applyInventorySorting(Builder $query, string $sortField, string $sortDirection): void
    {
        if ($sortField === '' || $sortField === 'actions') {
            $query->orderBy('item_inventory.id', 'desc');

            return;
        }

        switch ($sortField) {
            case 'id':
            case 'nsn':
            case 'hash':
            case 'status':
            case 'created_at':
                $query->orderBy('item_inventory.' . $sortField, $sortDirection);
                break;

            case 'alokasi_detail.alokasi_nan':
                $query->orderBy(
                    AlokasiDetail::query()
                        ->select('alokasi_nan')
                        ->whereColumn('alokasi_detail.id', 'item_inventory.id_detail_alokasi'),
                    $sortDirection,
                );
                break;

            case 'alokasi_detail.jenis.name':
                $query->orderBy(
                    AlokasiDetail::query()
                        ->selectRaw("(jenis::jsonb ->> 'name')")
                        ->whereColumn('alokasi_detail.id', 'item_inventory.id_detail_alokasi'),
                    $sortDirection,
                );
                break;

            case 'alokasi_detail.ukuran.name':
                $query->orderBy(
                    AlokasiDetail::query()
                        ->selectRaw("(ukuran::jsonb ->> 'name')")
                        ->whereColumn('alokasi_detail.id', 'item_inventory.id_detail_alokasi'),
                    $sortDirection,
                );
                break;

            case 'alokasi_detail.kategori.name':
                $query->orderBy(
                    AlokasiDetail::query()
                        ->selectRaw("(kategori::jsonb ->> 'name')")
                        ->whereColumn('alokasi_detail.id', 'item_inventory.id_detail_alokasi'),
                    $sortDirection,
                );
                break;

            case 'alokasi_detail.tenaga_medis.nama':
                $query->orderBy(
                    \App\Models\TenagaMedis::query()
                        ->selectRaw("(data::jsonb ->> 'nama')")
                        ->whereColumn('tenaga_medis.id', 'alokasi_detail.tenaga_medis_id')
                        ->join('alokasi_detail', 'alokasi_detail.tenaga_medis_id', '=', 'tenaga_medis.id'),
                    $sortDirection,
                );
                break;

            default:
                $query->orderBy('item_inventory.id', 'desc');
                break;
        }
    }

    private function applyFilterNode(Builder $query, array $node, string $boolean): void
    {
        if (($node['filterType'] ?? null) === 'join') {
            $conditions = $node['conditions'] ?? [];
            $joinType = strtolower((string) ($node['type'] ?? 'AND')) === 'or' ? 'or' : 'and';

            if (! is_array($conditions) || $conditions === []) {
                return;
            }

            $method = $boolean === 'or' ? 'orWhere' : 'where';

            $query->{$method}(function (Builder $nestedQuery) use ($conditions, $joinType): void {
                foreach ($conditions as $index => $condition) {
                    if (! is_array($condition)) {
                        continue;
                    }

                    $childBoolean = $index === 0 ? 'and' : $joinType;
                    $this->applyFilterNode($nestedQuery, $condition, $childBoolean);
                }
            });

            return;
        }

        $columnId = $node['colId'] ?? null;

        if (! is_string($columnId) || $columnId === '') {
            return;
        }

        $this->applyColumnFilter($query, $columnId, $node, $boolean);
    }

    private function applyColumnFilter(Builder $query, string $columnId, array $condition, string $boolean): void
    {
        $conditionOne = $condition['condition1'] ?? null;
        $conditionTwo = $condition['condition2'] ?? null;

        if (is_array($conditionOne) || is_array($conditionTwo)) {
            $method = $boolean === 'or' ? 'orWhere' : 'where';
            $joinOperator = strtolower((string) ($condition['operator'] ?? 'and')) === 'or' ? 'or' : 'and';

            $query->{$method}(function (Builder $nestedQuery) use ($columnId, $conditionOne, $conditionTwo, $joinOperator): void {
                if (is_array($conditionOne)) {
                    $this->applyColumnFilter($nestedQuery, $columnId, ['colId' => $columnId, ...$conditionOne], 'and');
                }

                if (is_array($conditionTwo)) {
                    $this->applyColumnFilter($nestedQuery, $columnId, ['colId' => $columnId, ...$conditionTwo], is_array($conditionOne) ? $joinOperator : 'and');
                }
            });

            return;
        }

        switch ($columnId) {
            case 'nsn':
                $this->applySmartNumericFilter($query, 'item_inventory.nsn', $condition, $boolean);
                break;

            case 'hash':
                $this->applyTextFilter($query, 'item_inventory.hash', $condition, $boolean);
                break;

            case 'created_at':
                $this->applyDateFilter($query, 'item_inventory.created_at', $condition, $boolean);
                break;

            case 'alokasi_detail.alokasi_nan':
                $this->applyRelationFilter($query, $boolean, function (Builder $relationQuery) use ($condition): void {
                    $this->applySmartNumericFilter($relationQuery, 'alokasi_detail.alokasi_nan', $condition, 'and');
                });
                break;

            case 'alokasi_detail.jenis.name':
                $this->applyRelationFilter($query, $boolean, function (Builder $relationQuery) use ($condition): void {
                    $this->applyTextFilter($relationQuery, "(alokasi_detail.jenis::jsonb ->> 'name')", $condition, 'and');
                });
                break;

            case 'alokasi_detail.ukuran.name':
                $this->applyRelationFilter($query, $boolean, function (Builder $relationQuery) use ($condition): void {
                    $this->applyTextFilter($relationQuery, "(alokasi_detail.ukuran::jsonb ->> 'name')", $condition, 'and');
                });
                break;

            case 'alokasi_detail.kategori.name':
                $this->applyRelationFilter($query, $boolean, function (Builder $relationQuery) use ($condition): void {
                    $this->applyTextFilter($relationQuery, "(alokasi_detail.kategori::jsonb ->> 'name')", $condition, 'and');
                });
                break;

            case 'alokasi_detail.tenaga_medis.nama':
                $this->applyRelationFilter($query, $boolean, function (Builder $relationQuery) use ($condition): void {
                    $relationQuery->whereHas('tenaga_medis', function (Builder $tenaga_medisQuery) use ($condition): void {
                        $this->applyTextFilter($tenaga_medisQuery, "(tenaga_medis.data::jsonb ->> 'nama')", $condition, 'and');
                    });
                });
                break;
        }
    }

    private function applyRelationFilter(Builder $query, string $boolean, callable $callback): void
    {
        $method = $boolean === 'or' ? 'orWhereHas' : 'whereHas';

        $query->{$method}('alokasi_detail', function (Builder $relationQuery) use ($callback): void {
            $callback($relationQuery);
        });
    }

    private function applySmartNumericFilter(Builder $query, string $column, array $condition, string $boolean): void
    {
        $filterType = strtolower((string) ($condition['filterType'] ?? 'text'));
        $operator = (string) ($condition['type'] ?? $condition['operator'] ?? 'contains');

        if ($filterType === 'number' || in_array($operator, ['equals', 'notEqual', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual', 'inRange'], true)) {
            $this->applyNumberFilter($query, $column, $condition, $boolean);

            return;
        }

        $this->applyTextFilter($query, 'CAST(' . $column . ' AS TEXT)', $condition, $boolean);
    }

    private function applyTextFilter(Builder $query, string $expression, array $condition, string $boolean): void
    {
        $operator = (string) ($condition['type'] ?? $condition['operator'] ?? 'contains');
        $value = trim((string) ($condition['filter'] ?? $condition['value'] ?? ''));
        $method = $boolean === 'or' ? 'orWhereRaw' : 'whereRaw';

        if ($operator === 'blank') {
            $query->{$method}("COALESCE(TRIM({$expression}), '') = ''");

            return;
        }

        if ($operator === 'notBlank') {
            $query->{$method}("COALESCE(TRIM({$expression}), '') <> ''");

            return;
        }

        if ($value === '') {
            return;
        }

        [$sql, $bindings] = match ($operator) {
            'equals' => ["{$expression} ILIKE ?", [$value]],
            'notEqual' => ["{$expression} NOT ILIKE ?", [$value]],
            'startsWith' => ["{$expression} ILIKE ?", [$value . '%']],
            'endsWith' => ["{$expression} ILIKE ?", ['%' . $value]],
            default => ["{$expression} ILIKE ?", ['%' . $value . '%']],
        };

        $query->{$method}($sql, $bindings);
    }

    private function applyNumberFilter(Builder $query, string $column, array $condition, string $boolean): void
    {
        $operator = (string) ($condition['type'] ?? $condition['operator'] ?? 'equals');
        $value = $condition['filter'] ?? $condition['value'] ?? null;
        $rangeEnd = $condition['filterTo'] ?? $condition['valueTo'] ?? null;
        $method = $boolean === 'or' ? 'orWhereRaw' : 'whereRaw';

        if ($operator === 'blank') {
            $query->{$method}("{$column} IS NULL");

            return;
        }

        if ($operator === 'notBlank') {
            $query->{$method}("{$column} IS NOT NULL");

            return;
        }

        if (! is_numeric($value)) {
            return;
        }

        $numericValue = (float) $value;

        if ($operator === 'inRange' && is_numeric($rangeEnd)) {
            $query->{$method}("{$column} BETWEEN ? AND ?", [$numericValue, (float) $rangeEnd]);

            return;
        }

        $sqlOperator = match ($operator) {
            'notEqual' => '!=',
            'lessThan' => '<',
            'lessThanOrEqual' => '<=',
            'greaterThan' => '>',
            'greaterThanOrEqual' => '>=',
            default => '=',
        };

        $query->{$method}("{$column} {$sqlOperator} ?", [$numericValue]);
    }

    private function applyDateFilter(Builder $query, string $column, array $condition, string $boolean): void
    {
        $operator = (string) ($condition['type'] ?? $condition['operator'] ?? 'equals');
        $dateFrom = $condition['dateFrom'] ?? $condition['filter'] ?? $condition['value'] ?? null;
        $dateTo = $condition['dateTo'] ?? $condition['filterTo'] ?? $condition['valueTo'] ?? null;
        $method = $boolean === 'or' ? 'orWhereRaw' : 'whereRaw';
        $dateExpression = "DATE({$column})";

        if ($operator === 'blank') {
            $query->{$method}("{$column} IS NULL");

            return;
        }

        if ($operator === 'notBlank') {
            $query->{$method}("{$column} IS NOT NULL");

            return;
        }

        if (! is_string($dateFrom) || trim($dateFrom) === '') {
            return;
        }

        if ($operator === 'inRange' && is_string($dateTo) && trim($dateTo) !== '') {
            $query->{$method}("{$dateExpression} BETWEEN ? AND ?", [$dateFrom, $dateTo]);

            return;
        }

        $sqlOperator = match ($operator) {
            'notEqual' => '!=',
            'lessThan' => '<',
            'greaterThan' => '>',
            'lessThanOrEqual' => '<=',
            'greaterThanOrEqual' => '>=',
            default => '=',
        };

        $query->{$method}("{$dateExpression} {$sqlOperator} ?", [$dateFrom]);
    }

    private function normalizeFilterModel(mixed $filterModel): array
    {
        if (! is_array($filterModel)) {
            return [];
        }

        if (isset($filterModel['colId'], $filterModel['filterType']) && is_string($filterModel['colId'])) {
            return [$filterModel['colId'] => $filterModel];
        }

        $normalized = [];

        foreach ($filterModel as $columnId => $condition) {
            if (! is_string($columnId) || ! is_array($condition)) {
                continue;
            }

            $normalized[$columnId] = [
                'colId' => $columnId,
                ...$condition,
            ];
        }

        return $normalized;
    }
}
