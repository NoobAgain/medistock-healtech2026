<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    // NRP          : 21180198180295
    // Nama Lengkap : Sertu Budi Santoso
    // Pangkat      : Sersan Satu (Sertu)
    // UnitRawat       : Yonif 511 / Dibyatara Yodha
    // Faskes        : Faskes V / Brawijaya
    // Dislokasi    : Malang, Jawa Timur
    // Ukuran Baju Alkes  : K2
    // Tanggal Lahir: 15 Maret 1998
    // Alamat       : Jl. S. Supriadi No. 47, Lowokwaru, Malang
    // Tanggal Masuk UnitRawat: 2022-06-10
    // Status       : Aktif (penerima bekal kelas II aktif)


    public function up(): void
    {
        Schema::create('tenaga_medis', function (Blueprint $table) {
            $table->id();
            $table->char('id_hash', 64)->unique();
            $table->longText('data');
            $table->timestamps();

            $table->index('created_at');
            $table->index('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenaga_medis');
    }
};
