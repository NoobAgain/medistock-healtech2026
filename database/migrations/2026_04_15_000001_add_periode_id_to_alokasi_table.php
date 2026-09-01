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
        Schema::table('alokasi', function (Blueprint $table) {
            // Add periode_id column (nullable initially)
            $table->unsignedBigInteger('periode_id')->nullable()->after('mou_id');
        });

        // Keep the old periode column for reference if needed, will be dropped in a separate migration
        // Add foreign key constraint
        Schema::table('alokasi', function (Blueprint $table) {
            $table->foreign('periode_id')
                ->references('id')
                ->on('periode')
                ->onDelete('restrict')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('alokasi', function (Blueprint $table) {
            $table->dropForeignKey(['periode_id']);
            $table->dropColumn('periode_id');
        });
    }
};
