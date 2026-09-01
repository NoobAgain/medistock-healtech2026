<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ItemInventory
 *
 * @property int $id
 * @property int|null $id_detail_alokasi
 * @property int $nsn
 * @property string $hash
 * @property int $status
 * @property int|null $created_by
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property AlokasiDetail|null $alokasi_detail
 *
 * @package App\Models
 */
class ItemInventory extends Model
{
    protected $table = 'item_inventory';

    protected $casts = [
        'id_detail_alokasi' => 'int',
        'nsn' => 'int',
        'status' => 'int',
        'created_by' => 'int'
    ];

    protected $fillable = [
        'id_detail_alokasi',
        'nsn',
        'hash',
        'status',
        'keterangan',
        'created_by'
    ];

    public function alokasi_detail()
    {
        return $this->belongsTo(AlokasiDetail::class, 'id_detail_alokasi');
    }
}
