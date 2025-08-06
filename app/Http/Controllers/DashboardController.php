<?php

namespace App\Http\Controllers;

use App\Models\Settings;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $setting = Settings::first();

        return Inertia::render('dashboard', [
            'setting' => $setting,
        ]);
    }
}
