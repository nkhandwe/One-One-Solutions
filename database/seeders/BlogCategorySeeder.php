<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Technology',
                'slug' => 'technology',
                'description' => 'Latest trends in technology and software development',
                'color' => '#3B82F6',
                'icon' => 'monitor',
                'sort_order' => 1,
            ],
            [
                'name' => 'Business',
                'slug' => 'business',
                'description' => 'Business strategies, entrepreneurship, and market insights',
                'color' => '#059669',
                'icon' => 'briefcase',
                'sort_order' => 2,
            ],
            [
                'name' => 'Digital Marketing',
                'slug' => 'digital-marketing',
                'description' => 'SEO, social media, and online marketing strategies',
                'color' => '#DC2626',
                'icon' => 'trending-up',
                'sort_order' => 3,
            ],
            [
                'name' => 'Design',
                'slug' => 'design',
                'description' => 'UI/UX design, graphic design, and creative inspiration',
                'color' => '#7C3AED',
                'icon' => 'palette',
                'sort_order' => 4,
            ],
            [
                'name' => 'E-commerce',
                'slug' => 'ecommerce',
                'description' => 'Online selling, marketplace strategies, and retail insights',
                'color' => '#F59E0B',
                'icon' => 'shopping-cart',
                'sort_order' => 5,
            ],
            [
                'name' => 'Tutorials',
                'slug' => 'tutorials',
                'description' => 'Step-by-step guides and how-to articles',
                'color' => '#10B981',
                'icon' => 'book-open',
                'sort_order' => 6,
            ],
        ];

        foreach ($categories as $category) {
            BlogCategory::create($category);
        }
    }
}
