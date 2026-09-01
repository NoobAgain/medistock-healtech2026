<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // php artisan migrate:rollback --path=database/migrations/2026_03_11_115156_pengiriman.php; php artisan migrate
    public function up(): void
    {
        Schema::create('pengiriman', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('uid')->index();
            $table->unsignedBigInteger('id_nan')->nullable();
            $table->string('hash')->unique();
            $table->bigInteger('created_by')->nullable();
            $table->timestamps();


            $table->foreign('id_nan')
                ->references('nan')
                ->on('alokasi')
                ->nullOnDelete();
        });

        Schema::create('pengiriman_event', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pengiriman_id')
                ->constrained('pengiriman')
                ->cascadeOnDelete();
            $table->integer('status')->default(0)->index();
            $table->text('note');
            $table->bigInteger('created_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengiriman_event');
        Schema::dropIfExists('pengiriman');
    }
};
