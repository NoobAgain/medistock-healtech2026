<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use App\Trait\HasAuditLog;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

/**
 * Class User
 *
 * @property int $id
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $username
 * @property string $password
 * @property string|null $id_tenaga_medis
 * @property bool $is_active
 * @property Carbon|null $last_login_at
 * @property int|null $created_by
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property User|null $user
 * @property Collection|User[] $users
 * @property Collection|AuditLog[] $audit_logs
 *
 * @package App\Models
 */
class User extends Authenticatable
{
    use Notifiable, HasRoles, HasAuditLog;

    protected $table = 'users';

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active' => 'bool',
        'last_login_at' => 'datetime',
        'created_by' => 'int'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    protected $fillable = [
        'email',
        'email_verified_at',
        'username',
        'password',
        'id_tenaga_medis',
        'is_active',
        'last_login_at',
        'created_by',
        'remember_token'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function users()
    {
        return $this->hasMany(User::class, 'created_by');
    }

    public function audit_logs()
    {
        return $this->hasMany(AuditLog::class);
    }

    public function tenaga_medis()
    {
        return $this->belongsTo(TenagaMedis::class, 'id_tenaga_medis', 'id');
    }
}
