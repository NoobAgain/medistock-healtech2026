<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

// php artisan db:seed --class=RolePermissionSeeder
class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        Schema::disableForeignKeyConstraints();

        DB::table('role_has_permissions')->truncate();
        DB::table('model_has_roles')->truncate();
        DB::table('model_has_permissions')->truncate();
        DB::table('roles')->truncate();
        DB::table('permissions')->truncate();

        Schema::enableForeignKeyConstraints();

        /*
    |--------------------------------------------------------------------------
    | PERMISSIONS
    |--------------------------------------------------------------------------
    */

        $permissions = [

            // Rencana Penyaluran
            'menu.alokasi',
            'menu.alokasi.baru',
            'menu.alokasi.hapus',
            'menu.alokasi.edit',
            'menu.alokasi.accrencana',
            'menu.alokasi.accrencanapusat',
            'menu.alokasi.addeditperiode',

            // TenagaMedis
            'menu.tenaga_medis',
            'menu.tenaga_medis.baru',
            'menu.tenaga_medis.hapus',
            'menu.tenaga_medis.edit',

            // Data Akun
            'menu.dataakun',
            'menu.dataakun.baru',
            'menu.dataakun.hapus',
            'menu.dataakun.edit',
            'menu.dataakun.disaktif',

            // Data Manajemen Peran
            'menu.datarole',
            'menu.datarole.baru',
            'menu.datarole.hapus',
            'menu.datarole.edit',

            // inventory
            'menu.inventory',
            'menu.inventory.dataitem',
            'menu.inventory.baru',
            'menu.inventory.hapus',
            'menu.inventory.edit',

            // Pencarian / Pelacakan
            'menu.pencarian',

            // Pengiriman
            'menu.pengiriman',
            'menu.pengiriman.baru',
            'menu.pengiriman.hapus',
            'menu.pengiriman.edit',
            'menu.pengiriman.dataitem',
            'menu.pengiriman.monitoring',

            // Konfirmasi
            'menu.konfirmasi',
            'menu.konfirmasi.transit',
            'menu.konfirmasi.tiba',
            'menu.konfirmasi.dataitem',

            // Distribusi
            'menu.distribusi',
            'menu.distribusi.confirm',
            'menu.distribusi.baru',

            // System
            'system.manage_roles',
            'system.view_logs',

            // Test Reader
            'menu.reader',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        /*
    |--------------------------------------------------------------------------
    | ROLES
    |--------------------------------------------------------------------------
    */

        // Admin pusat
        $adminPusat = Role::firstOrCreate([
            'name' => 'admin_pusat',
            'display_name' => 'Admin Pusat',
        ]);

        $adminPusat->syncPermissions(Permission::all());

        // Petugas gudang
        $gudang = Role::firstOrCreate([
            'name' => 'petugas_gudang',
            'display_name' => 'Petugas Gudang',
        ]);

        $gudang->syncPermissions([
            'menu.inventory',
            'menu.inventory.dataitem',
            'menu.inventory.baru',

            'menu.pengiriman',
            'menu.pengiriman.monitoring',
        ]);

        // Petugas transit
        $transit = Role::firstOrCreate([
            'name' => 'petugas_transit',
            'display_name' => 'Petugas Transit',
        ]);

        $transit->syncPermissions([
            'menu.pengiriman.monitoring',
            'menu.konfirmasi.transit',
        ]);

        // Unit operasional
        $unitOperasional = Role::firstOrCreate([
            'name' => 'unit_operasional',
            'display_name' => 'Unit Operasional',
        ]);

        $unitOperasional->syncPermissions([
            'menu.konfirmasi.tiba',
            'menu.distribusi',
            'menu.distribusi.confirm',
        ]);

        // Pimpinan
        $pimpinan = Role::firstOrCreate([
            'name' => 'pimpinan',
            'display_name' => 'Pimpinan',
        ]);

        $pimpinan->syncPermissions([
            'menu.alokasi',
            'menu.pengiriman.monitoring',
            'menu.distribusi',
        ]);

        /*
    |--------------------------------------------------------------------------
    | SYSTEM ADMIN
    |--------------------------------------------------------------------------
    */
        // $systemAdmin = Role::firstOrCreate([
        //     'name' => 'system_admin',
        //     'display_name' => 'system_admin'
        // ]);
        // $systemAdmin->syncPermissions(Permission::all());
        $adminUser = User::where('email', 'syderbit182@gmail.com')->first();
        if ($adminUser) {
            $adminUser->syncRoles([$adminPusat]);
        }
    }
}
