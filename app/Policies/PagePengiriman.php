<?php

namespace App\Policies;

use App\Models\Pengiriman;
use App\Models\User;

class PagePengiriman
{
    // Akses menu
    public function viewAny(User $user): bool
    {
        return $user->can('menu.pengiriman');
    }

    // Detail data item pengiriman
    public function view(User $user): bool
    {
        return $user->can('menu.pengiriman.dataitem');
    }

    // Tambah data baru
    public function create(User $user): bool
    {
        return $user->can('menu.pengiriman.baru');
    }

    // Edit data
    public function update(User $user, Pengiriman $pengiriman): bool
    {
        return $user->can('menu.pengiriman.edit');
    }

    // Hapus data
    public function delete(User $user, Pengiriman $pengiriman): bool
    {
        return $user->can('menu.pengiriman.hapus');
    }

    // Monitoring pengiriman
    public function restore(User $user, Pengiriman $pengiriman): bool
    {
        return $user->can('menu.pengiriman.monitoring');
    }

    // Cetak / Export
    public function forceDelete(User $user, Pengiriman $pengiriman): bool
    {
        return $user->can('menu.pengiriman.cetak');
    }

    // Monitoring pengiriman (non-model action)
    public function monitoring(User $user): bool
    {
        return $user->can('menu.pengiriman.monitoring');
    }

    // Cetak / Export (non-model action)
    public function print(User $user): bool
    {
        return $user->can('menu.pengiriman.cetak');
    }


    public function dataitem(User $user): bool
    {
        return $user->can('menu.pengiriman.dataitem');
    }





    public function viewAnyKonfirmasi(User $user): bool
    {
        return $user->can('menu.konfirmasi');
    }

    public function transit(User $user): bool
    {
        return $user->can('menu.konfirmasi.transit');
    }

    public function tiba(User $user): bool
    {
        return $user->can('menu.konfirmasi.tiba');
    }

    public function dataItemKonfirmasi(User $user): bool
    {
        return $user->can('menu.konfirmasi.dataitem');
    }

    public function cetakKonfirmasi(User $user): bool
    {
        return $user->can('menu.konfirmasi.cetak');
    }
}
