<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'name' => 'Web Development',
                'description' => 'Custom web applications and websites built with modern technologies and best practices.',
                'icon' => '🌐',
                'image' => '',
                'is_active' => true,
                'position' => 1,
            ],
            [
                'name' => 'Mobile App Development',
                'description' => 'Native and cross-platform mobile applications for iOS and Android platforms.',
                'icon' => '📱',
                'image' => '',
                'is_active' => true,
                'position' => 2,
            ],
            [
                'name' => 'UI/UX Design',
                'description' => 'User-centered design solutions that create engaging and intuitive user experiences.',
                'icon' => '🎨',
                'image' => '',
                'is_active' => true,
                'position' => 3,
            ],
            [
                'name' => 'Digital Marketing',
                'description' => 'Comprehensive digital marketing strategies to grow your online presence and reach.',
                'icon' => '📈',
                'image' => '',
                'is_active' => true,
                'position' => 4,
            ],
            [
                'name' => 'E-commerce Solutions',
                'description' => 'Complete e-commerce platforms and online store development services.',
                'icon' => '🛒',
                'image' => '',
                'is_active' => false,
                'position' => 5,
            ],
            [
                'name' => 'Cloud Services',
                'description' => 'Cloud infrastructure setup, migration, and management services.',
                'icon' => '☁️',
                'image' => '',
                'is_active' => true,
                'position' => 6,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
