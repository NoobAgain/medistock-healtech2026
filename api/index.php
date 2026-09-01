<?php

require __DIR__ . '/../vendor/autoload.php';   // <-- WAJIB paling atas, sebelum baris lain apapun

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

$app = require __DIR__ . '/../bootstrap/app.php';

$app->useStoragePath($tmpStorage);

// ... sisanya (kernel handle request, dst) tetap seperti semula