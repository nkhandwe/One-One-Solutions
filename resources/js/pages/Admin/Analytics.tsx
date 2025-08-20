import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Activity, BarChart3, Calendar, Eye, MousePointer, Target, TrendingDown, TrendingUp, Users } from 'lucide-react';

interface AnalyticsData {
    pageViews: number;
    uniqueVisitors: number;
    bounceRate: number;
    avgSessionDuration: number;
    topPages: Array<{
        name: string;
        views: number;
        change: number;
    }>;
    trafficSources: Array<{
        source: string;
        percentage: number;
        change: number;
    }>;
    monthlyStats: Array<{
        month: string;
        visitors: number;
        pageViews: number;
    }>;
}

interface Props {
    analytics: AnalyticsData;
}

export default function AdminAnalytics({ analytics }: Props) {
    // Mock data for demonstration
    const mockAnalytics: AnalyticsData = {
        pageViews: 15420,
        uniqueVisitors: 8234,
        bounceRate: 42.3,
        avgSessionDuration: 245,
        topPages: [
            { name: 'Homepage', views: 5420, change: 12.5 },
            { name: 'About Us', views: 3240, change: -2.1 },
            { name: 'Services', views: 2980, change: 8.7 },
            { name: 'Contact', views: 1870, change: 15.2 },
            { name: 'Blog', views: 1560, change: 23.4 },
        ],
        trafficSources: [
            { source: 'Organic Search', percentage: 45.2, change: 8.3 },
            { source: 'Direct Traffic', percentage: 28.7, change: -1.2 },
            { source: 'Social Media', percentage: 18.4, change: 12.7 },
            { source: 'Referral', percentage: 7.7, change: 3.1 },
        ],
        monthlyStats: [
            { month: 'Jan', visitors: 7200, pageViews: 12800 },
            { month: 'Feb', visitors: 8100, pageViews: 14500 },
            { month: 'Mar', visitors: 8900, pageViews: 16200 },
            { month: 'Apr', visitors: 9500, pageViews: 17800 },
            { month: 'May', visitors: 10200, pageViews: 19200 },
            { month: 'Jun', visitors: 11000, pageViews: 20800 },
        ],
    };

    const data = analytics || mockAnalytics;

    return (
        <AdminLayout>
            <Head title="Analytics" />

            <div className="p-6">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div className="space-y-2 text-center">
                        <h1 className="text-4xl font-bold text-neutral-900">Analytics Dashboard</h1>
                        <p className="text-lg text-neutral-600">Track your website performance and user behavior</p>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-neutral-600">Page Views</p>
                                        <p className="text-3xl font-bold text-neutral-900">{data.pageViews.toLocaleString()}</p>
                                        <div className="mt-1 flex items-center gap-1">
                                            <TrendingUp className="text-success-main h-4 w-4" />
                                            <span className="text-success-main text-sm">+12.5%</span>
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-blue-50 p-3">
                                        <Eye className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-neutral-600">Unique Visitors</p>
                                        <p className="text-3xl font-bold text-neutral-900">{data.uniqueVisitors.toLocaleString()}</p>
                                        <div className="mt-1 flex items-center gap-1">
                                            <TrendingUp className="text-success-main h-4 w-4" />
                                            <span className="text-success-main text-sm">+8.2%</span>
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-green-50 p-3">
                                        <Users className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-neutral-600">Bounce Rate</p>
                                        <p className="text-3xl font-bold text-neutral-900">{data.bounceRate}%</p>
                                        <div className="mt-1 flex items-center gap-1">
                                            <TrendingDown className="text-success-main h-4 w-4" />
                                            <span className="text-success-main text-sm">-2.1%</span>
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-orange-50 p-3">
                                        <MousePointer className="h-6 w-6 text-orange-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-neutral-600">Avg. Session</p>
                                        <p className="text-3xl font-bold text-neutral-900">
                                            {Math.floor(data.avgSessionDuration / 60)}m {data.avgSessionDuration % 60}s
                                        </p>
                                        <div className="mt-1 flex items-center gap-1">
                                            <TrendingUp className="text-success-main h-4 w-4" />
                                            <span className="text-success-main text-sm">+5.3%</span>
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-purple-50 p-3">
                                        <Activity className="h-6 w-6 text-purple-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts and Tables */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Top Pages */}
                        <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-neutral-900">
                                    <BarChart3 className="text-primary-600 h-5 w-5" />
                                    Top Pages
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {data.topPages.map((page, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="from-primary-500 to-secondary-500 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r text-sm font-bold text-white">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-neutral-900">{page.name}</p>
                                                    <p className="text-sm text-neutral-500">{page.views.toLocaleString()} views</p>
                                                </div>
                                            </div>
                                            <Badge
                                                variant={page.change >= 0 ? 'default' : 'secondary'}
                                                className={page.change >= 0 ? 'bg-success-main text-white' : 'bg-error-main text-white'}
                                            >
                                                {page.change >= 0 ? '+' : ''}
                                                {page.change}%
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Traffic Sources */}
                        <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-neutral-900">
                                    <Target className="text-secondary-600 h-5 w-5" />
                                    Traffic Sources
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {data.trafficSources.map((source, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-neutral-700">{source.source}</span>
                                                <span className="text-sm text-neutral-600">{source.percentage}%</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-neutral-200">
                                                <div
                                                    className="from-primary-500 to-secondary-500 h-2 rounded-full bg-gradient-to-r transition-all duration-500"
                                                    style={{ width: `${source.percentage}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {source.change >= 0 ? (
                                                    <TrendingUp className="text-success-main h-3 w-3" />
                                                ) : (
                                                    <TrendingDown className="text-error-main h-3 w-3" />
                                                )}
                                                <span className={`text-xs ${source.change >= 0 ? 'text-success-main' : 'text-error-main'}`}>
                                                    {source.change >= 0 ? '+' : ''}
                                                    {source.change}%
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Monthly Chart */}
                    <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-neutral-900">
                                <Calendar className="text-accent-600 h-5 w-5" />
                                Monthly Traffic Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex h-64 items-end justify-between gap-2">
                                {data.monthlyStats.map((stat, index) => (
                                    <div key={index} className="flex flex-1 flex-col items-center">
                                        <div
                                            className="from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 w-full rounded-t-lg bg-gradient-to-t transition-all duration-300"
                                            style={{ height: `${(stat.visitors / Math.max(...data.monthlyStats.map((s) => s.visitors))) * 200}px` }}
                                        ></div>
                                        <div className="mt-2 text-center">
                                            <p className="text-xs font-medium text-neutral-700">{stat.month}</p>
                                            <p className="text-xs text-neutral-500">{stat.visitors.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
