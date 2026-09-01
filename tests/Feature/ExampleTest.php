<?php

use App\Models\Alokasi;
use App\Models\AlokasiDetail;
use App\Models\ItemInventory;
use App\Models\UnitRawat;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

test('returns a successful response', function () {
    /** @var \Tests\TestCase $this */
    $response = $this->get(route('login'));

    $response->assertOk();
});

test('filters inventory data by related category and nsn', function () {
    app(PermissionRegistrar::class)->forgetCachedPermissions();

    Permission::create([
        'name' => 'menu.inventory',
        'guard_name' => 'web',
    ]);

    $user = User::query()->create([
        'email' => 'inventory@example.test',
        'username' => 'inventory-user',
        'password' => Hash::make('password'),
        'is_active' => true,
    ]);
    $user->givePermissionTo('menu.inventory');

    $unit_rawat = UnitRawat::query()->create([
        'kode' => 'SAT-01',
        'nama' => 'UnitRawat Uji',
    ]);

    $alokasi = Alokasi::query()->create([
        'nan' => 2026001,
        'unit_rawat_id' => $unit_rawat->id,
        'periode' => '2026',
        'status' => '1',
        'created_by' => $user->id,
    ]);

    $detailBoots = AlokasiDetail::query()->create([
        'alokasi_nan' => $alokasi->nan,
        'jenis' => json_encode(['id' => 1, 'name' => 'Sepatu'], JSON_THROW_ON_ERROR),
        'ukuran' => json_encode(['id' => 1, 'name' => '42'], JSON_THROW_ON_ERROR),
        'kategori' => json_encode(['id' => 1, 'name' => 'Tempur'], JSON_THROW_ON_ERROR),
        'jumlah' => 10,
    ]);

    $detailHelmet = AlokasiDetail::query()->create([
        'alokasi_nan' => $alokasi->nan,
        'jenis' => json_encode(['id' => 2, 'name' => 'Helm'], JSON_THROW_ON_ERROR),
        'ukuran' => json_encode(['id' => 2, 'name' => 'L'], JSON_THROW_ON_ERROR),
        'kategori' => json_encode(['id' => 2, 'name' => 'Latihan'], JSON_THROW_ON_ERROR),
        'jumlah' => 8,
    ]);

    ItemInventory::query()->create([
        'id_detail_alokasi' => $detailBoots->id,
        'nsn' => 123456789,
        'hash' => 'HASH-BOOTS-001',
        'status' => 1,
        'created_by' => $user->id,
    ]);

    ItemInventory::query()->create([
        'id_detail_alokasi' => $detailHelmet->id,
        'nsn' => 987654321,
        'hash' => 'HASH-HELM-001',
        'status' => 1,
        'created_by' => $user->id,
    ]);

    /** @var \Tests\TestCase $this */
    $response = $this->actingAs($user)
        ->postJson(route('reg-item-listdata'), [
            'page' => 1,
            'perPage' => 10,
            'filterModel' => [
                'nsn' => [
                    'filterType' => 'text',
                    'type' => 'contains',
                    'filter' => '1234',
                ],
                'alokasi_detail.kategori.name' => [
                    'filterType' => 'text',
                    'type' => 'contains',
                    'filter' => 'temp',
                ],
            ],
        ]);

    $response
        ->assertOk()
        ->assertJsonPath('status', true)
        ->assertJsonPath('total', 1)
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.nsn', 123456789);
});
