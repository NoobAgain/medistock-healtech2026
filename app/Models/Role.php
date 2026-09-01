<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Permission\Models\Role as SpatieRole;

/**
 * Class Role
 *
 * @property int $id
 * @property string $name
 * @property string $guard_name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $display_name
 *
 * @property Collection|ModelHasRole[] $model_has_roles
 * @property Collection|Permission[] $permissions
 *
 * @package App\Models
 */
class Role extends SpatieRole
{
    protected $table = 'roles';

    protected $fillable = [
        'name',
        'guard_name',
        'display_name'
    ];

    public function model_has_roles(): HasMany
    {
        return $this->hasMany(ModelHasRole::class);
    }
}
