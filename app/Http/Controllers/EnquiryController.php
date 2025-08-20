<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnquiryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Enquiry::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%");
            });
        }

        // Filter by contact type
        if ($request->filled('contact_type') && $request->get('contact_type') !== 'all') {
            $contactType = $request->get('contact_type');
            if ($contactType === 'with_email') {
                $query->withEmail();
            } elseif ($contactType === 'with_phone') {
                $query->withPhone();
            }
        }

        // Filter by date range
        if ($request->filled('date_range') && $request->get('date_range') !== 'all') {
            $dateRange = $request->get('date_range');
            if ($dateRange === 'today') {
                $query->whereDate('created_at', today());
            } elseif ($dateRange === 'this_week') {
                $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
            } elseif ($dateRange === 'this_month') {
                $query->whereMonth('created_at', now()->month);
            } elseif ($dateRange === 'recent') {
                $query->recent(7);
            }
        }

        // Sort functionality
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // For now, return all enquiries without pagination for better compatibility
        $enquiries = $query->get();

        // Get statistics
        $stats = [
            'total' => Enquiry::count(),
            'today' => Enquiry::whereDate('created_at', today())->count(),
            'this_week' => Enquiry::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
            'this_month' => Enquiry::whereMonth('created_at', now()->month)->count(),
            'with_email' => Enquiry::withEmail()->count(),
            'with_phone' => Enquiry::withPhone()->count(),
        ];

        return Inertia::render('Admin/Enquiries/Index', [
            'enquiries' => $enquiries,
            'stats' => $stats,
            'filters' => $request->only(['search', 'contact_type', 'date_range', 'sort_by', 'sort_order']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Enquiries/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
            'ip_address' => 'nullable|ip',
            'user_agent' => 'nullable|string|max:500',
            'page_url' => 'nullable|url|max:500',
        ]);

        // Auto-fill IP address and user agent if not provided
        if (!isset($validated['ip_address'])) {
            $validated['ip_address'] = $request->ip();
        }
        if (!isset($validated['user_agent'])) {
            $validated['user_agent'] = $request->userAgent();
        }
        if (!isset($validated['page_url'])) {
            $validated['page_url'] = $request->header('referer') ?: url()->current();
        }

        Enquiry::create($validated);

        return redirect()->route('enquiries.index')->with('success', 'Enquiry created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Enquiry $enquiry)
    {
        return Inertia::render('Admin/Enquiries/Show', [
            'enquiry' => $enquiry,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Enquiry $enquiry)
    {
        return Inertia::render('Admin/Enquiries/Edit', [
            'enquiry' => $enquiry,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Enquiry $enquiry)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
            'ip_address' => 'nullable|ip',
            'user_agent' => 'nullable|string|max:500',
            'page_url' => 'nullable|url|max:500',
        ]);

        $enquiry->update($validated);

        return redirect()->route('enquiries.index')->with('success', 'Enquiry updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enquiry $enquiry)
    {
        $enquiry->delete();

        return redirect()->route('enquiries.index')->with('success', 'Enquiry deleted successfully!');
    }

    /**
     * Export enquiries to CSV
     */
    public function export(Request $request)
    {
        $query = Enquiry::query();

        // Apply filters if any
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%");
            });
        }

        $enquiries = $query->orderBy('created_at', 'desc')->get();

        $filename = 'enquiries_' . now()->format('Y-m-d_H-i-s') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function () use ($enquiries) {
            $file = fopen('php://output', 'w');

            // CSV headers
            fputcsv($file, [
                'ID',
                'Name',
                'Email',
                'Phone',
                'Subject',
                'Message',
                'IP Address',
                'Page URL',
                'Created At'
            ]);

            // CSV data
            foreach ($enquiries as $enquiry) {
                fputcsv($file, [
                    $enquiry->id,
                    $enquiry->name,
                    $enquiry->email,
                    $enquiry->phone,
                    $enquiry->subject,
                    $enquiry->message,
                    $enquiry->ip_address,
                    $enquiry->page_url,
                    $enquiry->created_at->format('Y-m-d H:i:s'),
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Mark enquiry as read/unread
     */
    public function toggleRead(Enquiry $enquiry)
    {
        // You can add a 'is_read' field to the enquiries table if needed
        // For now, we'll just redirect back
        return back()->with('success', 'Enquiry status updated!');
    }

    /**
     * Get enquiry analytics
     */
    public function analytics()
    {
        $stats = [
            'total' => Enquiry::count(),
            'today' => Enquiry::whereDate('created_at', today())->count(),
            'this_week' => Enquiry::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
            'this_month' => Enquiry::whereMonth('created_at', now()->month)->count(),
            'with_email' => Enquiry::withEmail()->count(),
            'with_phone' => Enquiry::withPhone()->count(),
        ];

        // Top pages where enquiries come from
        $topPages = Enquiry::selectRaw('page_url, COUNT(*) as count')
            ->whereNotNull('page_url')
            ->groupBy('page_url')
            ->orderBy('count', 'desc')
            ->limit(10)
            ->get();

        // Enquiries by hour of day
        $enquiriesByHour = Enquiry::selectRaw('HOUR(created_at) as hour, COUNT(*) as count')
            ->groupBy('hour')
            ->orderBy('hour')
            ->get();

        return response()->json([
            'stats' => $stats,
            'top_pages' => $topPages,
            'enquiries_by_hour' => $enquiriesByHour,
        ]);
    }
}
