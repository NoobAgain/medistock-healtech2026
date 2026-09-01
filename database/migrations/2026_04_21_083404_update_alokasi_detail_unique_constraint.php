<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Updates unique constraint from:
     *   alokasi_nan + jenis + ukuran
     * To:
     *   alokasi_nan + jenis + ukuran + kategori + tenaga_medis_id
     *
     * This allows same jenis+ukuran+kategori with DIFFERENT tenaga_medis,
     * but disallows duplicates if tenaga_medis is also the same.
     */
    public function up(): void
    {
        // Drop old constraint if it exists
        try {
            DB::statement('ALTER TABLE alokasi_detail DROP CONSTRAINT IF EXISTS alokasi_detail_alokasi_nan_jenis_ukuran_unique');
        } catch (\Exception $e) {
            // Constraint might not exist, continue
        }

        // Create new constraint with all 5 columns
        Schema::table('alokasi_detail', function (Blueprint $table) {
            $table->unique(['alokasi_nan', 'jenis', 'ukuran', 'kategori', 'tenaga_medis_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop new constraint if exists
        try {
            DB::statement('ALTER TABLE alokasi_detail DROP CONSTRAINT IF EXISTS alokasi_detail_alokasi_nan_jenis_ukuran_kategori_tenaga_medis_id_unique');
        } catch (\Exception $e) {
            // Constraint might not exist, continue
        }

        // Restore old constraint
        Schema::table('alokasi_detail', function (Blueprint $table) {
            $table->unique(['alokasi_nan', 'jenis', 'ukuran']);
        });
    }
};
