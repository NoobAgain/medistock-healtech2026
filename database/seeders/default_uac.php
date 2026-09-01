<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class default_uac extends Seeder
{
    public function run(): void
    {
        DB::table('users')->truncate();
        $insertData = [
            'email' => 'syderbit182@gmail.com',
            'username' => 'admin',
            'password' => '$2b$12$2TaPeapIrne1xb8jO.9l9eBFoP5Om2n/MycuQmJ0B1NEPzXk0Ra6C', // ini hasil hash dari "Kesehatan@123"
            'is_active' => true,
        ];
        DB::table('users')->insert($insertData);
    }
}
