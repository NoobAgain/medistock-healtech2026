<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAkunRequest;
use App\Models\TenagaMedis;
use App\Models\Role;
use App\Models\User;
use App\Services\AuditService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class DataAkun extends Controller
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', User::class);
        AuditService::logMenuAccess('Data Akun');
        return Inertia::render('DataAkun');
    }

    public function getDataAkun(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewAny', User::class);
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
            $advancedFilterModel = $validated['advancedFilterModel'] ?? null;
            $filterModel = $validated['filterModel'] ?? null;

            $sortField = match ($requestedSortField) {
                'id', 'username', 'email', 'is_active', 'created_by', 'created_at', 'updated_at', 'last_login_at' => $requestedSortField,
                default => 'id',
            };

            $query = User::query()->with(['tenaga_medis', 'roles:id,name,display_name', 'user.tenaga_medis']);
            $query->orderBy($sortField, $sortDirection);

            $effectiveFilterNode = $this->buildEffectiveFilterNode($advancedFilterModel, $filterModel);
            $requiresInMemoryFiltering = $this->containsEncryptedFieldFilter($effectiveFilterNode);

            if ($requiresInMemoryFiltering) {
                $allUsers = $query->get();
                $users = $allUsers
                    ->filter(fn(User $user): bool => $this->matchesFilterNode($user, $effectiveFilterNode))
                    ->values();

                $total = $users->count();
                $users = $users->slice(($page - 1) * $perPage, $perPage)->values();
            } else {
                $this->applyAkunFilters($query, $advancedFilterModel, $filterModel);
                $paginatedUsers = $query->paginate($perPage, ['*'], 'page', $page);
                $users = $paginatedUsers->getCollection()->values();
                $total = $paginatedUsers->total();
                $page = $paginatedUsers->currentPage();
                $perPage = $paginatedUsers->perPage();
            }

            $rows = $users->map(function (User $user): array {
                $data = $user->toArray();
                $data['email'] = maskEmail($data['email'] ?? '', prefixLength: 3, suffixLength: 3);
                $data['tenaga_medis_nama'] = $user->tenaga_medis?->data['nama'] ?? null;
                $data['tenaga_medis_nrp'] = $user->tenaga_medis?->data['nrp'] ?? null;
                $data['tenaga_medis_role'] = $user->roles?->pluck('display_name')->first() ?? '';
                $data['tenaga_medis_unit_rawat'] = $user->tenaga_medis?->unit_rawat?->nama ?? '';
                $data['created_by_name'] = $user->user?->tenaga_medis?->data['nama'] ?? null;
                $data['created_by'] = $data['created_by_name'];
                return $data;
            })->values();

            return response()->json([
                'status' => true,
                'message' => 'Berhasil memproses permintaan.',
                'data' => $rows,
                'total' => $total,
                'page' => $page,
                'perPage' => $perPage,
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

    private function applyAkunFilters(Builder $query, mixed $advancedFilterModel, mixed $filterModel): void
    {
        if (is_array($advancedFilterModel) && (($advancedFilterModel['filterType'] ?? null) === 'join' || isset($advancedFilterModel['colId']))) {
            $this->applyFilterNode($query, $advancedFilterModel, 'and');

            return;
        }

        foreach ($this->normalizeFilterModel($filterModel) as $columnId => $condition) {
            $this->applyColumnFilter($query, $columnId, $condition, 'and');
        }
    }

    private function buildEffectiveFilterNode(mixed $advancedFilterModel, mixed $filterModel): ?array
    {
        if (is_array($advancedFilterModel) && (($advancedFilterModel['filterType'] ?? null) === 'join' || isset($advancedFilterModel['colId']))) {
            return $advancedFilterModel;
        }

        $normalizedFilterModel = $this->normalizeFilterModel($filterModel);
        if ($normalizedFilterModel === []) {
            return null;
        }

        $conditions = array_values($normalizedFilterModel);

        if (count($conditions) === 1) {
            return $conditions[0];
        }

        return [
            'filterType' => 'join',
            'type' => 'AND',
            'conditions' => $conditions,
        ];
    }

    private function containsEncryptedFieldFilter(?array $node): bool
    {
        if ($node === null) {
            return false;
        }

        if (($node['filterType'] ?? null) === 'join') {
            $conditions = $node['conditions'] ?? [];

            if (! is_array($conditions)) {
                return false;
            }

            foreach ($conditions as $condition) {
                if (is_array($condition) && $this->containsEncryptedFieldFilter($condition)) {
                    return true;
                }
            }

            return false;
        }

        $columnId = $node['colId'] ?? null;

        return is_string($columnId) && in_array($columnId, ['tenaga_medis_nama', 'tenaga_medis_nrp', 'nrp', 'created_by', 'created_by_name'], true);
    }

    private function matchesFilterNode(User $user, ?array $node): bool
    {
        if ($node === null) {
            return true;
        }

        if (($node['filterType'] ?? null) === 'join') {
            $conditions = $node['conditions'] ?? [];
            $joinType = mb_strtolower((string) ($node['type'] ?? 'and')) === 'or' ? 'or' : 'and';

            if (! is_array($conditions) || $conditions === []) {
                return true;
            }

            if ($joinType === 'or') {
                foreach ($conditions as $condition) {
                    if (is_array($condition) && $this->matchesFilterNode($user, $condition)) {
                        return true;
                    }
                }

                return false;
            }

            foreach ($conditions as $condition) {
                if (is_array($condition) && ! $this->matchesFilterNode($user, $condition)) {
                    return false;
                }
            }

            return true;
        }

        $columnId = $node['colId'] ?? null;
        if (! is_string($columnId)) {
            return true;
        }

        return $this->matchesColumnCondition($user, $columnId, $node);
    }

    private function matchesColumnCondition(User $user, string $columnId, array $condition): bool
    {
        $conditionOne = $condition['condition1'] ?? null;
        $conditionTwo = $condition['condition2'] ?? null;

        if (is_array($conditionOne) || is_array($conditionTwo)) {
            $joinOperator = mb_strtolower((string) ($condition['operator'] ?? 'and')) === 'or' ? 'or' : 'and';
            $firstResult = is_array($conditionOne) ? $this->matchesColumnCondition($user, $columnId, $conditionOne) : null;
            $secondResult = is_array($conditionTwo) ? $this->matchesColumnCondition($user, $columnId, $conditionTwo) : null;

            if ($firstResult === null) {
                return $secondResult ?? true;
            }

            if ($secondResult === null) {
                return $firstResult;
            }

            return $joinOperator === 'or'
                ? ($firstResult || $secondResult)
                : ($firstResult && $secondResult);
        }

        if (in_array($columnId, ['tenaga_medis_nama', 'tenaga_medis_nrp', 'nrp'], true)) {
            $nama = (string) ($user->tenaga_medis?->data['nama'] ?? '');
            $nrp = (string) ($user->tenaga_medis?->data['nrp'] ?? '');
            $combined = trim($nrp . ' - ' . $nama, ' -');

            return $this->matchesTextCondition([$nama, $nrp, $combined], $condition);
        }

        if (in_array($columnId, ['created_by', 'created_by_name'], true)) {
            $creatorName = (string) ($user->user?->tenaga_medis?->data['nama'] ?? '');

            return $this->matchesTextCondition([$creatorName], $condition);
        }

        if ($columnId === 'tenaga_medis_role') {
            $roleName = (string) ($user->roles?->pluck('display_name')->first() ?? '');

            return $this->matchesTextCondition([$roleName], $condition);
        }

        if ($columnId === 'is_active') {
            return $this->matchesIsActiveCondition($user, $condition);
        }

        if ($columnId === 'created_at') {
            return $this->matchesDateCondition($user->created_at?->format('Y-m-d'), $condition);
        }

        $value = (string) data_get($user, $columnId, '');

        return $this->matchesTextCondition([$value], $condition);
    }

    private function matchesTextCondition(array $subjects, array $condition): bool
    {
        $operator = $this->resolveTextOperator($condition);
        $value = $this->resolveTextValue($condition);

        if ($operator === 'blank') {
            foreach ($subjects as $subject) {
                if (trim((string) $subject) !== '') {
                    return false;
                }
            }

            return true;
        }

        if ($operator === 'notBlank') {
            foreach ($subjects as $subject) {
                if (trim((string) $subject) !== '') {
                    return true;
                }
            }

            return false;
        }

        if (! is_string($value) || trim($value) === '') {
            return true;
        }

        $needle = trim($value);

        foreach ($subjects as $subject) {
            if ($this->matchTextValue((string) $subject, $operator, $needle)) {
                return true;
            }
        }

        return false;
    }

    private function matchesIsActiveCondition(User $user, array $condition): bool
    {
        $isActive = (bool) $user->is_active;

        if (($condition['filterType'] ?? null) === 'set') {
            $values = $condition['values'] ?? [];

            if (! is_array($values) || $values === []) {
                return true;
            }

            foreach ($values as $value) {
                $mapped = in_array(mb_strtolower((string) $value), ['1', 'true', 'aktif'], true);
                if ($mapped === $isActive) {
                    return true;
                }
            }

            return false;
        }

        $filter = $condition['filter'] ?? $condition['value'] ?? null;
        if ($filter === null || $filter === '') {
            return true;
        }

        $mapped = in_array(mb_strtolower((string) $filter), ['1', 'true', 'aktif'], true);

        return $mapped === $isActive;
    }

    private function matchesDateCondition(?string $subjectDate, array $condition): bool
    {
        $operator = (string) ($condition['type'] ?? $condition['operator'] ?? 'equals');
        $dateFrom = $condition['dateFrom'] ?? $condition['filter'] ?? $condition['value'] ?? null;
        $dateTo = $condition['dateTo'] ?? null;

        if ($operator === 'blank') {
            return $subjectDate === null || $subjectDate === '';
        }

        if ($operator === 'notBlank') {
            return $subjectDate !== null && $subjectDate !== '';
        }

        if (! is_string($dateFrom) || trim($dateFrom) === '' || ! is_string($subjectDate) || $subjectDate === '') {
            return true;
        }

        if ($operator === 'equals') {
            return $subjectDate === $dateFrom;
        }

        if ($operator === 'notEqual') {
            return $subjectDate !== $dateFrom;
        }

        if ($operator === 'lessThan') {
            return $subjectDate < $dateFrom;
        }

        if ($operator === 'greaterThan') {
            return $subjectDate > $dateFrom;
        }

        if ($operator === 'inRange' && is_string($dateTo) && trim($dateTo) !== '') {
            return $subjectDate >= $dateFrom && $subjectDate <= $dateTo;
        }

        return true;
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

    private function applyFilterNode(Builder $query, array $node, string $boolean): void
    {
        $nodeType = $node['filterType'] ?? null;

        if ($nodeType === 'join') {
            $conditions = $node['conditions'] ?? [];
            $joinType = strtolower((string) ($node['type'] ?? 'AND')) === 'or' ? 'or' : 'and';

            if (! is_array($conditions) || count($conditions) === 0) {
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
        if (! is_string($columnId)) {
            return;
        }

        $this->applyColumnFilter($query, $columnId, $node, $boolean);
    }

    private function applyColumnFilter(Builder $query, string $columnId, array $condition, string $boolean): void
    {
        $supportedColumns = ['tenaga_medis_nama', 'tenaga_medis_nrp', 'nrp', 'email', 'tenaga_medis_role', 'is_active', 'created_by', 'created_by_name', 'created_at', 'username'];
        if (! in_array($columnId, $supportedColumns, true)) {
            return;
        }

        $method = $boolean === 'or' ? 'orWhere' : 'where';

        $query->{$method}(function (Builder $nestedQuery) use ($columnId, $condition): void {
            if (in_array($columnId, ['tenaga_medis_nama', 'tenaga_medis_nrp', 'nrp'], true)) {
                $this->applyTenagaMedisFilter($nestedQuery, $condition);

                return;
            }

            if ($columnId === 'tenaga_medis_role') {
                $this->applyRoleFilter($nestedQuery, $condition);

                return;
            }

            if (in_array($columnId, ['created_by', 'created_by_name'], true)) {
                $this->applyCreatedByFilter($nestedQuery, $condition);

                return;
            }

            if ($columnId === 'is_active') {
                $this->applyIsActiveFilter($nestedQuery, $condition);

                return;
            }

            if ($columnId === 'created_at') {
                $this->applyDateFilter($nestedQuery, 'created_at', $condition);

                return;
            }

            $this->applyTextFilter($nestedQuery, $columnId, $condition);
        });
    }

    private function applyTenagaMedisFilter(Builder $query, array $condition): void
    {
        if ($this->applyCompoundTextFilter($query, $condition, function (Builder $nestedQuery, array $singleCondition): void {
            $this->applyTenagaMedisFilter($nestedQuery, $singleCondition);
        })) {
            return;
        }

        $operator = $this->resolveTextOperator($condition);
        $value = $this->resolveTextValue($condition);

        if ($operator === 'blank') {
            $query->whereDoesntHave('tenaga_medis');

            return;
        }

        if ($operator === 'notBlank') {
            $query->whereHas('tenaga_medis');

            return;
        }

        if (! is_string($value) || trim($value) === '') {
            return;
        }

        $needle = trim($value);
        $query->whereHas('tenaga_medis', function (Builder $tenaga_medisQuery) use ($operator, $needle): void {
            $tenaga_medisQuery->where(function (Builder $textQuery) use ($operator, $needle): void {
                $this->applyRawTextOperator($textQuery, "data->>'nama'", $operator, $needle);
            })->orWhere(function (Builder $textQuery) use ($operator, $needle): void {
                $this->applyRawTextOperator($textQuery, "data->>'nrp'", $operator, $needle);
            });
        });
    }

    private function applyRoleFilter(Builder $query, array $condition): void
    {
        if ($this->applyCompoundTextFilter($query, $condition, function (Builder $nestedQuery, array $singleCondition): void {
            $this->applyRoleFilter($nestedQuery, $singleCondition);
        })) {
            return;
        }

        $operator = $this->resolveTextOperator($condition);
        $value = $this->resolveTextValue($condition);

        if ($operator === 'blank') {
            $query->whereDoesntHave('roles');

            return;
        }

        if ($operator === 'notBlank') {
            $query->whereHas('roles');

            return;
        }

        if (! is_string($value) || trim($value) === '') {
            return;
        }

        $query->whereHas('roles', function (Builder $roleQuery) use ($operator, $value): void {
            $this->applyTextOperator($roleQuery, 'display_name', $operator, trim($value));
        });
    }

    private function applyCreatedByFilter(Builder $query, array $condition): void
    {
        if ($this->applyCompoundTextFilter($query, $condition, function (Builder $nestedQuery, array $singleCondition): void {
            $this->applyCreatedByFilter($nestedQuery, $singleCondition);
        })) {
            return;
        }

        $operator = $this->resolveTextOperator($condition);
        $value = $this->resolveTextValue($condition);

        if ($operator === 'blank') {
            $query->whereNull('created_by');

            return;
        }

        if ($operator === 'notBlank') {
            $query->whereNotNull('created_by');

            return;
        }

        if (! is_string($value) || trim($value) === '') {
            return;
        }

        $needle = trim($value);
        $query->whereHas('user.tenaga_medis', function (Builder $tenaga_medisQuery) use ($operator, $needle): void {
            $this->applyRawTextOperator($tenaga_medisQuery, "data->>'nama'", $operator, $needle);
        });
    }

    private function applyIsActiveFilter(Builder $query, array $condition): void
    {
        $filterType = $condition['filterType'] ?? null;

        if ($filterType === 'set') {
            $values = $condition['values'] ?? [];

            if (! is_array($values) || count($values) === 0) {
                return;
            }

            $mappedValues = collect($values)
                ->map(function (mixed $value): int {
                    return in_array(mb_strtolower((string) $value), ['1', 'true', 'aktif'], true) ? 1 : 0;
                })
                ->unique()
                ->values()
                ->all();

            $query->whereIn('is_active', $mappedValues);

            return;
        }

        $filter = $condition['filter'] ?? null;
        if ($filter === null || $filter === '') {
            return;
        }

        $query->where('is_active', in_array(mb_strtolower((string) $filter), ['1', 'true', 'aktif'], true));
    }

    private function applyDateFilter(Builder $query, string $column, array $condition): void
    {
        $operator = (string) ($condition['type'] ?? $condition['operator'] ?? 'equals');
        $dateFrom = $condition['dateFrom'] ?? $condition['filter'] ?? $condition['value'] ?? null;
        $dateTo = $condition['dateTo'] ?? null;

        if ($operator === 'blank') {
            $query->whereNull($column);

            return;
        }

        if ($operator === 'notBlank') {
            $query->whereNotNull($column);

            return;
        }

        if (! is_string($dateFrom) || trim($dateFrom) === '') {
            return;
        }

        if ($operator === 'equals') {
            $query->whereDate($column, '=', $dateFrom);

            return;
        }

        if ($operator === 'notEqual') {
            $query->whereDate($column, '!=', $dateFrom);

            return;
        }

        if ($operator === 'lessThan') {
            $query->whereDate($column, '<', $dateFrom);

            return;
        }

        if ($operator === 'greaterThan') {
            $query->whereDate($column, '>', $dateFrom);

            return;
        }

        if ($operator === 'inRange' && is_string($dateTo) && trim($dateTo) !== '') {
            $query->whereBetween(DB::raw("DATE({$column})"), [$dateFrom, $dateTo]);
        }
    }

    private function applyTextFilter(Builder $query, string $column, array $condition): void
    {
        if ($this->applyCompoundTextFilter($query, $condition, function (Builder $nestedQuery, array $singleCondition) use ($column): void {
            $this->applyTextFilter($nestedQuery, $column, $singleCondition);
        })) {
            return;
        }

        $operator = $this->resolveTextOperator($condition);
        $value = $this->resolveTextValue($condition);

        if ($operator === 'blank') {
            $query->where(function (Builder $blankQuery) use ($column): void {
                $blankQuery->whereNull($column)->orWhere($column, '');
            });

            return;
        }

        if ($operator === 'notBlank') {
            $query->where(function (Builder $notBlankQuery) use ($column): void {
                $notBlankQuery->whereNotNull($column)->where($column, '!=', '');
            });

            return;
        }

        if (! is_string($value) || trim($value) === '') {
            return;
        }

        $this->applyTextOperator($query, $column, $operator, trim($value));
    }

    private function applyCompoundTextFilter(Builder $query, array $condition, callable $applySingleCondition): bool
    {
        $conditionOne = $condition['condition1'] ?? null;
        $conditionTwo = $condition['condition2'] ?? null;

        if (! is_array($conditionOne) && ! is_array($conditionTwo)) {
            return false;
        }

        $joinOperator = mb_strtolower((string) ($condition['operator'] ?? 'and')) === 'or' ? 'or' : 'and';

        $query->where(function (Builder $nestedQuery) use ($conditionOne, $conditionTwo, $joinOperator, $applySingleCondition): void {
            $isFirstApplied = false;

            if (is_array($conditionOne)) {
                $applySingleCondition($nestedQuery, $conditionOne);
                $isFirstApplied = true;
            }

            if (! is_array($conditionTwo)) {
                return;
            }

            if (! $isFirstApplied) {
                $applySingleCondition($nestedQuery, $conditionTwo);

                return;
            }

            if ($joinOperator === 'or') {
                $nestedQuery->orWhere(function (Builder $secondQuery) use ($conditionTwo, $applySingleCondition): void {
                    $applySingleCondition($secondQuery, $conditionTwo);
                });

                return;
            }

            $nestedQuery->where(function (Builder $secondQuery) use ($conditionTwo, $applySingleCondition): void {
                $applySingleCondition($secondQuery, $conditionTwo);
            });
        });

        return true;
    }

    private function resolveTextOperator(array $condition): string
    {
        return (string) ($condition['type'] ?? $condition['operator'] ?? 'contains');
    }

    private function resolveTextValue(array $condition): mixed
    {
        return $condition['filter'] ?? $condition['value'] ?? null;
    }

    private function matchTextValue(string $subject, string $operator, string $needle): bool
    {
        $subjectLower = mb_strtolower($subject);
        $needleLower = mb_strtolower($needle);

        if ($operator === 'equals') {
            return $subjectLower === $needleLower;
        }

        if ($operator === 'notEqual') {
            return $subjectLower !== $needleLower;
        }

        if ($operator === 'startsWith') {
            return str_starts_with($subjectLower, $needleLower);
        }

        if ($operator === 'endsWith') {
            return str_ends_with($subjectLower, $needleLower);
        }

        if ($operator === 'notContains') {
            return ! str_contains($subjectLower, $needleLower);
        }

        return str_contains($subjectLower, $needleLower);
    }

    private function applyTextOperator(Builder $query, string $column, string $operator, string $value): void
    {
        if ($operator === 'equals') {
            $query->where($column, 'ilike', $value);

            return;
        }

        if ($operator === 'notEqual') {
            $query->where($column, 'not ilike', $value);

            return;
        }

        if ($operator === 'startsWith') {
            $query->where($column, 'ilike', $value . '%');

            return;
        }

        if ($operator === 'endsWith') {
            $query->where($column, 'ilike', '%' . $value);

            return;
        }

        if ($operator === 'notContains') {
            $query->where($column, 'not ilike', '%' . $value . '%');

            return;
        }

        $query->where($column, 'ilike', '%' . $value . '%');
    }

    private function applyRawTextOperator(Builder $query, string $expression, string $operator, string $value): void
    {
        if ($operator === 'equals') {
            $query->whereRaw("{$expression} ILIKE ?", [$value]);

            return;
        }

        if ($operator === 'notEqual') {
            $query->whereRaw("{$expression} NOT ILIKE ?", [$value]);

            return;
        }

        if ($operator === 'startsWith') {
            $query->whereRaw("{$expression} ILIKE ?", [$value . '%']);

            return;
        }

        if ($operator === 'endsWith') {
            $query->whereRaw("{$expression} ILIKE ?", ['%' . $value]);

            return;
        }

        if ($operator === 'notContains') {
            $query->whereRaw("{$expression} NOT ILIKE ?", ['%' . $value . '%']);

            return;
        }

        $query->whereRaw("{$expression} ILIKE ?", ['%' . $value . '%']);
    }


    public function akunBaru(Request $request): Response
    {
        $validated = $request->validate([
            'id' => ['sometimes', 'integer', Rule::exists('users', 'id')],
        ]);

        $props = [];

        if (array_key_exists('id', $validated)) {
            $user = User::query()->with('roles:id')->findOrFail($validated['id']);
            Gate::authorize('update', $user);

            $props['id'] = $user->id;
            $props['data'] = [
                'username' => $user->username,
                'email' => $user->email,
                'id_tenaga_medis' => $user->id_tenaga_medis,
                'role' => $user->roles->first()?->id,
                'activeUser' => (bool) $user->is_active,
            ];
        } else {
            Gate::authorize('create', User::class);
        }

        AuditService::logMenuAccess('Data Akun Baru');
        return Inertia::render('DataAkunBaru', $props);
    }

    public function getPersonilRole(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewAny', User::class);
            $tenaga_medis = TenagaMedis::query()
                ->get()
                ->map(function (TenagaMedis $item): array {
                    return [
                        'id' => $item->id,
                        'id_hash' => $item->id_hash,
                        'nrp' => $item->data['nrp'],
                        'nama' => $item->data['nama'],
                    ];
                })
                ->values();


            $role = Role::get()->map(function (Role $item): array {
                return [
                    'id' => $item->id,
                    'display_name' => $item->display_name
                ];
            })->values();

            return response()->json([
                'status' => true,
                'message' => 'Berhasil memproses permintaan.',
                'data' => [
                    'tenaga_medis' => $tenaga_medis,
                    'role' => $role
                ],
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

    public function addEditAkun(StoreAkunRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();
            $userId = $validated['id'] ?? null;
            $role = Role::query()->findOrFail($validated['role']);

            if ($userId) {
                $user = User::query()->findOrFail($userId);
                Gate::authorize('update', $user);

                DB::transaction(function () use ($user, $validated, $role): void {
                    $payload = [
                        'username' => trim($validated['username']),
                        'email' => isset($validated['email']) && trim((string) $validated['email']) !== '' ? trim((string) $validated['email']) : null,
                        'id_tenaga_medis' => (string) $validated['id_tenaga_medis'],
                        'is_active' => (bool) $validated['activeUser'],
                    ];

                    if (isset($validated['password']) && trim((string) $validated['password']) !== '') {
                        $payload['password'] = Hash::make((string) $validated['password']);
                    }

                    $user->update($payload);
                    $user->syncRoles([$role->name]);
                });

                return response()->json([
                    'status' => true,
                    'message' => 'Data akun berhasil diperbarui.',
                ]);
            }

            Gate::authorize('create', User::class);

            DB::transaction(function () use ($validated, $role): void {
                $user = User::query()->create([
                    'username' => trim($validated['username']),
                    'email' => isset($validated['email']) && trim((string) $validated['email']) !== '' ? trim((string) $validated['email']) : null,
                    'password' => Hash::make((string) $validated['password']),
                    'id_tenaga_medis' => (string) $validated['id_tenaga_medis'],
                    'is_active' => (bool) $validated['activeUser'],
                    'created_by' => Auth::id(),
                ]);

                $user->syncRoles([$role->name]);
            });

            return response()->json([
                'status' => true,
                'message' => 'Data akun baru berhasil disimpan.',
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk menjalankan aksi ini.',
            ], 403);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }


    public function deleteAkun(Request $request)
    {
        try {
            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:users,id'],
            ], [
                'id.integer' => 'ID harus berupa angka.',
                'id.exists'  => 'Data user tidak ditemukan.',
            ]);

            $user = User::findOrFail($validated['id']);
            Gate::authorize('delete', $user);
            $user->delete();

            return response()->json([
                'status' => true,
                'message' => 'Data user berhasil dihapus.'
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
