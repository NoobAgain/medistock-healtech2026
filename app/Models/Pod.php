<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Pod
 *
 * @property int $id
 * @property int $pengiriman_id
 * @property int $item_id
 * @property int $tenaga_medis_id
 * @property string $file
 * @property int|null $created_by
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Pengiriman $pengiriman
 * @property ItemInventory $item_inventory
 * @property TenagaMedis $tenaga_medis
 *
 * @package App\Models
 */
class Pod extends Model
{
	protected $table = 'pod';

	protected $casts = [
		'pengiriman_id' => 'int',
		'item_id' => 'int',
		'tenaga_medis_id' => 'int',
		'status' => 'int',
		'created_by' => 'int'
	];

	protected $fillable = [
		'pengiriman_id',
		'item_id',
		'tenaga_medis_id',
		'file',
		'status',
		'created_by'
	];

	public function pengiriman()
	{
		return $this->belongsTo(Pengiriman::class);
	}

	public function item_inventory()
	{
		return $this->belongsTo(ItemInventory::class, 'item_id');
	}

	public function tenaga_medis()
	{
		return $this->belongsTo(TenagaMedis::class);
	}
}
