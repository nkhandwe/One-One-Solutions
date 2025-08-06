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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Service name');
            $table->string('slug')->unique()->comment('URL-friendly identifier');
            $table->text('short_description')->nullable()->comment('Brief summary');
            $table->longText('description')->nullable()->comment('Detailed description');
            $table->string('icon')->nullable()->comment('Icon class or image');
            $table->string('image')->nullable()->comment('Image path');
            $table->boolean('is_active')->default(true)->comment('Visibility toggle');
            $table->unsignedInteger('position')->default(1)->comment('Display order');
            $table->timestamps();
            $table->softDeletes(); // Optional soft delete support
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
