<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class UnitRawat
 *
 * @property int $id
 * @property int|null $faskes_id
 * @property string $jenis
 * @property string|null $nomor
 * @property string|null $nama
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Faskes|null $faskes
 *
 * @package App\Models
 */
class UnitRawat extends Model
{
    protected $table = 'unit_rawat';

    protected $casts = [
        'faskes_id' => 'int'
    ];

    protected $fillable = [
        'kode',
        'nama'
    ];

    public function faskes()
    {
        return $this->belongsTo(Faskes::class);
    }
}
