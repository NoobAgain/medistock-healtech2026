<?php

namespace App\Policies;

use App\Models\TenagaMedis;
use App\Models\User;

class PageTenagaMedis
{
    // Akses menu tenaga_medis umum
    public function viewAny(User $user): bool
    {
        return $user->can('menu.tenaga_medis');
    }

    // Tambah data baru
    public function create(User $user): bool
    {
        return $user->can('menu.tenaga_medis.baru');
    }

    // Edit data
    public function update(User $user, TenagaMedis $tenaga_medis): bool
    {
        return $user->can('menu.tenaga_medis.edit');
    }

    // Hapus data
    public function delete(User $user, TenagaMedis $tenaga_medis): bool
    {
        return $user->can('menu.tenaga_medis.hapus');
    }

    // Cetak / Export
    public function print(User $user): bool
    {
        return $user->can('menu.tenaga_medis.cetak');
    }
}
