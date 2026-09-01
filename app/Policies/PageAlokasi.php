<?php

namespace App\Policies;

use App\Models\Alokasi;
use App\Models\User;

class PageAlokasi
{
    // Akses menu
    public function viewAny(User $user): bool
    {
        return $user->can('menu.alokasi');
    }

    // Tambah data baru
    public function create(User $user): bool
    {
        return $user->can('menu.alokasi.baru');
    }

    // Edit data
    public function update(User $user, Alokasi $alokasi): bool
    {
        return $user->can('menu.alokasi.edit');
    }

    // Hapus data
    public function delete(User $user, Alokasi $alokasi): bool
    {
        return $user->can('menu.alokasi.hapus');
    }

    // Cetak / Export
    public function print(User $user): bool
    {
        return $user->can('menu.alokasi.cetak');
    }

    /**
     * Otorisasi persetujuan rencana penyaluran (ACC level 1).
     * Dipisah dari izin edit agar sesuai SOP validasi (lebih aman).
     */
    public function accRencana(User $user, Alokasi $alokasi): bool
    {
        return $user->can('menu.alokasi.accrencana');
    }

    /**
     * Otorisasi persetujuan rencana penyaluran oleh pusat/pabrik (ACC final).
     * Dipisah dari izin edit agar sesuai SOP validasi (lebih aman).
     */
    public function accRencanaPusat(User $user, Alokasi $alokasi): bool
    {
        return $user->can('menu.alokasi.accrencanapusat');
    }
}
