<?php

namespace App\Services;

use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Schema;

class AuditService
{
    public static function logMenuAccess(string $menuName): void
    {
        try {
            $payload = [
                'user_id'    => Auth::id(),
                'action'     => 'access_menu',
                'model_type' => Auth::user() ? get_class(Auth::user()) : null,
                'model_id'   => Auth::id(),
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

    public static function logAction(string $action, string $message, array $metadata = []): void
    {
        try {
            $payload = [
                'user_id'    => Auth::id(),
                'action'     => $action,
                'model_type' => Auth::user() ? get_class(Auth::user()) : null,
                'model_id'   => Auth::id(),
                'metadata'   => array_merge(['message' => $message], $metadata),
                'ip_address' => Request::ip(),
                'user_agent' => Request::userAgent(),
            ];

            if (Schema::hasColumn('audit_logs', 'unit_id')) {
                $payload['unit_id'] = Auth::user()?->unit_id;
            }

            AuditLog::create($payload);
        } catch (\Throwable $e) {
            logger()->error('Audit action gagal', [
                'action' => $action,
                'error'  => $e->getMessage(),
            ]);
        }
    }
}
