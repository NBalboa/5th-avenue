<?php

use App\Enums\IsAvailable;
use App\Enums\IsDeleted;
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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id');
            $table->string('image');
            $table->string('name');
            $table->decimal('price', 10, 2);
            $table->unsignedInteger('quantity')->nullable();
            $table->tinyInteger('is_deleted')->default(IsDeleted::NO->value);
            $table->tinyInteger('is_available')->default(IsAvailable::YES->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
