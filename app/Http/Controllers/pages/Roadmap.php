<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Services\AuditService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Roadmap extends Controller
{
    public function index(Request $request)
    {
        AuditService::logMenuAccess('Roadmap');

        return Inertia::render('Roadmap');
    }
}
