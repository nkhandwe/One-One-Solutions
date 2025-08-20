<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Blog::with('category');

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%")
                    ->orWhere('author', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->filled('status') && $request->get('status') !== 'all') {
            $status = $request->get('status');
            if ($status === 'published') {
                $query->published();
            } elseif ($status === 'draft') {
                $query->draft();
            }
        }

        // Sort functionality
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $blogs = $query->paginate(15)->withQueryString();

        // Get statistics
        $stats = [
            'total' => Blog::count(),
            'published' => Blog::published()->count(),
            'drafts' => Blog::draft()->count(),
            'this_month' => Blog::whereMonth('created_at', now()->month)->count(),
        ];

        return Inertia::render('Admin/Blogs/Index', [
            'blogs' => $blogs,
            'stats' => $stats,
            'filters' => $request->only(['search', 'status', 'sort_by', 'sort_order']),
            'categories' => BlogCategory::active()->ordered()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Blogs/Create', [
            'categories' => BlogCategory::active()->ordered()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string|max:500',
            'meta_description' => 'nullable|string|max:160',
            'meta_keywords' => 'nullable|array',
            'meta_keywords.*' => 'string|max:50',
            'content' => 'required|string',
            'featured_image' => 'nullable|string',
            'image' => 'nullable|string',
            'author' => 'nullable|string|max:255',
            'category_id' => 'nullable|exists:blog_categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'is_published' => 'boolean',
        ]);

        // Generate slug from title
        $validated['slug'] = Str::slug($validated['title']);

        // Set published_at if publishing
        if ($validated['is_published']) {
            $validated['published_at'] = now();
        }

        // Calculate reading time (rough estimate: 200 words per minute)
        $wordCount = str_word_count(strip_tags($validated['content']));
        $validated['reading_time'] = max(1, round($wordCount / 200));

        Blog::create($validated);

        return redirect()->route('blogs.index')->with('success', 'Blog post created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        // Increment view count
        $blog->increment('views_count');
        
        return Inertia::render('Admin/Blogs/Show', [
            'blog' => $blog->load('category'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        return Inertia::render('Admin/Blogs/Edit', [
            'blog' => $blog->load('category'),
            'categories' => BlogCategory::active()->ordered()->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string|max:500',
            'meta_description' => 'nullable|string|max:160',
            'meta_keywords' => 'nullable|array',
            'meta_keywords.*' => 'string|max:50',
            'content' => 'required|string',
            'featured_image' => 'nullable|string',
            'image' => 'nullable|string',
            'author' => 'nullable|string|max:255',
            'category_id' => 'nullable|exists:blog_categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'is_published' => 'boolean',
        ]);

        // Generate slug from title if changed
        if ($blog->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Set published_at if publishing for the first time
        if ($validated['is_published'] && !$blog->is_published) {
            $validated['published_at'] = now();
        }

        // Calculate reading time (rough estimate: 200 words per minute)
        $wordCount = str_word_count(strip_tags($validated['content']));
        $validated['reading_time'] = max(1, round($wordCount / 200));

        $blog->update($validated);

        return redirect()->route('blogs.index')->with('success', 'Blog post updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        $blog->delete();

        return redirect()->route('blogs.index')->with('success', 'Blog post deleted successfully!');
    }

    /**
     * Toggle publish status
     */
    public function togglePublish(Blog $blog)
    {
        $blog->update([
            'is_published' => !$blog->is_published,
            'published_at' => !$blog->is_published ? now() : null,
        ]);

        $status = $blog->is_published ? 'published' : 'unpublished';
        return back()->with('success', "Blog post {$status} successfully!");
    }
}
