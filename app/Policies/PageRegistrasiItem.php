<?php

namespace App\Policies;

use App\Models\ItemInventory;
use App\Models\User;

class PageRegistrasiItem
{
    // Akses menu
    public function viewAny(User $user): bool
    {
        return $user->can('menu.inventory');
    }

    // Tambah data baru
    public function create(User $user): bool
    {
        return $user->can('menu.inventory.baru');
    }

    // Edit data
    public function update(User $user, ItemInventory $item): bool
    {
        return $user->can('menu.inventory.edit');
    }

    // Hapus data
    public function delete(User $user, ItemInventory $item): bool
    {
        return $user->can('menu.inventory.hapus');
    }

    // Cetak / Export
    public function print(User $user): bool
    {
        return $user->can('menu.inventory.cetak');
    }
}
