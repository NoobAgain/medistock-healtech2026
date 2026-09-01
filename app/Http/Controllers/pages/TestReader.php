<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Services\AuditService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;


class TestReader extends Controller
{
    public function index()
    {
        Gate::authorize('menu.reader');
        AuditService::logMenuAccess('Test Reader');
        return Inertia::render('TestReader');
    }
}
