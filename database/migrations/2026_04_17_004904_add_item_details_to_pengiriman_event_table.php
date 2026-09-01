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
        Schema::table('pengiriman_event', function (Blueprint $table) {
            $table->json('item_details')->nullable()->after('scanned_item');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengiriman_event', function (Blueprint $table) {
            $table->dropColumn('item_details');
        });
    }
};
