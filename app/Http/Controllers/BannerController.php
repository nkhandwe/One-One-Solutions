<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Banner::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('subtitle', 'like', "%{$search}%")
                    ->orWhere('button_text', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->filled('status') && $request->get('status') !== 'all') {
            $status = $request->get('status');
            if ($status === 'active') {
                $query->active();
            } elseif ($status === 'inactive') {
                $query->inactive();
            }
        }

        // Sort functionality
        $sortBy = $request->get('sort_by', 'position');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        // For now, return all banners without pagination for better compatibility
        $banners = $query->get();

        // Get statistics
        $stats = [
            'total' => Banner::count(),
            'active' => Banner::active()->count(),
            'inactive' => Banner::inactive()->count(),
            'this_month' => Banner::whereMonth('created_at', now()->month)->count(),
        ];

        return Inertia::render('Admin/Banners/Index', [
            'banners' => $banners,
            'stats' => $stats,
            'filters' => $request->only(['search', 'status', 'sort_by', 'sort_order']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Banners/Create', [
            'nextPosition' => Banner::getNextPosition(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'link' => 'nullable|url|max:500',
            'button_text' => 'nullable|string|max:100',
            'is_active' => 'boolean',
            'position' => 'nullable|integer|min:1',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('banners', 'public');
            $validated['image'] = $imagePath;
        }

        // Set position if not provided
        if (!isset($validated['position'])) {
            $validated['position'] = Banner::getNextPosition();
        }

        Banner::create($validated);

        return redirect()->route('banners.index')->with('success', 'Banner created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Banner $banner)
    {
        return Inertia::render('Admin/Banners/Show', [
            'banner' => $banner,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Banner $banner)
    {
        return Inertia::render('Admin/Banners/Edit', [
            'banner' => $banner,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Banner $banner)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'link' => 'nullable|url|max:500',
            'button_text' => 'nullable|string|max:100',
            'is_active' => 'boolean',
            'position' => 'nullable|integer|min:1',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($banner->image && Storage::disk('public')->exists($banner->image)) {
                Storage::disk('public')->delete($banner->image);
            }
            
            $imagePath = $request->file('image')->store('banners', 'public');
            $validated['image'] = $imagePath;
        }

        $banner->update($validated);

        return redirect()->route('banners.index')->with('success', 'Banner updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Banner $banner)
    {
        // Delete image if exists
        if ($banner->image && Storage::disk('public')->exists($banner->image)) {
            Storage::disk('public')->delete($banner->image);
        }

        $banner->delete();

        return redirect()->route('banners.index')->with('success', 'Banner deleted successfully!');
    }

    /**
     * Toggle banner active status
     */
    public function toggleActive(Banner $banner)
    {
        $banner->update([
            'is_active' => !$banner->is_active,
        ]);

        $status = $banner->is_active ? 'activated' : 'deactivated';
        return back()->with('success', "Banner {$status} successfully!");
    }

    /**
     * Update banner positions
     */
    public function updatePositions(Request $request)
    {
        $request->validate([
            'service_id' => 'required|integer|exists:banners,id',
            'direction' => 'required|in:up,down',
        ]);

        $banner = Banner::findOrFail($request->service_id);
        $currentPosition = $banner->position;

        if ($request->direction === 'up' && $currentPosition > 1) {
            $previousBanner = Banner::where('position', $currentPosition - 1)->first();
            if ($previousBanner) {
                $banner->update(['position' => $currentPosition - 1]);
                $previousBanner->update(['position' => $currentPosition]);
            }
        } elseif ($request->direction === 'down') {
            $nextBanner = Banner::where('position', $currentPosition + 1)->first();
            if ($nextBanner) {
                $banner->update(['position' => $currentPosition + 1]);
                $nextBanner->update(['position' => $currentPosition]);
            }
        }

        return back()->with('success', 'Banner position updated successfully!');
    }
}
