<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // php artisan migrate:rollback --path=database/migrations/2026_03_04_231524_created_alokasi.php
    // php artisan migrate
    public function up(): void
    {
        Schema::create('alokasi', function (Blueprint $table) {
            $table->id();
            // $table->string('uid', 30)->unique();
            $table->bigInteger('nan')->unique();
            $table->unsignedBigInteger('unit_rawat_id');
            $table->string('periode', 20); // contoh: 2026-01
            $table->enum('status', ['1', '2'])->default('1');

            $table->unsignedBigInteger('created_by')->nullable();

            $table->timestamps();

            // Foreign Key
            $table->foreign('unit_rawat_id')
                ->references('id')
                ->on('unit_rawat')
                ->cascadeOnDelete();

            // Optional jika ada tabel users
            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->nullOnDelete();

            // Constraint unik: 1 unit_rawat hanya 1 alokasi per periode
            $table->unique(['unit_rawat_id', 'periode']);

            // Index tambahan
            $table->index('periode');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alokasi');
    }
};
