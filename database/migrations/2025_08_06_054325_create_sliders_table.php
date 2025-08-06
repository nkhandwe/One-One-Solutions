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
        Schema::create('sliders', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable()->comment('Slider title or label');
            $table->string('link')->nullable()->comment('Optional URL to redirect when clicked');
            $table->string('image')->nullable()->comment('Path to the slider image');
            $table->unsignedInteger('position')->default(1)->comment('Display order of the slider');
            $table->boolean('is_active')->default(true)->comment('Slider visibility toggle');
            $table->timestamps();
            $table->softDeletes(); // Optional: if you want to support soft delete
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sliders');
    }
};
