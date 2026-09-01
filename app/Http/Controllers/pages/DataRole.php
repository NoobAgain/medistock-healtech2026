<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use App\Services\AuditService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class DataRole extends Controller
{

    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Role::class);
        AuditService::logMenuAccess('Manajemen Peran');
        return Inertia::render('DataRole');
    }

    public function getDataRole(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'page' => ['nullable', 'integer', 'min:1'],
                'perPage' => ['nullable', 'integer', 'min:1', 'max:100'],
                'sortField' => ['nullable', 'string', 'in:display_name,permissions_count,created_at,displayName,permissionsCount'],
                'sortDirection' => ['nullable', 'string', 'in:asc,desc'],
                'filterModel' => ['nullable', 'array'],
                'advancedFilterModel' => ['nullable', 'array'],
            ]);
            // dd($request->all());
            $page = (int) ($validated['page'] ?? 1);
            $perPage = (int) ($validated['perPage'] ?? 10);
            $requestedSortField = $validated['sortField'] ?? 'name';
            $sortDirection = $validated['sortDirection'] ?? 'asc';
            $advancedFilterModel = $validated['advancedFilterModel'] ?? normalizeFilterModel($validated['filterModel'] ?? null);

            $sortField = match ($requestedSortField) {
                'displayName' => 'display_name',
                'permissionsCount' => 'permissions_count',
                default => $requestedSortField,
            };

            $query = Role::query()->withCount('permissions');
            applyDisplayNameAdvancedFilter($query, $advancedFilterModel);

            if ($sortField === 'permissions_count') {
                $query->orderBy('permissions_count', $sortDirection);
            } else {
                $query->orderBy($sortField, $sortDirection);
            }
            $paginatedRoles = $query->paginate($perPage, ['*'], 'page', $page);

            $rows = $paginatedRoles->getCollection()->map(function (Role $role): array {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'guardName' => $role->guard_name,
                    'permissionsCount' => $role->permissions_count,
                    'displayName' => $role->display_name,
                ];
            })->values();

            return response()->json([
                'status' => true,
                'message' => 'Berhasil memproses permintaan.',
                'data' => $rows,
                'total' => $paginatedRoles->total(),
                'page' => $paginatedRoles->currentPage(),
                'perPage' => $paginatedRoles->perPage(),
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



    public function roleBaru(Request $request)
    {
        $validated = $request->validate([
            'id' => ['sometimes', 'integer', Rule::exists('roles', 'id')],
        ]);

        $props = [];
        if (array_key_exists('id', $validated)) {
            $dataRole = Role::query()->findOrFail($validated['id']);
            Gate::authorize('update', $dataRole);
            if ($dataRole) {
                $props['id'] = $dataRole->id;
                $permissionData = $dataRole
                    ->permissions()
                    ->pluck('name')
                    ->all();
                $props['dataPermissions'] = $permissionData;
                $props['displayname'] = $dataRole->display_name;
            }
        } else {
            Gate::authorize('create', Role::class);
        }

        $allPermission = Permission::query()->pluck('name')->all();
        $props['allPermission'] = $allPermission;
        AuditService::logMenuAccess('Manajemen Peran Baru');
        return Inertia::render('DataRoleBaru', $props);
    }

    public function roleBaruAddedit(Request $request): JsonResponse
    {
        try {
            $role = null;
            $validatedId = $request->validate([
                'id' => ['sometimes', 'integer', Rule::exists('roles', 'id')],
            ]);

            if (array_key_exists('id', $validatedId)) {
                $role = Role::query()->findOrFail($validatedId['id']);
                Gate::authorize('update', $role);
            } else {
                Gate::authorize('create', Role::class);
            }

            $validated = $request->validate([
                'displayname' => [
                    'required',
                    'string',
                    'min:5',
                    'max:255',
                    Rule::unique('roles', 'display_name')->ignore($role?->id),
                ],
                'permissions' => ['nullable', 'array'],
                'permissions.*' => ['string', 'exists:permissions,name'],
            ]);

            $displayName = trim($validated['displayname']);
            $permissionNames = array_values(array_unique($validated['permissions'] ?? []));
            $permissionIds = Permission::query()
                ->whereIn('name', $permissionNames)
                ->pluck('id')
                ->all();

            if ($role) {
                DB::transaction(function () use ($role, $displayName, $permissionIds): void {
                    $role->update([
                        'display_name' => $displayName,
                    ]);

                    $role->permissions()->sync($permissionIds);
                });

                return response()->json([
                    'status' => true,
                    'message' => 'Role berhasil diperbarui.',
                ]);
            }

            $baseRoleName = Str::slug($displayName, '_');

            if ($baseRoleName === '') {
                $baseRoleName = 'role';
            }

            $roleName = $baseRoleName;
            $suffix = 1;

            while (Role::query()->where('name', $roleName)->where('guard_name', 'web')->exists()) {
                $roleName = $baseRoleName . '_' . $suffix;
                $suffix++;
            }

            DB::transaction(function () use ($displayName, $roleName, $permissionIds): void {
                $role = Role::query()->create([
                    'display_name' => $displayName,
                    'name' => $roleName,
                    'guard_name' => 'web',
                ]);

                $role->permissions()->sync($permissionIds);
            });

            return response()->json([
                'status' => true,
                'message' => 'Role baru berhasil disimpan.',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }


    public function deleteRole(Request $request)
    {
        try {
            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:roles,id'],
            ], [
                'id.integer' => 'ID harus berupa angka.',
                'id.exists'  => 'Data Role tidak ditemukan.',
            ]);

            $role = Role::findOrFail($validated['id']);
            Gate::authorize('delete', $role);

            $role->syncPermissions([]);
            $role->delete();

            return response()->json([
                'status' => true,
                'message' => 'Data Role berhasil dihapus.'
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
