<?php
// Paksa semua storage path (logs, cache, sessions, views) ke /tmp — read-only fix
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

// ... baris require bootstrap yang sudah ada, contoh:
$app = require __DIR__ . '/../bootstrap/app.php';

// Tepat SETELAH $app dibuat, tambahkan ini:
$app->useStoragePath($tmpStorage);
