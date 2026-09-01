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
            'password' => '$2y$12$zwKhFoMzktMfN6C06RDy3eqT199emtneXwxPkegc8hzKnTqZYrd7S', // ini hasil hash dari "Kesehatan@123"
            'is_active' => true,
        ];
        DB::table('users')->insert($insertData);
    }
}
