<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Faskes
 * 
 * @property int $id
 * @property string $kode
 * @property string $nama
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|UnitRawat[] $unit_rawats
 * @property Collection|Unit[] $units
 *
 * @package App\Models
 */
class Faskes extends Model
{
	protected $table = 'faskes';

	protected $fillable = [
		'kode',
		'nama'
	];

	public function unit_rawats()
	{
		return $this->hasMany(UnitRawat::class);
	}

	public function units()
	{
		return $this->hasMany(Unit::class);
	}
}
