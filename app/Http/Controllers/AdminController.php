<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Blog;
use App\Models\Enquiry;
use App\Models\Faq;
use App\Models\Portfolio;
use App\Models\Product;
use App\Models\Service;
use App\Models\Team;
use App\Models\Testimonial;
use App\Models\User;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        // Main Statistics
        $stats = [
            'totalVisitors' => Visitor::count(),
            'todayVisitors' => Visitor::whereDate('created_at', today())->count(),
            'users' => User::count(),
            'blogs' => Blog::count(),
            'publishedBlogs' => Blog::published()->count(),
            'draftBlogs' => Blog::draft()->count(),
            'services' => Service::count(),
            'activeServices' => Service::active()->count(),
            'enquiries' => Enquiry::count(),
            'portfolios' => Portfolio::count(),
            'products' => Product::count(),
            'team' => Team::count(),
            'testimonials' => Testimonial::count(),
            'banners' => Banner::count(),
            'faqs' => Faq::count(),
        ];

        // Recent Activities
        $recentEnquiries = Enquiry::latest()->take(5)->get();
        $recentBlogs = Blog::latest()->take(3)->get();
        $recentServices = Service::latest()->take(3)->get();
        $recentUsers = User::latest()->take(3)->get();

        // Visitor Analytics
        $visitorStats = [
            'thisWeek' => Visitor::where('created_at', '>=', now()->startOfWeek())->count(),
            'lastWeek' => Visitor::whereBetween('created_at', [
                now()->subWeek()->startOfWeek(),
                now()->subWeek()->endOfWeek()
            ])->count(),
            'thisMonth' => Visitor::whereMonth('created_at', now()->month)->count(),
            'lastMonth' => Visitor::whereMonth('created_at', now()->subMonth()->month)->count(),
        ];

        // Calculate growth percentages
        $growthStats = [
            'weeklyGrowth' => $visitorStats['lastWeek'] > 0
                ? round((($visitorStats['thisWeek'] - $visitorStats['lastWeek']) / $visitorStats['lastWeek']) * 100, 1)
                : 0,
            'monthlyGrowth' => $visitorStats['lastMonth'] > 0
                ? round((($visitorStats['thisMonth'] - $visitorStats['lastMonth']) / $visitorStats['lastMonth']) * 100, 1)
                : 0,
        ];

        // Top Performing Content
        $topPerformers = [
            'blogs' => Blog::published()->latest()->take(5)->get(),
            'services' => Service::active()->ordered()->take(5)->get(),
        ];

        // Visitor Country Data
        $visitorCountryData = Visitor::selectRaw('country, COUNT(*) as visitors')
            ->whereNotNull('country')
            ->where('country', '!=', '')
            ->groupBy('country')
            ->orderByDesc('visitors')
            ->take(10) // Increased to show more countries
            ->get()
            ->map(function ($item) use ($stats) {
                $percentage = $stats['totalVisitors'] > 0
                    ? round(($item->visitors / $stats['totalVisitors']) * 100, 1)
                    : 0;
                return [
                    'country' => $item->country,
                    'visitors' => $item->visitors,
                    'percentage' => $percentage,
                ];
            });

        // Additional visitor analytics
        $visitorAnalytics = [
            'uniqueCountries' => Visitor::whereNotNull('country')
                ->where('country', '!=', '')
                ->distinct('country')
                ->count(),
            'topCountry' => $visitorCountryData->first(),
            'avgVisitorsPerCountry' => $visitorCountryData->count() > 0
                ? round($visitorCountryData->sum('visitors') / $visitorCountryData->count(), 1)
                : 0,
        ];

        // Quick Stats for Today
        $todayStats = [
            'visitors' => Visitor::whereDate('created_at', today())->count(),
            'enquiries' => Enquiry::whereDate('created_at', today())->count(),
            'blogs' => Blog::whereDate('created_at', today())->count(),
            'users' => User::whereDate('created_at', today())->count(),
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'visitorStats' => $visitorStats,
            'growthStats' => $growthStats,
            'recentEnquiries' => $recentEnquiries,
            'recentBlogs' => $recentBlogs,
            'recentServices' => $recentServices,
            'recentUsers' => $recentUsers,
            'topPerformers' => $topPerformers,
            'todayStats' => $todayStats,
            'visitorCountryData' => $visitorCountryData,
            'visitorAnalytics' => $visitorAnalytics,
        ]);
    }

    public function users()
    {
        $users = User::latest()->paginate(15);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function analytics()
    {
        // Mock analytics data for now
        $analytics = [
            'pageViews' => 15420,
            'uniqueVisitors' => 8234,
            'bounceRate' => 42.3,
            'avgSessionDuration' => 245,
            'topPages' => [
                ['name' => 'Homepage', 'views' => 5420, 'change' => 12.5],
                ['name' => 'About Us', 'views' => 3240, 'change' => -2.1],
                ['name' => 'Services', 'views' => 2980, 'change' => 8.7],
                ['name' => 'Contact', 'views' => 1870, 'change' => 15.2],
                ['name' => 'Blog', 'views' => 1560, 'change' => 23.4],
            ],
            'trafficSources' => [
                ['source' => 'Organic Search', 'percentage' => 45.2, 'change' => 8.3],
                ['source' => 'Direct Traffic', 'percentage' => 28.7, 'change' => -1.2],
                ['source' => 'Social Media', 'percentage' => 18.4, 'change' => 12.7],
                ['source' => 'Referral', 'percentage' => 7.7, 'change' => 3.1],
            ],
            'monthlyStats' => [
                ['month' => 'Jan', 'visitors' => 7200, 'pageViews' => 12800],
                ['month' => 'Feb', 'visitors' => 8100, 'pageViews' => 14500],
                ['month' => 'Mar', 'visitors' => 8900, 'pageViews' => 16200],
                ['month' => 'Apr', 'visitors' => 9500, 'pageViews' => 17800],
                ['month' => 'May', 'visitors' => 10200, 'pageViews' => 19200],
                ['month' => 'Jun', 'visitors' => 11000, 'pageViews' => 20800],
            ]
        ];

        return Inertia::render('Admin/Analytics', [
            'analytics' => $analytics,
        ]);
    }

    public function toggleAdmin(User $user)
    {
        if ($user->isAdmin()) {
            $user->removeAdmin();
            $message = 'Admin privileges removed successfully.';
        } else {
            $user->makeAdmin();
            $message = 'User made admin successfully.';
        }

        return back()->with('success', $message);
    }
}
