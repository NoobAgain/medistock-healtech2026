<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Periode
 *
 * @property int $id
 * @property string $nama
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Periode extends Model
{
    protected $table = 'periode';

    protected $fillable = [
        'nama',
    ];

    public function alokasiDatas()
    {
        return $this->hasMany(Alokasi::class);
    }
}
