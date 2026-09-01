<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    // php artisan migrate:rollback --path=database/migrations/2026_03_04_231535_created_alokasi_detail.php
    // php artisan migrate
    public function up(): void
    {
        Schema::create('alokasi_detail', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('alokasi_nan');
            $table->text('jenis');
            $table->text('ukuran');
            $table->text('kategori');
            $table->unsignedInteger('jumlah');

            $table->timestamps();

            // Foreign Key
            $table->foreign('alokasi_nan')
                ->references('nan')
                ->on('alokasi')
                ->cascadeOnDelete();

            // Tidak boleh ada jenis + ukuran ganda dalam 1 alokasi
            $table->unique(['alokasi_nan', 'jenis', 'ukuran']);
            $table->index('alokasi_nan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alokasi_detail');
    }
};
