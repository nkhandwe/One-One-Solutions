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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();

            // Basic Info
            $table->string('app_name')->default('One One Solutions');
            $table->string('favicon')->default('assets/favicon.png');
            $table->string('logo_light')->default('assets/logo_light.png');
            $table->string('logo_dark')->default('assets/logo_dark.png');
            $table->string('address')->default('One One Solutions');

            // Contact Info
            $table->string('mobile_number')->default('+91-7999662009');
            $table->string('whatsApp_number')->default('+91-7999662009');
            $table->string('email')->default('info@oneonesolution.com');
            $table->string('support_email')->nullable();
            $table->string('notification_email')->nullable();

            // UI & Branding
            $table->string('theme_color')->nullable();
            $table->boolean('use_dark_mode')->default(false);

            // Social Links
            $table->string('facebook_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('youtube_url')->nullable();

            // SEO
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();

            // System Settings
            $table->boolean('maintenance_mode')->default(false);
            $table->text('maintenance_message')->nullable();
            $table->string('version')->default('1.0.0');
            $table->string('timezone')->default('Asia/Kolkata');

            // Notifications
            $table->boolean('enable_email_notifications')->default(true);

            // Amazon Specific
            $table->string('advertising_acos_target')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
