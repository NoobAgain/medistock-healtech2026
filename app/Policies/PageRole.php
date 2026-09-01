<?php

namespace App\Policies;

use App\Models\Role;
use App\Models\User;

class PageRole
{
    // Akses menu
    public function viewAny(User $user): bool
    {
        return $user->can('menu.datarole');
    }

    // Tambah data baru
    public function create(User $user): bool
    {
        return $user->can('menu.datarole.baru');
    }

    // Edit data
    public function update(User $user, Role $role): bool
    {
        return $user->can('menu.datarole.edit');
    }

    // Hapus data
    public function delete(User $user, Role $role): bool
    {
        return $user->can('menu.datarole.hapus');
    }
}
