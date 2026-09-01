<?php

namespace App\Policies;

use App\Models\User;

class PagePenyaluran
{
    public function viewPOD(User $user): bool
    {
        return $user->can('menu.distribusi');
    }


    public function createPOD(User $user): bool
    {
        return $user->can('menu.distribusi.confirm');
    }
}
