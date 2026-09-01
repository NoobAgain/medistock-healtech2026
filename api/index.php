<?php

require __DIR__ . '/../vendor/autoload.php';

// Paksa semua storage path ke /tmp — read-only fix
$tmpStorage = '/tmp/storage';
foreach (['logs', 'framework/cache', 'framework/sessions', 'framework/views'] as $dir) {
    $path = $tmpStorage . '/' . $dir;
    if (!is_dir($path)) {
        mkdir($path, 0777, true);
    }
}

$_ENV['LOG_CHANNEL'] = 'stderr';
$_SERVER['LOG_CHANNEL'] = 'stderr';
putenv('LOG_CHANNEL=stderr');

// Paksa maintenance driver — fix ArgumentCountError dari config/app.php
$_ENV['APP_MAINTENANCE_DRIVER'] = 'file';
$_SERVER['APP_MAINTENANCE_DRIVER'] = 'file';
putenv('APP_MAINTENANCE_DRIVER=file');

$app = require __DIR__ . '/../bootstrap/app.php';

$app->useStoragePath($tmpStorage);

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$request = Illuminate\Http\Request::capture();

$response = $kernel->handle($request);

$response->send();

$kernel->terminate($request, $response);
