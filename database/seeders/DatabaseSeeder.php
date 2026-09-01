<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * php artisan migrate:fresh --seed
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $this->call([
            // Buat user admin terlebih dahulu agar role dapat di-assign
            default_uac::class,
            RolePermissionSeeder::class,
            // FaskesSeeder::class,
        ]);
    }
}
