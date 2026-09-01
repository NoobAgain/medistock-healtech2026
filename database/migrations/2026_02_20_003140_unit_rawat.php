<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // UnitRawat       : Yonif 511 / Dibyatara Yodha
    // Faskes        : Faskes V / Brawijaya

    public function up(): void
    {
        Schema::create('unit_rawat', function (Blueprint $table) {
            $table->id();
            $table->string('kode')->nullable(); // 511
            $table->string('nama')->nullable(); // Dibyatara Yodha

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unit_rawat');
    }
};
