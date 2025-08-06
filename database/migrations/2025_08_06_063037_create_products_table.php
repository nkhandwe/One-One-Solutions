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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Product name');
            $table->string('slug')->unique()->comment('SEO-friendly identifier');
            $table->text('description')->nullable()->comment('Product description');
            $table->decimal('price', 10, 2)->default(0.00)->comment('Product price');
            $table->unsignedInteger('stock')->default(0)->comment('Available stock');
            $table->string('image')->nullable()->comment('Main image path');
            $table->boolean('is_active')->default(true)->comment('Is product active/visible');
            $table->unsignedInteger('position')->default(1)->comment('Sort/display order');
            $table->timestamps();
            $table->softDeletes(); // Optional soft delete support
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
