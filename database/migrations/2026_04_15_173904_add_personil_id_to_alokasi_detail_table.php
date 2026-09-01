<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('alokasi_detail', function (Blueprint $table) {
            $table->unsignedBigInteger('tenaga_medis_id')->nullable()->after('kategori');
            $table->foreign('tenaga_medis_id')->references('id')->on('tenaga_medis');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('alokasi_detail', function (Blueprint $table) {
            $table->dropForeign(['tenaga_medis_id']);
            $table->dropColumn('tenaga_medis_id');
        });
    }
};
