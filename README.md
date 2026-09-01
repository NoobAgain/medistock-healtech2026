# MediStock

**HealTech Front-Line Code Challenge 2026 — Tim HYPNOTICE**

## Anggota Tim
- Wirpan Atmaja Putra — Front-End Developer / Team Lead
- Debbyla Putri Yuwanda — UI/UX Designer

## Tentang Proyek
MediStock adalah platform monitoring distribusi obat & alat kesehatan (alkes) berbasis *event recording*, yang mencatat setiap perpindahan barang secara real-time dari gudang farmasi pusat sampai ke unit rawat/apotek. Tujuannya adalah mendeteksi ketidaksesuaian stok lebih awal dan menghadirkan bukti digital serah terima (Proof of Delivery).

### Fitur Utama
- Dashboard status pengiriman (init → transit → arrived → delivered)
- Penanda **FLAG** (ketidaksesuaian) dan **LOCK** (butuh verifikasi manual)
- Rekonsiliasi alokasi vs penerimaan aktual
- Formulir Proof of Delivery (PoD) digital
- Timeline/audit trail per box/item, dilengkapi dark mode

### Tech Stack
- **Frontend:** Vue.js 3, Inertia.js, Tailwind CSS
- **Backend:** Laravel 12, PostgreSQL, Redis

## Instalasi & Menjalankan Secara Lokal

### Prasyarat
- PHP >= 8.2, Composer
- Node.js >= 18, npm
- PostgreSQL

### Langkah-langkah
```bash
# 1. Clone repository
git clone https://github.com/NoobAgain/medistock-healtech2026.git
cd medistock-healtech2026

# 2. Install dependency PHP
composer install

# 3. Install dependency JavaScript
npm install

# 4. Salin file environment dan sesuaikan koneksi database
cp .env.example .env
# lalu edit .env: DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD

# 5. Generate application key
php artisan key:generate

# 6. Jalankan migration & seeder
php artisan migrate:fresh --seed

# 7. Build asset frontend
npm run build

# 8. Jalankan server lokal
php artisan serve
```

Aplikasi dapat diakses di `http://localhost:8000`.

Untuk mode development dengan hot-reload:
```bash
npm run dev
```
(jalankan di terminal terpisah, bersamaan dengan `php artisan serve`)

## Deployment (Vercel)

Aplikasi dikonfigurasi untuk deploy ke Vercel menggunakan runtime `vercel-php`. Konfigurasi tersedia di `vercel.json` dan `api/index.php`.

### Prasyarat di Vercel
MediStock membutuhkan **PostgreSQL** dan **Redis**. Sebelum deploy, siapkan instance gratis dari layanan berikut lalu isi sebagai Environment Variables di dashboard Vercel (Project → Settings → Environment Variables):

- **PostgreSQL** — mis. [Neon](https://neon.tech) atau [Supabase](https://supabase.com)
  - `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, `DB_SSLMODE`
- **Redis** — mis. [Upstash](https://upstash.com)
  - `REDIS_URL`
- **Lainnya**
  - `APP_KEY` (generate via `php artisan key:generate`)
  - `APP_ENV=production`, `APP_DEBUG=false`
  - `HMAC_SECRET`
  - `SESSION_DRIVER=cookie`, `CACHE_STORE=array` (wajib pada serverless, sudah diset default di `vercel.json`)

### Proses
1. Import repository ke Vercel → pilih project.
2. Set Environment Variables di atas (lihat daftar di bawah).
3. Biarkan Build Command / Output Settings **default** — vercel-php akan otomatis menjalankan `composer install` lalu `composer run vercel` (membangun asset frontend, menyalinnya ke output statis, menjalankan migration & seeder) lewat script `vercel` di `composer.json`.
4. Klik **Deploy** dan tunggu build selesai (status **Success**).

> **Catatan penting:** Environment Variables di dashboard Vercel (Project → Settings → Environment Variables) **wajib** diisi sebelum deploy, karena migration & seeder butuh koneksi `postgres` saat build. Isi minimal:
> - `APP_KEY` (dari `php artisan key:generate`)
> - `APP_ENV=production`, `APP_DEBUG=false`
> - `DB_CONNECTION=pgsql`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, `DB_SSLMODE=require`
> - `HMAC_SECRET`
> - `REDIS_URL` (opsional; bila tidak dipakai, pastikan `CACHE_STORE=array` & `SESSION_DRIVER=cookie`)
>
> Jangan pernah menulis kredensial asli ke dalam `.env` yang di-commit — file `.env`, `.env asli`, dan `**/pgpass` sudah di-`gitignore`/`.vercelignore`.
