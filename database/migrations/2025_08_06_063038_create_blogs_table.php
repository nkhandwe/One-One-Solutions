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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Blog post title');
            $table->string('slug')->unique()->comment('SEO-friendly URL');
            $table->text('excerpt')->nullable()->comment('Short summary of the blog');
            $table->longText('content')->nullable()->comment('Main content of the blog');
            $table->string('image')->nullable()->comment('Featured image path');
            $table->string('author')->nullable()->comment('Author name or ID');
            $table->json('tags')->nullable()->comment('Tags as JSON array');
            $table->boolean('is_published')->default(false)->comment('Publish status');
            $table->timestamp('published_at')->nullable()->comment('When blog was published');
            $table->timestamps();
            $table->softDeletes(); // Optional: allow soft deletion
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
