<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;

Route::get('/', [HomeController::class, 'index'])->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [AdminController::class, 'index'])->name('dashboard');

    // Admin Routes
    Route::get('admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('admin/users', [AdminController::class, 'users'])->name('admin.users');
    Route::patch('admin/users/{user}/toggle-admin', [AdminController::class, 'toggleAdmin'])->name('admin.users.toggle');
    Route::get('admin/analytics', [AdminController::class, 'analytics'])->name('admin.analytics');

    // App Management
    Route::resource('clients', ClientController::class);
    Route::resource('teams', TeamController::class);

    // Content Management
    Route::resource('banners', BannerController::class);
    Route::patch('banners/{banner}/toggle-active', [BannerController::class, 'toggleActive'])->name('banners.toggle-active');
    Route::patch('banners/update-positions', [BannerController::class, 'updatePositions'])->name('banners.update-positions');
    Route::resource('testimonials', TestimonialController::class);
    Route::resource('portfolios', PortfolioController::class);

    // Product & Services
    Route::resource('products', ProductController::class);
    Route::resource('services', ServiceController::class);

    // Blogging & Faqs
    Route::resource('faqs', FaqController::class);
    Route::resource('blogs', BlogController::class);
    Route::patch('blogs/{blog}/toggle-publish', [BlogController::class, 'togglePublish'])->name('blogs.toggle-publish');

    // Service Management
    Route::patch('services/{service}/toggle-active', [ServiceController::class, 'toggleActive'])->name('services.toggle-active');
    Route::patch('services/update-positions', [ServiceController::class, 'updatePositions'])->name('services.update-positions');

    // Web Settings
    Route::get('settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('settings', [SettingsController::class, 'store'])->name('settings.store');

    // Enquiries
    Route::resource('enquiries', EnquiryController::class);
    Route::get('enquiries/export', [EnquiryController::class, 'export'])->name('enquiries.export');
    Route::patch('enquiries/{enquiry}/toggle-read', [EnquiryController::class, 'toggleRead'])->name('enquiries.toggle-read');
    Route::get('enquiries/analytics', [EnquiryController::class, 'analytics'])->name('enquiries.analytics');

    // User Management
    Route::resource('users', UserController::class);
    Route::get('users/{user}/change-password', [UserController::class, 'showChangePasswordForm'])->name('users.change-password');
    Route::patch('users/{user}/change-password', [UserController::class, 'changePassword'])->name('users.update-password');

    // Profile
    Route::get('profile', [UserController::class, 'showProfile'])->name('profile');
    Route::patch('profile', [UserController::class, 'updateProfile'])->name('profile.update');
    Route::patch('profile/password', [UserController::class, 'updateProfilePassword'])->name('profile.password');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
