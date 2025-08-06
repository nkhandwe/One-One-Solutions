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
        Schema::create('portfolios', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable()->comment('Title of the project');
            $table->text('description')->nullable()->comment('Short description');
            $table->string('image')->nullable()->comment('Main image of the project');
            $table->string('link')->nullable()->comment('External URL if applicable');
            $table->string('category')->nullable()->comment('Category of the work');
            $table->boolean('is_featured')->default(false)->comment('Is this portfolio item featured?');
            $table->unsignedInteger('position')->default(1)->comment('Display order');
            $table->timestamps();
            $table->softDeletes(); // Optional soft delete
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolios');
    }
};
