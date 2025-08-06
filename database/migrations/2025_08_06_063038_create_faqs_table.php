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
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->string('question')->comment('The FAQ question');
            $table->text('answer')->comment('Answer to the FAQ question');
            $table->boolean('is_active')->default(true)->comment('Status to show/hide FAQ');
            $table->unsignedInteger('order')->default(0)->comment('Display order of FAQ');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faqs');
    }
};
