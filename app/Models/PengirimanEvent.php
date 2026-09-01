<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PengirimanEvent
 *
 * @property int $id
 * @property int $pengiriman_id
 * @property int $status
 * @property string $note
 * @property int|null $created_by
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Pengiriman $pengiriman
 *
 * @package App\Models
 */
class PengirimanEvent extends Model
{
    protected $table = 'pengiriman_event';

    protected $casts = [
        'pengiriman_id' => 'int',
        'status' => 'int',
        'created_by' => 'int',
        'scanned_item' => 'int',
        'item_details' => 'array',
    ];

    protected $fillable = [
        'pengiriman_id',
        'status',
        'note',
        'created_by',
        'scanned_item',
        'item_details',
    ];

    public function pengiriman()
    {
        return $this->belongsTo(Pengiriman::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
