<?php

use App\Enums\BookingStatus;
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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('table_id');
            $table->foreignId('order_id')->nullable();
            $table->string('gcash_reference_id')->nullable();
            $table->string('image')->nullable();
            $table->date('date');
            $table->time('time');
            $table->unsignedInteger('no_people');
            $table->tinyInteger('booking_status')->default(BookingStatus::PENDING->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
