<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Service::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
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

        // For now, return all services without pagination for better compatibility
        $services = $query->get();

        // Get statistics
        $stats = [
            'total' => Service::count(),
            'active' => Service::active()->count(),
            'inactive' => Service::inactive()->count(),
            'this_month' => Service::whereMonth('created_at', now()->month)->count(),
        ];

        return Inertia::render('Admin/Services/Index', [
            'services' => $services,
            'stats' => $stats,
            'filters' => $request->only(['search', 'status', 'sort_by', 'sort_order']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Services/Create', [
            'nextPosition' => Service::getNextPosition(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:255',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
            'position' => 'nullable|integer|min:1',
        ]);

        // Generate slug from name
        $validated['slug'] = Str::slug($validated['name']);

        // Set position if not provided
        if (!isset($validated['position'])) {
            $validated['position'] = Service::getNextPosition();
        }

        Service::create($validated);

        return redirect()->route('services.index')->with('success', 'Service created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        return Inertia::render('Admin/Services/Show', [
            'service' => $service,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        return Inertia::render('Admin/Services/Edit', [
            'service' => $service,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:255',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
            'position' => 'nullable|integer|min:1',
        ]);

        // Generate slug from name if changed
        if ($service->name !== $validated['name']) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $service->update($validated);

        return redirect()->route('services.index')->with('success', 'Service updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->route('services.index')->with('success', 'Service deleted successfully!');
    }

    /**
     * Toggle service active status
     */
    public function toggleActive(Service $service)
    {
        $service->update([
            'is_active' => !$service->is_active,
        ]);

        $status = $service->is_active ? 'activated' : 'deactivated';
        return back()->with('success', "Service {$status} successfully!");
    }

    /**
     * Update service positions
     */
    public function updatePositions(Request $request)
    {
        $positions = $request->validate([
            'positions' => 'required|array',
            'positions.*.id' => 'required|exists:services,id',
            'positions.*.position' => 'required|integer|min:1',
        ]);

        foreach ($positions['positions'] as $item) {
            Service::where('id', $item['id'])->update(['position' => $item['position']]);
        }

        return back()->with('success', 'Service positions updated successfully!');
    }
}
