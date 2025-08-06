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
        Schema::create('banners', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable()->comment('Main banner heading');
            $table->string('subtitle')->nullable()->comment('Optional subtitle or tagline');
            $table->string('image')->nullable()->comment('Banner image path');
            $table->string('link')->nullable()->comment('Target URL when banner is clicked');
            $table->string('button_text')->nullable()->comment('CTA button label');
            $table->unsignedInteger('position')->default(1)->comment('Order of appearance');
            $table->boolean('is_active')->default(true)->comment('Visibility toggle');
            $table->timestamps();
            $table->softDeletes(); // Optional: allow soft deletes
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banners');
    }
};
