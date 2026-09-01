<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // php artisan migrate:rollback --path=database/migrations/2026_03_09_084138_inventory_item.php
    // php artisan migrate
    public function up(): void
    {
        Schema::create('item_inventory', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_detail_alokasi')
                ->nullable()
                ->constrained('alokasi_detail')
                ->nullOnDelete();

            $table->bigInteger('nsn')->index();
            $table->string('hash')->index();
            $table->integer('status')->default(0)->index();
            $table->bigInteger('created_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_inventory');
    }
};
