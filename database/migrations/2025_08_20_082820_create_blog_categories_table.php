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
        Schema::create('blog_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique()->comment('Category name');
            $table->string('slug')->unique()->comment('SEO-friendly URL slug');
            $table->text('description')->nullable()->comment('Category description');
            $table->string('color', 7)->default('#3B82F6')->comment('Category color for UI');
            $table->string('icon')->nullable()->comment('Category icon class');
            $table->boolean('is_active')->default(true)->comment('Active status');
            $table->integer('sort_order')->default(0)->comment('Display order');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_categories');
    }
};
