<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Pengiriman
 *
 * @property int $id
 * @property int $uid
 * @property int|null $id_nan
 * @property string $hash
 * @property int|null $created_by
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Alokasi|null $alokasi
 * @property Collection|PengirimanEvent[] $pengiriman_events
 *
 * @package App\Models
 */
class Pengiriman extends Model
{
	protected $table = 'pengiriman';

	protected $casts = [
		'uid' => 'int',
		'id_nan' => 'int',
		'created_by' => 'int'
	];

	protected $fillable = [
		'uid',
		'id_nan',
		'hash',
		'created_by'
	];

	public function alokasi()
	{
		return $this->belongsTo(Alokasi::class, 'id_nan', 'nan');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'created_by');
	}

	public function pengiriman_events()
	{
		return $this->hasMany(PengirimanEvent::class);
	}

	public function penerima_event()
	{
		return $this->hasMany(PengirimanEvent::class)->where('status', 3);
	}
}
