import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/contexts/ThemeContext';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, CheckCircle, Clock, Edit, Eye, EyeOff, FileText, Filter, Plus, Search, Trash2, TrendingUp, User } from 'lucide-react';
import { useState } from 'react';

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    author: string;
    category?: {
        id: number;
        name: string;
        color: string;
    };
    featured_image: string | null;
    is_published: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    tags: string[];
    views_count: number;
    reading_time: number | null;
}

interface Props {
    blogs: {
        data: Blog[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    stats: {
        total: number;
        published: number;
        drafts: number;
        this_month: number;
    };
    filters: {
        search?: string;
        status?: string;
        sort_by?: string;
        sort_order?: string;
    };
}

export default function BlogIndex({ blogs, stats, filters }: Props) {
    const { colors } = useTheme();
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [sortBy, setSortBy] = useState(filters.sort_by || 'created_at');
    const [sortOrder, setSortOrder] = useState(filters.sort_order || 'desc');

    const handleSearch = () => {
        router.get(
            '/blogs',
            {
                search,
                status,
                sort_by: sortBy,
                sort_order: sortOrder,
            },
            { preserveState: true },
        );
    };

    const handleFilter = () => {
        router.get(
            '/blogs',
            {
                search,
                status,
                sort_by: sortBy,
                sort_order: sortOrder,
            },
            { preserveState: true },
        );
    };

    const togglePublish = (blogId: number) => {
        router.patch(`/blogs/${blogId}/toggle-publish`);
    };

    const deleteBlog = (blogId: number) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            router.delete(`/blogs/${blogId}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Blogs" />

            <div className="p-6">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="group flex items-center justify-center rounded-full border p-3 transition-all duration-300 hover:scale-105"
                            style={{
                                background: `${colors.background.card}60`,
                                borderColor: colors.background.border,
                            }}
                        >
                            <ArrowLeft className="h-5 w-5 transition-colors" style={{ color: colors.text.secondary }} />
                        </Link>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold" style={{ color: colors.text.primary }}>
                                Blog Management
                            </h1>
                            <p style={{ color: colors.text.tertiary }}>Create, edit, and manage your blog posts with categories and media</p>
                        </div>
                        <Link href="/blogs/create">
                            <Button
                                className="shadow-lg transition-all duration-300 hover:scale-105"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                    boxShadow: `0 10px 25px -5px ${colors.primary.main}25`,
                                }}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Create Blog Post
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                        {[
                            {
                                label: 'Total Posts',
                                value: stats.total,
                                icon: FileText,
                                color: colors.primary.main,
                                bgGradient: `linear-gradient(135deg, ${colors.primary.main}05 0%, ${colors.primary.main}15 100%)`,
                                description: 'All blog posts',
                            },
                            {
                                label: 'Published',
                                value: stats.published,
                                icon: CheckCircle,
                                color: colors.success.main,
                                bgGradient: `linear-gradient(135deg, ${colors.success.main}05 0%, ${colors.success.main}15 100%)`,
                                description: 'Live on website',
                            },
                            {
                                label: 'Drafts',
                                value: stats.drafts,
                                icon: Clock,
                                color: colors.warning.main,
                                bgGradient: `linear-gradient(135deg, ${colors.warning.main}05 0%, ${colors.warning.main}15 100%)`,
                                description: 'Work in progress',
                            },
                            {
                                label: 'This Month',
                                value: stats.this_month,
                                icon: TrendingUp,
                                color: colors.accent.main,
                                bgGradient: `linear-gradient(135deg, ${colors.accent.main}05 0%, ${colors.accent.main}15 100%)`,
                                description: 'Recent activity',
                            },
                        ].map((stat, index) => (
                            <Card
                                key={index}
                                className="group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                style={{
                                    background: stat.bgGradient,
                                    borderColor: `${stat.color}30`,
                                    boxShadow: `0 10px 25px -5px ${stat.color}20`,
                                }}
                            >
                                <div className="absolute top-0 right-0 h-32 w-32 opacity-10">
                                    <div
                                        className="h-full w-full rounded-full"
                                        style={{ background: `linear-gradient(135deg, ${stat.color} 0%, ${colors.primary.main} 100%)` }}
                                    ></div>
                                </div>
                                <CardContent className="relative p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="mb-2 text-sm font-medium" style={{ color: colors.text.secondary }}>
                                                {stat.label}
                                            </p>
                                            <p className="mb-1 text-4xl font-bold" style={{ color: stat.color }}>
                                                {stat.value}
                                            </p>
                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                {stat.description}
                                            </p>
                                        </div>
                                        <div
                                            className="rounded-2xl p-4 shadow-lg"
                                            style={{
                                                background: `linear-gradient(135deg, ${stat.color} 0%, ${colors.primary.main} 100%)`,
                                                boxShadow: `0 8px 25px -5px ${stat.color}40`,
                                            }}
                                        >
                                            <stat.icon className="h-8 w-8 text-white" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Filters and Search */}
                    <Card
                        style={{
                            background: `${colors.background.card}90`,
                            borderColor: colors.background.border,
                            boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                        }}
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                <Filter className="h-5 w-5" style={{ color: colors.primary.main }} />
                                Filters & Search
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" style={{ color: colors.text.muted }} />
                                    <Input
                                        placeholder="Search blogs..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                        style={{
                                            borderColor: colors.background.border,
                                            background: colors.background.input,
                                            color: colors.text.primary,
                                            '--tw-ring-color': colors.primary.main,
                                        }}
                                    />
                                </div>

                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger 
                                        className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                        style={{
                                            borderColor: colors.background.border,
                                            background: colors.background.input,
                                            color: colors.text.primary,
                                            '--tw-ring-color': colors.primary.main,
                                        }}
                                    >
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger 
                                        className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                        style={{
                                            borderColor: colors.background.border,
                                            background: colors.background.input,
                                            color: colors.text.primary,
                                            '--tw-ring-color': colors.primary.main,
                                        }}
                                    >
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="created_at">Created Date</SelectItem>
                                        <SelectItem value="title">Title</SelectItem>
                                        <SelectItem value="author">Author</SelectItem>
                                        <SelectItem value="published_at">Published Date</SelectItem>
                                        <SelectItem value="views_count">Views</SelectItem>
                                        <SelectItem value="reading_time">Reading Time</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={sortOrder} onValueChange={setSortOrder}>
                                    <SelectTrigger 
                                        className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                        style={{
                                            borderColor: colors.background.border,
                                            background: colors.background.input,
                                            color: colors.text.primary,
                                            '--tw-ring-color': colors.primary.main,
                                        }}
                                    >
                                        <SelectValue placeholder="Sort Order" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="desc">Descending</SelectItem>
                                        <SelectItem value="asc">Ascending</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleFilter}
                                        className="shadow-lg transition-all duration-300 hover:scale-105"
                                        style={{
                                            background: `linear-gradient(135deg, ${colors.secondary.main} 0%, ${colors.accent.main} 100%)`,
                                            boxShadow: `0 10px 25px -5px ${colors.secondary.main}25`,
                                        }}
                                    >
                                        <Filter className="mr-2 h-4 w-4" />
                                        Apply Filters
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSearch('');
                                            setStatus('all');
                                            setSortBy('created_at');
                                            setSortOrder('desc');
                                            router.get('/blogs');
                                        }}
                                        className="transition-all duration-300 hover:scale-105"
                                        style={{
                                            borderColor: colors.background.border,
                                            color: colors.text.secondary,
                                            background: colors.background.tertiary,
                                        }}
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Blogs Table */}
                    <Card
                        style={{
                            background: `${colors.background.card}90`,
                            borderColor: colors.background.border,
                            boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                        }}
                    >
                        <CardHeader>
                            <CardTitle style={{ color: colors.text.primary }}>Blog Posts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr style={{ borderColor: colors.background.divider }}>
                                            <th className="p-4 text-left font-medium" style={{ color: colors.text.secondary }}>
                                                Blog Post
                                            </th>
                                            <th className="p-4 text-left font-medium" style={{ color: colors.text.secondary }}>
                                                Category
                                            </th>
                                            <th className="p-4 text-left font-medium" style={{ color: colors.text.secondary }}>
                                                Author
                                            </th>
                                            <th className="p-4 text-left font-medium" style={{ color: colors.text.secondary }}>
                                                Status
                                            </th>
                                            <th className="p-4 text-left font-medium" style={{ color: colors.text.secondary }}>
                                                Analytics
                                            </th>
                                            <th className="p-4 text-left font-medium" style={{ color: colors.text.secondary }}>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blogs.data.map((blog, index) => (
                                            <tr 
                                                key={blog.id} 
                                                className="transition-all duration-300 hover:scale-[1.01]"
                                                style={{ 
                                                    borderColor: colors.background.divider,
                                                    animationDelay: `${index * 100}ms`,
                                                }}
                                            >
                                                <td className="p-4">
                                                    <div className="flex items-start gap-3">
                                                        {blog.featured_image && (
                                                            <div className="flex-shrink-0">
                                                                <img
                                                                    src={blog.featured_image}
                                                                    alt={blog.title}
                                                                    className="h-16 w-24 rounded-lg object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="flex-1 space-y-2">
                                                            <p className="font-semibold" style={{ color: colors.text.primary }}>
                                                                {blog.title}
                                                            </p>
                                                            {blog.excerpt && (
                                                                <p className="line-clamp-2 text-sm" style={{ color: colors.text.secondary }}>
                                                                    {blog.excerpt}
                                                                </p>
                                                            )}
                                                            <div className="flex items-center gap-2 text-xs" style={{ color: colors.text.muted }}>
                                                                <span>/{blog.slug}</span>
                                                                {blog.reading_time && (
                                                                    <>
                                                                        <span>•</span>
                                                                        <span>{blog.reading_time} min read</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    {blog.category ? (
                                                        <div className="flex items-center gap-2">
                                                            <div
                                                                className="h-3 w-3 rounded-full"
                                                                style={{ backgroundColor: blog.category.color }}
                                                            ></div>
                                                            <span className="text-sm font-medium" style={{ color: colors.text.primary }}>
                                                                {blog.category.name}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm" style={{ color: colors.text.muted }}>
                                                            Uncategorized
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white"
                                                            style={{
                                                                background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                                            }}
                                                        >
                                                            {(blog.author || 'A').charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="text-sm" style={{ color: colors.text.primary }}>
                                                            {blog.author || 'Anonymous'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="space-y-2">
                                                        <Badge
                                                            variant="outline"
                                                            className="transition-all duration-300"
                                                            style={{
                                                                borderColor: blog.is_published ? colors.success.main : colors.warning.main,
                                                                color: blog.is_published ? colors.success.main : colors.warning.main,
                                                                background: blog.is_published 
                                                                    ? `${colors.success.main}15` 
                                                                    : `${colors.warning.main}15`,
                                                            }}
                                                        >
                                                            {blog.is_published ? 'Published' : 'Draft'}
                                                        </Badge>
                                                        {blog.is_published && blog.published_at && (
                                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                                {new Date(blog.published_at).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <Eye className="h-3 w-3" style={{ color: colors.text.muted }} />
                                                            <span className="text-sm" style={{ color: colors.text.primary }}>
                                                                {blog.views_count.toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-3 w-3" style={{ color: colors.text.muted }} />
                                                            <span className="text-xs" style={{ color: colors.text.tertiary }}>
                                                                {new Date(blog.created_at).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link href={`/blogs/${blog.id}`}>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="transition-all duration-300 hover:scale-105"
                                                                style={{
                                                                    borderColor: colors.primary.main,
                                                                    color: colors.primary.main,
                                                                    background: 'transparent',
                                                                }}
                                                                title="View Blog"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={`/blogs/${blog.id}/edit`}>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="transition-all duration-300 hover:scale-105"
                                                                style={{
                                                                    borderColor: colors.secondary.main,
                                                                    color: colors.secondary.main,
                                                                    background: 'transparent',
                                                                }}
                                                                title="Edit Blog"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => togglePublish(blog.id)}
                                                            className="transition-all duration-300 hover:scale-105"
                                                            style={{
                                                                borderColor: blog.is_published ? colors.warning.main : colors.success.main,
                                                                color: blog.is_published ? colors.warning.main : colors.success.main,
                                                                background: 'transparent',
                                                            }}
                                                            title={blog.is_published ? 'Unpublish' : 'Publish'}
                                                        >
                                                            {blog.is_published ? (
                                                                <EyeOff className="h-4 w-4" />
                                                            ) : (
                                                                <CheckCircle className="h-4 w-4" />
                                                            )}
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => deleteBlog(blog.id)}
                                                            className="transition-all duration-300 hover:scale-105"
                                                            style={{
                                                                borderColor: colors.error.main,
                                                                color: colors.error.main,
                                                                background: 'transparent',
                                                            }}
                                                            title="Delete Blog"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {blogs.last_page > 1 && (
                                <div 
                                    className="mt-6 flex items-center justify-between pt-6"
                                    style={{ borderColor: colors.background.divider }}
                                >
                                    <p className="text-sm" style={{ color: colors.text.tertiary }}>
                                        Showing {(blogs.current_page - 1) * blogs.per_page + 1} to{' '}
                                        {Math.min(blogs.current_page * blogs.per_page, blogs.total)} of {blogs.total} results
                                    </p>
                                    <div className="flex items-center gap-2">
                                        {Array.from({ length: blogs.last_page }, (_, i) => i + 1).map((page) => (
                                            <Button
                                                key={page}
                                                variant={page === blogs.current_page ? 'default' : 'outline'}
                                                size="sm"
                                                className="transition-all duration-300 hover:scale-105"
                                                style={
                                                    page === blogs.current_page
                                                        ? {
                                                            background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                                            borderColor: colors.primary.main,
                                                            color: colors.text.inverse,
                                                            boxShadow: `0 5px 15px -3px ${colors.primary.main}25`,
                                                        }
                                                        : {
                                                            borderColor: colors.background.border,
                                                            color: colors.text.secondary,
                                                            background: colors.background.tertiary,
                                                        }
                                                }
                                            >
                                                {page}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
