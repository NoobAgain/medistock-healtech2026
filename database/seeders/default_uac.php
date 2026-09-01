<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class default_uac extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->truncate();
        $insertData = [
            'email' => 'syderbit182@gmail.com',
            'username' => 'admin',
            'password' => '$2y$12$HUhy2ED8bg23XOZ4VyE.v.Ozku15LihSAjkOVv82xdjJ8CdMkrVlO',
            'is_active' => true,
        ];
        DB::table('users')->insert($insertData);
    }
}
