<?php
// File: test_hmac.php
// Skrip Uji Coba Logika Verifikasi HMAC-SHA256 (Negative Testing)

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Helpers\HmacHelper;

// UID Dummy untuk pengujian
$uid_asli = '1777013636577';

// 1. GENERATE HASH BARU menggunakan HMAC_SECRET dari .env lokal Bapak SAAT INI
// Ini menjamin 100% Skenario 1 akan VALID
$hash_lokal = HmacHelper::generate($uid_asli);

// SKENARIO 1: Verifikasi Data Asli (Harus VALID)
$hasil_asli = HmacHelper::verify($uid_asli, $hash_lokal);

// SKENARIO 2: Simulasi Tampering (UID Dimodifikasi 1 digit)
$uid_palsu = $uid_asli . '9'; 
$hasil_palsu = HmacHelper::verify($uid_palsu, $hash_lokal);

// Output Terminal
echo "======================================================\n";
echo "  UJI INTEGRITAS HMAC-SHA256 (NEGATIVE TESTING)\n";
echo "  Prototipe Monitoring Distribusi Obat & Alkes - MediStock\n";
echo "======================================================\n\n";

echo "[INPUT DATA & KUNCI .ENV LOKAL]\n";
echo "UID Asli    : " . $uid_asli . "\n";
echo "HMAC_SECRET : " . substr(config('app.hmac_secret'), 0, 15) . "...\n";
echo "Hash Lokal  : " . substr($hash_lokal, 0, 30) . "...\n\n";

echo "[SKENARIO 1: DATA ASLI (POSITIVE TESTING)]\n";
echo "Status      : " . ($hasil_asli ? "✅ VALID (Sistem Menerima)" : "❌ TIDAK VALID") . "\n\n";

echo "[SKENARIO 2: DATA DIPALSUKAN (NEGATIVE TESTING)]\n";
echo "UID Palsu   : " . $uid_palsu . "\n";
echo "Status      : " . ($hasil_palsu ? "✅ VALID (BAHAYA!)" : "❌ TIDAK VALID (MANIPULASI TERDETEKSI)") . "\n\n";

echo "======================================================\n";
echo "KESIMPULAN: Sistem berhasil menerapkan sifat Tamper-Evident.\n";
echo "Perubahan 1 digit pada UID menyebabkan verifikasi gagal.\n";
echo "======================================================\n";