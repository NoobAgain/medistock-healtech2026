<?php

namespace App\Trait;

use App\Models\AuditLog;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

trait HasAuditLog
{
    protected array $auditExclude = [
        'password',
        'remember_token',
        'updated_at',
    ];

    protected static function bootHasAuditLog(): void
    {
        static::created(function ($model) {
            $model->writeAudit('created');
        });

        static::updating(function ($model) {
            $model->writeAudit('updated');
        });

        static::deleted(function ($model) {
            $model->writeAudit('deleted');
        });

        if (in_array(\Illuminate\Database\Eloquent\SoftDeletes::class, class_uses_recursive(static::class))) {
            static::forceDeleted(function ($model) {
                $model->writeAudit('force_deleted');
            });
        }
    }

    protected function getAuditExclude(): array
    {
        return $this->auditExclude ?? ['password', 'remember_token', 'updated_at'];
    }

    protected function writeAudit(string $action): void
    {
        if ($this instanceof AuditLog) return;

        try {
            $exclude  = $this->getAuditExclude();
            $original = collect($this->getOriginal())->except($exclude)->toArray();
            $current  = collect($this->attributesToArray())->except($exclude)->toArray();
            $dirty    = array_keys($this->getDirty());

            $payload = [
                'user_id'     => Auth::id(),
                'action'      => $action,
                'model_type'  => get_class($this),
                'model_id'    => $this->getKey(),
                'hash_before' => $original ? hash('sha256', json_encode($original)) : null,
                'hash_after'  => hash('sha256', json_encode($current)),
                'metadata'    => [
                    'before'  => $action === 'created' ? null : $original,
                    'after'   => $current,
                    'changed' => $dirty,
                ],
                'ip_address'  => Request::ip(),
                'user_agent'  => Request::userAgent(),
            ];

            if (Schema::hasColumn('audit_logs', 'unit_id')) {
                $payload['unit_id'] = Auth::user()?->unit_id;
            }

            AuditLog::create($payload);
        } catch (\Throwable $e) {
            logger()->error('Audit log gagal disimpan', [
                'model'  => get_class($this),
                'action' => $action,
                'error'  => $e->getMessage(),
            ]);
        }
    }

    public function logMenuAccess(string $menuName): void
    {
        try {
            $payload = [
                'user_id'    => Auth::id(),
                'action'     => 'access_menu',
                'model_type' => get_class($this),
                'model_id'   => $this->getKey(),
                'metadata'   => [
                    'menu' => $menuName,
                    'url'  => Request::path(),
                ],
                'ip_address' => Request::ip(),
                'user_agent' => Request::userAgent(),
            ];

            if (Schema::hasColumn('audit_logs', 'unit_id')) {
                $payload['unit_id'] = Auth::user()?->unit_id;
            }

            AuditLog::create($payload);
        } catch (\Throwable $e) {
            logger()->error('Audit menu access gagal', [
                'menu'  => $menuName,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
