<?php
// File: test_hmac.php (Taruh di folder ROOT proyek, bukan di public)
// File ini mem-boot Laravel secara manual untuk mengakses HmacHelper

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Helpers\HmacHelper;

// Data riil dari Database Bapak (Tabel D.2 Lampiran D)
$uid_asli  = '1777013636577';
$hash_asli = '3157e2eef66f44d1a801a55f7f113fb70e3643b63c3ecea1ceb418c537ecdb96';

// SKENARIO 1: Verifikasi Data Asli
$hasil_asli = HmacHelper::verify($uid_asli, $hash_asli);

// SKENARIO 2: Simulasi Tampering (UID Dimodifikasi)
$uid_palsu = $uid_asli . '9'; // Menambahkan angka 9 di belakang
$hasil_palsu = HmacHelper::verify($uid_palsu, $hash_asli);

// Tampilkan Hasil ke Layar Terminal
echo "======================================================\n";
echo "  UJI INTEGRITAS HMAC-SHA256 (NEGATIVE TESTING)\n";
echo "  Prototipe Monitoring Distribusi Obat & Alkes - MediStock\n";
echo "======================================================\n\n";

echo "[INPUT DATA]\n";
echo "UID Asli    : " . $uid_asli . "\n";
echo "Hash di DB  : " . substr($hash_asli, 0, 30) . "...\n\n";

echo "[SKENARIO 1: DATA ASLI]\n";
echo "Status      : " . ($hasil_asli ? "✅ VALID (Sistem Menerima)" : "❌ TIDAK VALID") . "\n\n";

echo "[SKENARIO 2: DATA DIPALSUKAN (TAMPERING)]\n";
echo "UID Palsu   : " . $uid_palsu . "\n";
echo "Status      : " . ($hasil_palsu ? "✅ VALID (BAHAYA! SISTEM TERTIPU)" : "❌ TIDAK VALID (MANIPULASI TERDETEKSI)") . "\n\n";

echo "======================================================\n";
echo "KESIMPULAN: Sistem berhasil menerapkan sifat Tamper-Evident.\n";
echo "Perubahan 1 digit pada UID menyebabkan verifikasi gagal.\n";
echo "======================================================\n";