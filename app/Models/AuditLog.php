<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AuditLog
 *
 * @property int $id
 * @property int|null $user_id
 * @property int|null $unit_id
 * @property string $action
 * @property string|null $model_type
 * @property int|null $model_id
 * @property string|null $hash_before
 * @property string|null $hash_after
 * @property string|null $metadata
 * @property inet|null $ip_address
 * @property string|null $user_agent
 * @property Carbon $created_at
 *
 * @property User|null $user
 * @property Unit|null $unit
 *
 * @package App\Models
 */
class AuditLog extends Model
{
    protected $table = 'audit_logs';
    public $timestamps = false;

    protected $casts = [
        'user_id' => 'int',
        'unit_id' => 'int',
        'model_id' => 'int',
        'ip_address' => 'string',
        'metadata' => 'array'
    ];

    protected $fillable = [
        'user_id',
        'unit_id',
        'action',
        'model_type',
        'model_id',
        'hash_before',
        'hash_after',
        'metadata',
        'ip_address',
        'user_agent'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }
}
