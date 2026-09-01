<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AlokasiDetail
 *
 * @property int $id
 * @property int $alokasi_nan
 * @property string $jenis
 * @property string $ukuran
 * @property string $kategori
 * @property int $jumlah
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Alokasi $alokasi
 */
class AlokasiDetail extends Model
{
    protected $table = 'alokasi_detail';

    protected $casts = [
        'alokasi_nan' => 'int',
        'jumlah' => 'int',
        'jenis' => 'array',
        'ukuran' => 'array',
        'kategori' => 'array',
    ];

    protected $fillable = [
        'alokasi_nan',
        'jenis',
        'ukuran',
        'kategori',
        'tenaga_medis_id',
        'jumlah',
    ];

    public function alokasi()
    {
        return $this->belongsTo(Alokasi::class, 'alokasi_nan', 'nan');
    }

    public function item_inventories()
    {
        return $this->hasMany(ItemInventory::class, 'id_detail_alokasi');
    }

    public function tenaga_medis()
    {
        return $this->belongsTo(TenagaMedis::class, 'tenaga_medis_id');
    }

    public function items()
    {
        return $this->hasMany(ItemInventory::class, 'id_detail_alokasi');
    }
}
