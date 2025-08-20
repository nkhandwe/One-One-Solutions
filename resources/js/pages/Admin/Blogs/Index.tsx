import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, CheckCircle, Clock, Edit, Eye, EyeOff, FileText, Filter, Plus, Search, Trash2, TrendingUp, User } from 'lucide-react';
import { useState } from 'react';

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    author: string;
    is_published: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    tags: string[];
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
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-neutral-900">Blog Management</h1>
                            <p className="text-neutral-600">Create, edit, and manage your blog posts</p>
                        </div>
                        <Link href="/blogs/create">
                            <Button className="from-primary-600 to-primary-light hover:from-primary-dark hover:to-primary-600 border-0 bg-gradient-to-r">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Blog Post
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                        <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-neutral-600">Total Posts</p>
                                        <p className="text-3xl font-bold text-neutral-900">{stats.total}</p>
                                    </div>
                                    <div className="rounded-lg bg-blue-50 p-3">
                                        <FileText className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-neutral-600">Published</p>
                                        <p className="text-3xl font-bold text-neutral-900">{stats.published}</p>
                                    </div>
                                    <div className="rounded-lg bg-green-50 p-3">
                                        <CheckCircle className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-neutral-600">Drafts</p>
                                        <p className="text-3xl font-bold text-neutral-900">{stats.drafts}</p>
                                    </div>
                                    <div className="rounded-lg bg-orange-50 p-3">
                                        <Clock className="h-6 w-6 text-orange-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-neutral-600">This Month</p>
                                        <p className="text-3xl font-bold text-neutral-900">{stats.this_month}</p>
                                    </div>
                                    <div className="rounded-lg bg-purple-50 p-3">
                                        <TrendingUp className="h-6 w-6 text-purple-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters and Search */}
                    <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-neutral-900">
                                <Filter className="text-primary-600 h-5 w-5" />
                                Filters & Search
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-neutral-500" />
                                    <Input
                                        placeholder="Search blogs..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        className="focus:border-primary-600 border-neutral-200 bg-white/70 pl-10 backdrop-blur-sm"
                                    />
                                </div>

                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger className="border-neutral-200 bg-white/70 backdrop-blur-sm">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="border-neutral-200 bg-white/70 backdrop-blur-sm">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="created_at">Created Date</SelectItem>
                                        <SelectItem value="title">Title</SelectItem>
                                        <SelectItem value="author">Author</SelectItem>
                                        <SelectItem value="published_at">Published Date</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleFilter}
                                        className="from-secondary-600 to-secondary-light hover:from-secondary-dark hover:to-secondary-600 border-0 bg-gradient-to-r"
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
                                        className="hover:border-primary-600 hover:text-primary-600 border-neutral-200 text-neutral-600"
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Blogs Table */}
                    <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-neutral-900">Blog Posts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-neutral-200">
                                            <th className="p-4 text-left font-medium text-neutral-600">Blog Post</th>
                                            <th className="p-4 text-left font-medium text-neutral-600">Author</th>
                                            <th className="p-4 text-left font-medium text-neutral-600">Status</th>
                                            <th className="p-4 text-left font-medium text-neutral-600">Tags</th>
                                            <th className="p-4 text-left font-medium text-neutral-600">Created</th>
                                            <th className="p-4 text-left font-medium text-neutral-600">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blogs.data.map((blog) => (
                                            <tr key={blog.id} className="hover:bg-background-100 border-b border-neutral-100 transition-colors">
                                                <td className="p-4">
                                                    <div className="space-y-1">
                                                        <p className="font-medium text-neutral-900">{blog.title}</p>
                                                        <p className="line-clamp-2 text-sm text-neutral-500">{blog.excerpt}</p>
                                                        <p className="text-xs text-neutral-400">/{blog.slug}</p>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4 text-neutral-500" />
                                                        <span className="text-neutral-600">{blog.author || 'Anonymous'}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <Badge
                                                        variant={blog.is_published ? 'default' : 'secondary'}
                                                        className={blog.is_published ? 'bg-success-main text-white' : 'bg-warning-main text-white'}
                                                    >
                                                        {blog.is_published ? 'Published' : 'Draft'}
                                                    </Badge>
                                                    {blog.is_published && blog.published_at && (
                                                        <p className="mt-1 text-xs text-neutral-500">
                                                            {new Date(blog.published_at).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {blog.tags && blog.tags.length > 0 ? (
                                                            blog.tags.slice(0, 3).map((tag, index) => (
                                                                <Badge
                                                                    key={index}
                                                                    variant="outline"
                                                                    className="border-neutral-200 text-xs text-neutral-600"
                                                                >
                                                                    {tag}
                                                                </Badge>
                                                            ))
                                                        ) : (
                                                            <span className="text-xs text-neutral-400">No tags</span>
                                                        )}
                                                        {blog.tags && blog.tags.length > 3 && (
                                                            <Badge variant="outline" className="border-neutral-200 text-xs text-neutral-600">
                                                                +{blog.tags.length - 3}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-neutral-500" />
                                                        <span className="text-neutral-600">{new Date(blog.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link href={`/blogs/${blog.id}`}>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="hover:border-primary-600 hover:text-primary-600 border-neutral-200 text-neutral-600"
                                                            >
                                                                <Eye className="mr-1 h-3 w-3" />
                                                                View
                                                            </Button>
                                                        </Link>
                                                        <Link href={`/blogs/${blog.id}/edit`}>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="hover:border-secondary-600 hover:text-secondary-600 border-neutral-200 text-neutral-600"
                                                            >
                                                                <Edit className="mr-1 h-3 w-3" />
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => togglePublish(blog.id)}
                                                            className={`border-2 transition-all duration-300 ${
                                                                blog.is_published
                                                                    ? 'border-orange-300 text-orange-600 hover:bg-orange-50'
                                                                    : 'border-green-300 text-green-600 hover:bg-green-50'
                                                            }`}
                                                        >
                                                            {blog.is_published ? (
                                                                <>
                                                                    <EyeOff className="mr-1 h-3 w-3" />
                                                                    Unpublish
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <CheckCircle className="mr-1 h-3 w-3" />
                                                                    Publish
                                                                </>
                                                            )}
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => deleteBlog(blog.id)}
                                                            className="border-red-300 text-red-600 hover:border-red-400 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="mr-1 h-3 w-3" />
                                                            Delete
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
                                <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-6">
                                    <p className="text-sm text-neutral-500">
                                        Showing {(blogs.current_page - 1) * blogs.per_page + 1} to{' '}
                                        {Math.min(blogs.current_page * blogs.per_page, blogs.total)} of {blogs.total} results
                                    </p>
                                    <div className="flex items-center gap-2">
                                        {Array.from({ length: blogs.last_page }, (_, i) => i + 1).map((page) => (
                                            <Button
                                                key={page}
                                                variant={page === blogs.current_page ? 'default' : 'outline'}
                                                size="sm"
                                                className={
                                                    page === blogs.current_page
                                                        ? 'bg-primary-600 border-primary-600 text-white'
                                                        : 'hover:border-primary-600 hover:text-primary-600 border-neutral-200 text-neutral-600'
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
