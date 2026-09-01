<?php

namespace App\Policies;

use App\Models\User;

class PageAkun
{
    // Akses menu
    public function viewAny(User $user): bool
    {
        return $user->can('menu.dataakun');
    }

    // Tambah data baru
    public function create(User $user): bool
    {
        return $user->can('menu.dataakun.baru');
    }

    // Edit data
    public function update(User $user, User $users): bool
    {
        return $user->can('menu.dataakun.edit');
    }

    // Hapus data
    public function delete(User $user, User $users): bool
    {
        return $user->can('menu.dataakun.hapus');
    }

    // Cetak / Export
    public function print(User $user): bool
    {
        return $user->can('menu.dataakun.cetak');
    }

    // DisAktif
    public function disaktif(User $user): bool
    {
        return $user->can('menu.dataakun.disaktif');
    }
}
