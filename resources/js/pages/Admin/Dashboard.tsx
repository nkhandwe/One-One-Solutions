import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Activity, Briefcase, FileText, MessageSquare, Package, Settings, Star, Users as TeamIcon, Users } from 'lucide-react';
import React from 'react';

interface StatCard {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
}

interface RecentEnquiry {
    id: number;
    name: string;
    email: string;
    subject: string;
    created_at: string;
}

interface RecentBlog {
    id: number;
    title: string;
    status: string;
    created_at: string;
}

interface Props {
    stats: {
        users: number;
        blogs: number;
        enquiries: number;
        portfolios: number;
        products: number;
        services: number;
        team: number;
        testimonials: number;
    };
    recentEnquiries: RecentEnquiry[];
    recentBlogs: RecentBlog[];
}

export default function AdminDashboard({ stats, recentEnquiries, recentBlogs }: Props) {
    const statCards: StatCard[] = [
        {
            title: 'Total Users',
            value: stats.users,
            icon: <Users className="h-5 w-5" />,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
        },
        {
            title: 'Total Blogs',
            value: stats.blogs,
            icon: <FileText className="h-5 w-5" />,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Enquiries',
            value: stats.enquiries,
            icon: <MessageSquare className="h-5 w-5" />,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
        },
        {
            title: 'Portfolios',
            value: stats.portfolios,
            icon: <Briefcase className="h-5 w-5" />,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            title: 'Products',
            value: stats.products,
            icon: <Package className="h-5 w-5" />,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
        },
        {
            title: 'Services',
            value: stats.services,
            icon: <Settings className="h-5 w-5" />,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
        },
        {
            title: 'Team Members',
            value: stats.team,
            icon: <TeamIcon className="h-5 w-5" />,
            color: 'text-pink-600',
            bgColor: 'bg-pink-50',
        },
        {
            title: 'Testimonials',
            value: stats.testimonials,
            icon: <Star className="h-5 w-5" />,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
        },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="p-6">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div className="space-y-2 text-center">
                        <h1 className="text-4xl font-bold text-neutral-900">Admin Dashboard</h1>
                        <p className="text-lg text-neutral-600">Welcome back! Here's what's happening with your site.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {statCards.map((stat, index) => (
                            <Card
                                key={index}
                                className="border-0 bg-white/70 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-sm font-medium text-neutral-600">{stat.title}</CardTitle>
                                        <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                                            <div className={stat.color}>{stat.icon}</div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
                                    <p className="mt-1 text-xs text-neutral-500">Total count</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Recent Enquiries */}
                        <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-neutral-900">
                                    <MessageSquare className="text-primary-600 h-5 w-5" />
                                    Recent Enquiries
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {recentEnquiries.length > 0 ? (
                                        recentEnquiries.map((enquiry) => (
                                            <div
                                                key={enquiry.id}
                                                className="bg-background-100 flex items-center justify-between rounded-lg border border-neutral-200 p-3"
                                            >
                                                <div className="space-y-1">
                                                    <p className="font-medium text-neutral-900">{enquiry.name}</p>
                                                    <p className="text-sm text-neutral-600">{enquiry.subject}</p>
                                                    <p className="text-xs text-neutral-500">{enquiry.email}</p>
                                                </div>
                                                <Badge variant="secondary" className="bg-secondary-600 text-white">
                                                    New
                                                </Badge>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="py-4 text-center text-neutral-500">No recent enquiries</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Blogs */}
                        <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-neutral-900">
                                    <FileText className="text-secondary-600 h-5 w-5" />
                                    Recent Blogs
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {recentBlogs.length > 0 ? (
                                        recentBlogs.map((blog) => (
                                            <div
                                                key={blog.id}
                                                className="bg-background-100 flex items-center justify-between rounded-lg border border-neutral-200 p-3"
                                            >
                                                <div className="space-y-1">
                                                    <p className="font-medium text-neutral-900">{blog.title}</p>
                                                    <p className="text-xs text-neutral-500">{new Date(blog.created_at).toLocaleDateString()}</p>
                                                </div>
                                                <Badge
                                                    variant={blog.status === 'published' ? 'default' : 'secondary'}
                                                    className={
                                                        blog.status === 'published' ? 'bg-success-main text-white' : 'bg-warning-main text-white'
                                                    }
                                                >
                                                    {blog.status}
                                                </Badge>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="py-4 text-center text-neutral-500">No recent blogs</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-neutral-900">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <button className="from-primary-600 to-primary-light hover:from-primary-dark hover:to-primary-600 transform rounded-lg bg-gradient-to-r p-4 text-white transition-all duration-300 hover:scale-105">
                                    <Users className="mx-auto mb-2 h-6 w-6" />
                                    <span className="text-sm font-medium">Manage Users</span>
                                </button>
                                <button className="from-secondary-600 to-secondary-light hover:from-secondary-dark hover:to-secondary-600 transform rounded-lg bg-gradient-to-r p-4 text-white transition-all duration-300 hover:scale-105">
                                    <FileText className="mx-auto mb-2 h-6 w-6" />
                                    <span className="text-sm font-medium">Create Blog</span>
                                </button>
                                <button className="from-accent-600 to-accent-light hover:from-accent-dark hover:to-accent-600 transform rounded-lg bg-gradient-to-r p-4 text-white transition-all duration-300 hover:scale-105">
                                    <Settings className="mx-auto mb-2 h-6 w-6" />
                                    <span className="text-sm font-medium">Settings</span>
                                </button>
                                <button className="from-success-main to-success-light hover:from-success-dark hover:to-success-main transform rounded-lg bg-gradient-to-r p-4 text-white transition-all duration-300 hover:scale-105">
                                    <Activity className="mx-auto mb-2 h-6 w-6" />
                                    <span className="text-sm font-medium">Analytics</span>
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
