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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable()->comment('Name of the person giving the testimonial');
            $table->string('designation')->nullable()->comment('Job title or role');
            $table->text('message')->nullable()->comment('Testimonial message');
            $table->string('image')->nullable()->comment('Optional photo of the person');
            $table->unsignedInteger('rating')->nullable()->comment('Optional rating out of 5');
            $table->boolean('is_active')->default(true)->comment('Visibility toggle');
            $table->unsignedInteger('position')->default(1)->comment('Order of appearance');
            $table->timestamps();
            $table->softDeletes(); // Optional: for soft deletes
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
