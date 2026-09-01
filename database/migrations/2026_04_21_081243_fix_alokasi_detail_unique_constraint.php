<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Fixes the unique constraint to include:
     * alokasi_nan + jenis + ukuran + kategori + tenaga_medis_id
     *
     * This allows same jenis+ukuran+kategori with DIFFERENT tenaga_medis,
     * but disallows duplicates if tenaga_medis is also the same.
     */
    public function up(): void
    {
        Schema::table('alokasi_detail', function (Blueprint $table) {
            // Drop old constraint if exists
            try {
                $table->dropUnique(['alokasi_nan', 'jenis', 'ukuran']);
            } catch (\Exception $e) {
                // Constraint might not exist, continue
            }

            // Create new constraint with all 5 columns
            $table->unique(['alokasi_nan', 'jenis', 'ukuran', 'kategori', 'tenaga_medis_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('alokasi_detail', function (Blueprint $table) {
            // Drop the new constraint
            try {
                $table->dropUnique(['alokasi_nan', 'jenis', 'ukuran', 'kategori', 'tenaga_medis_id']);
            } catch (\Exception $e) {
                // Constraint might not exist, continue
            }

            // Restore old constraint
            $table->unique(['alokasi_nan', 'jenis', 'ukuran']);
        });
    }
};
