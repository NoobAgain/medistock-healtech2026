<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class JenisAlkes
 * 
 * @property int $id
 * @property string $nama
 * @property bool $is_active
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class JenisAlkes extends Model
{
	protected $table = 'jenis_alkes';

	protected $casts = [
		'is_active' => 'bool'
	];

	protected $fillable = [
		'nama',
		'is_active'
	];
}
