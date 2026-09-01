<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // php artisan migrate:rollback --path=database/migrations/2026_03_15_060414_po_d.php;php artisan migrate
    public function up(): void
    {
        Schema::create('pod', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pengiriman_id')
                ->constrained('pengiriman')
                ->noActionOnDelete();

            $table->foreignId('item_id')
                ->constrained('item_inventory')
                ->noActionOnDelete();

            $table->foreignId('tenaga_medis_id')
                ->constrained('tenaga_medis')
                ->noActionOnDelete();


            $table->string('file');
            $table->bigInteger('created_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pod');
    }
};
