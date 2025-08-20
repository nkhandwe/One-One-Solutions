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
        Schema::table('blogs', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable()->after('author')->constrained('blog_categories')->onDelete('set null');
            $table->string('featured_image')->nullable()->after('image')->comment('Featured image file path');
            $table->text('meta_description')->nullable()->after('excerpt')->comment('SEO meta description');
            $table->json('meta_keywords')->nullable()->after('meta_description')->comment('SEO keywords');
            $table->integer('views_count')->default(0)->after('published_at')->comment('Number of views');
            $table->integer('reading_time')->nullable()->after('views_count')->comment('Estimated reading time in minutes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn([
                'category_id',
                'featured_image',
                'meta_description',
                'meta_keywords',
                'views_count',
                'reading_time'
            ]);
        });
    }
};
