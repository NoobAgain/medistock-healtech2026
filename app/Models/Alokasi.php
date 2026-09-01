<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use App\Trait\HasAuditLog;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Alokasi
 *
 * @property int $id
 * @property int $nan
 * @property int $unit_rawat_id
 * @property int|null $periode_id
 * @property string $periode
 * @property string $status
 * @property int|null $created_by
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property UnitRawat $unit_rawat
 * @property Periode|null $periodeModel
 * @property User|null $user
 */
class Alokasi extends Model
{
    use HasAuditLog;

    protected $table = 'alokasi';

    protected $casts = [
        'nan' => 'int',
        'unit_rawat_id' => 'int',
        'periode_id' => 'int',
        'created_by' => 'int',
    ];

    protected $fillable = [
        'nan',
        'unit_rawat_id',
        'periode_id',
        'periode',
        'status',
        'created_by',
    ];

    public function unit_rawat()
    {
        return $this->belongsTo(UnitRawat::class);
    }

    public function periodeModel()
    {
        return $this->belongsTo(Periode::class, 'periode_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function details()
    {
        return $this->hasMany(AlokasiDetail::class, 'alokasi_nan', 'nan');
    }

    public function pengiriman()
    {
        return $this->hasMany(Pengiriman::class, 'id_nan', 'nan');
    }
}
