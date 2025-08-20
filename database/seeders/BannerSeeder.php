<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $banners = [
            [
                'title' => 'Welcome to OneOne Solution',
                'subtitle' => 'Professional Amazon account management services. Manage your clients, track performance, and grow your business.',
                'image' => '',
                'link' => '/services',
                'button_text' => 'Get Started',
                'is_active' => true,
                'position' => 1,
            ],
            [
                'title' => 'Expert Amazon Management',
                'subtitle' => 'Trusted by thousands of sellers worldwide. Our team of experts helps you navigate the complex Amazon marketplace.',
                'image' => '',
                'link' => '/about',
                'button_text' => 'Learn More',
                'is_active' => true,
                'position' => 2,
            ],
            [
                'title' => 'Boost Your Sales',
                'subtitle' => 'Comprehensive tools and strategies to increase your Amazon sales and improve your seller performance.',
                'image' => '',
                'link' => '/contact',
                'button_text' => 'Contact Us',
                'is_active' => true,
                'position' => 3,
            ],
            [
                'title' => 'Client Success Stories',
                'subtitle' => 'See how our clients have transformed their Amazon business with our proven management solutions.',
                'image' => '',
                'link' => '/testimonials',
                'button_text' => 'View Stories',
                'is_active' => false,
                'position' => 4,
            ],
        ];

        foreach ($banners as $banner) {
            Banner::create($banner);
        }
    }
}

