<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('settings')->insert([
            // Basic Info
            'app_name' => 'One One Solutions',
            'favicon' => 'assets/favicon.png',
            'logo_light' => 'assets/logo_light.png',
            'logo_dark' => 'assets/logo_dark.png',
            'address' => 'One One Solutions',

            // Contact Info
            'mobile_number' => '+91-7999662009',
            'whatsApp_number' => '+91-7999662009',
            'email' => 'info@oneonesolution.com',
            'support_email' => null,
            'notification_email' => null,

            // UI & Branding
            'theme_color' => null,
            'use_dark_mode' => false,

            // Social Links
            'facebook_url' => null,
            'linkedin_url' => null,
            'twitter_url' => null,
            'instagram_url' => null,
            'youtube_url' => null,

            // SEO
            'meta_title' => null,
            'meta_description' => null,

            // System Settings
            'maintenance_mode' => false,
            'maintenance_message' => null,
            'version' => '1.0.0',
            'timezone' => 'Asia/Kolkata',

            // Notifications
            'enable_email_notifications' => true,

            // Amazon Specific
            'advertising_acos_target' => null,

            // Timestamps
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
