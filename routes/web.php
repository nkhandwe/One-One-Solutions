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

Route::get('/', [HomeController::class, 'index'])->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // App Management
    Route::resource('clients', ClientController::class);
    Route::resource('teams', TeamController::class);

    // Content Management
    Route::resource('banners', BannerController::class);
    Route::resource('testimonials', TestimonialController::class);
    Route::resource('portfolios', PortfolioController::class);

    // Product & Services
    Route::resource('products', ProductController::class);
    Route::resource('services', ServiceController::class);

    // Blogging & Faqs
    Route::resource('faqs', FaqController::class);
    Route::resource('blogs', BlogController::class);

    // Web Settings
    Route::get('settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('settings', [SettingsController::class, 'store'])->name('settings.store');

    // Enquiries
    Route::resource('enquiries', EnquiryController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
