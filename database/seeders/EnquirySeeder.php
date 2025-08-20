<?php

namespace Database\Seeders;

use App\Models\Enquiry;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EnquirySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $enquiries = [
            [
                'name' => 'John Smith',
                'email' => 'john.smith@example.com',
                'phone' => '+1-555-0123',
                'subject' => 'General Inquiry about Services',
                'message' => 'Hi, I would like to know more about your Amazon account management services. What packages do you offer and what are the pricing details?',
                'ip_address' => '192.168.1.100',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'page_url' => 'https://example.com/services',
                'created_at' => now()->subDays(2),
            ],
            [
                'name' => 'Sarah Johnson',
                'email' => 'sarah.j@business.com',
                'phone' => '+1-555-0456',
                'subject' => 'Partnership Opportunity',
                'message' => 'We are a growing e-commerce business and interested in exploring partnership opportunities. Can we schedule a call to discuss this further?',
                'ip_address' => '192.168.1.101',
                'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                'page_url' => 'https://example.com/contact',
                'created_at' => now()->subDays(1),
            ],
            [
                'name' => 'Mike Chen',
                'email' => 'mike.chen@startup.io',
                'phone' => '',
                'subject' => 'Technical Support Needed',
                'message' => 'I am experiencing issues with my Amazon seller account. The dashboard is not loading properly and I need assistance. Please help!',
                'ip_address' => '192.168.1.102',
                'user_agent' => 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
                'page_url' => 'https://example.com/support',
                'created_at' => now()->subHours(6),
            ],
            [
                'name' => 'Emily Davis',
                'email' => '',
                'phone' => '+1-555-0789',
                'subject' => 'Pricing Information Request',
                'message' => 'I would like to get detailed pricing information for your premium package. Also, do you offer any discounts for annual contracts?',
                'ip_address' => '192.168.1.103',
                'user_agent' => 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
                'page_url' => 'https://example.com/pricing',
                'created_at' => now()->subHours(3),
            ],
            [
                'name' => 'David Wilson',
                'email' => 'david.wilson@enterprise.com',
                'phone' => '+1-555-0321',
                'subject' => 'Enterprise Solution Inquiry',
                'message' => 'We are a large enterprise with multiple Amazon seller accounts. Looking for a comprehensive solution that can handle our scale. Please provide details.',
                'ip_address' => '192.168.1.104',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'page_url' => 'https://example.com/enterprise',
                'created_at' => now()->subHours(1),
            ],
            [
                'name' => 'Lisa Brown',
                'email' => 'lisa.brown@consulting.com',
                'phone' => '+1-555-0654',
                'subject' => 'Consultation Request',
                'message' => 'I am a business consultant and would like to discuss how your services can benefit my clients. Can we arrange a consultation call?',
                'ip_address' => '192.168.1.105',
                'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                'page_url' => 'https://example.com/consultation',
                'created_at' => now()->subMinutes(30),
            ],
        ];

        foreach ($enquiries as $enquiry) {
            Enquiry::create($enquiry);
        }
    }
}

