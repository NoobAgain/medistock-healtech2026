# MediStock

Sistem Informasi Manajemen Distribusi Obat dan Alkes Rumah Sakit.

Proyek ini dikembangkan untuk mengikuti **HealTech Front-Line Code Challenge 2026** oleh **Tim HYPNOTICE**.

## Daftar Anggota Tim

| No. | Nama | Peran |
| --- | --- | --- |
| 1 | Wirpan Atmaja Putra | Full-Stack Developer / Team Lead |
| 2 | Debbyla Putri Yuwanda | UI/UX Designer |

## Tentang Proyek

MediStock adalah platform untuk memantau distribusi obat dan alat kesehatan (alkes) dari gudang farmasi pusat sampai ke unit rawat dan apotek. Setiap perpindahan barang dicatat sebagai *event* sehingga perjalanan tiap box atau item bisa ditelusuri mulai dari awal sampai diterima di tujuan.

Tujuan utama aplikasi ini adalah:

1. Mendeteksi ketidaksesuaian stok lebih awal sebelum barang sampai ke pasien.
2. Menyediakan bukti digital serah terima atau Proof of Delivery (PoD).
3. Menjaga transparansi rantai distribusi dengan catatan audit (audit trail) yang lengkap.

### Fitur Utama

1. Dashboard status pengiriman, mulai dari `init`, `transit`, `arrived`, sampai `delivered`.
2. Penanda FLAG untuk menandai ketidaksesuaian dan LOCK untuk barang yang butuh verifikasi manual.
3. Rekonsiliasi jumlah alokasi terhadap jumlah penerimaan aktual.
4. Formulir Proof of Delivery (PoD) digital.
5. Timeline atau audit trail per box dan per item, lengkap dengan dark mode.
6. Manajemen data akun, personil, dan role pengguna.

### Teknologi yang Digunakan

| Bagian | Teknologi |
| --- | --- |
| Frontend | Vue.js 3, Inertia.js, Tailwind CSS |
| Backend | Laravel 12, PHP 8.2+ |
| Database | PostgreSQL |
| Cache & Queue | Redis |
| Layout | Blade + Inertia (Single Page Application) |

## Langkah Instalasi dan Menjalankan Secara Lokal

### Prasyarat

Sebelum mulai, pastikan tools berikut sudah terpasang di komputer kamu.

1. PHP minimal versi 8.2.
2. Composer.
3. Node.js minimal versi 18 beserta npm.
4. PostgreSQL (service database aktif).

### Langkah Instalasi

1. Clone repository.

   ```bash
   git clone https://github.com/NoobAgain/medistock-healtech2026.git
   cd medistock-healtech2026
   ```

2. Install dependency PHP.

   ```bash
   composer install
   ```

3. Install dependency JavaScript.

   ```bash
   npm install
   ```

4. Buat file environment dengan menyalin dari contoh yang tersedia.

   ```bash
   cp .env.example .env
   ```

5. Sesuaikan konfigurasi database di file `.env`. Bagian yang perlu diperhatikan:

   1. `DB_CONNECTION=pgsql`
   2. `DB_HOST=127.0.0.1`
   3. `DB_PORT=5432`
   4. `DB_DATABASE=nama_database`
   5. `DB_USERNAME=username_postgres`
   6. `DB_PASSWORD=password_postgres`

6. Generate application key.

   ```bash
   php artisan key:generate
   ```

7. Jalankan migration sekaligus seeder untuk mengisi data awal.

   ```bash
   php artisan migrate:fresh --seed
   ```

8. Build asset frontend agar siap dipakai.

   ```bash
   npm run build
   ```

9. Jalankan server lokal.

   ```bash
   php artisan serve
   ```

10. Buka aplikasi di browser dengan alamat `http://localhost:8000`.

Untuk pengembangan (development) yang lebih nyaman dengan auto reload, jalankan perintah berikut di terminal terpisah:

```bash
npm run dev
```

Jalankan bersamaan dengan `php artisan serve` di atas. Setiap perubahan file yang berhubungan dengan Vue atau CSS akan otomatis di-compile ulang.

### Menjalankan dengan Docker (Opsional)

Jika kamu lebih suka memakai Docker, repository ini sudah menyediakan `docker-compose.yaml` yang menyiapkan aplikasi, PostgreSQL, Redis, dan Nginx secara bersamaan. Pastikan perintah `docker compose` tersedia di komputer kamu, lalu jalankan dari root project:

1. Salin file environment seperti langkah di atas.
2. Sesuaikan koneksi database di `.env` agar menunjuk service `pgsql` (`DB_HOST=pgsql`, `DB_PORT=5432`).
3. Jalankan container.

   ```bash
   docker compose up --build -d
   ```

4. Setelah semua container selesai berjalan, aplikasi bisa diakses melalui `http://localhost`.

### Login Pengguna Uji

Seeder yang berjalan melalui `php artisan migrate:fresh --seed` akan membuat satu akun pengguna default. Gunakan kredensial berikut untuk mencoba masuk ke aplikasi.

1. Username: `admin`
2. Password: `Kesehatan@123`

## Deployment ke Vercel

Aplikasi ini dikonfigurasi untuk deploy menggunakan runtime `vercel-php`. Konfigurasi tersedia di file `vercel.json` dan `api/index.php`.

MediStock membutuhkan PostgreSQL dan Redis. Kamu bisa memakai layanan gratis seperti Neon atau Supabase untuk PostgreSQL, dan Upstash untuk Redis.

Sebelum menekan tombol Deploy, isi Environment Variables di dashboard Vercel (Project, lalu Settings, lalu Environment Variables):

1. `APP_KEY`, hasil generate dari `php artisan key:generate`.
2. `APP_ENV=production` dan `APP_DEBUG=false`.
3. `DB_CONNECTION=pgsql`, lengkap dengan `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, dan `DB_SSLMODE=require`.
4. `HMAC_SECRET` untuk keperluan tanda tangan/validasi.
5. `REDIS_URL` dari layanan Redis yang dipakai.

Catatan penting:

1. Environment Variables wajib diisi sebelum deploy, karena migrasi dan seeder dijalankan saat proses build.
2. Jangan pernah menulis kredensial asli ke file `.env` yang ikut ter-commit. File `.env`, `.env asli`, dan `**/pgpass` sudah dimasukkan ke `.gitignore` dan `.vercelignore`.