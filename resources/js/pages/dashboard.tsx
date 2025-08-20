import { useTheme } from '@/contexts/ThemeContext';
import AdminLayout from '@/layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import {
    ArrowDown,
    ArrowUp,
    BarChart3,
    BookOpen,
    Briefcase,
    Calendar,
    Eye,
    FileText,
    Globe,
    HelpCircle,
    Image,
    Mail,
    Package,
    Star,
    TrendingUp,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Stats {
    totalVisitors: number;
    todayVisitors: number;
    users: number;
    blogs: number;
    publishedBlogs: number;
    draftBlogs: number;
    services: number;
    activeServices: number;
    enquiries: number;
    portfolios: number;
    products: number;
    team: number;
    testimonials: number;
    banners: number;
    faqs: number;
}

interface VisitorStats {
    thisWeek: number;
    lastWeek: number;
    thisMonth: number;
    lastMonth: number;
}

interface GrowthStats {
    weeklyGrowth: number;
    monthlyGrowth: number;
}

interface TodayStats {
    visitors: number;
    enquiries: number;
    blogs: number;
    users: number;
}

interface DashboardProps {
    stats: Stats;
    visitorStats: VisitorStats;
    growthStats: GrowthStats;
    recentEnquiries: any[];
    recentBlogs: any[];
    recentServices: any[];
    recentUsers: any[];
    topPerformers: {
        blogs: any[];
        services: any[];
    };
    todayStats: TodayStats;
    visitorCountryData: Array<{
        country: string;
        visitors: number;
        percentage: number;
    }>;
    visitorAnalytics: {
        uniqueCountries: number;
        topCountry: {
            country: string;
            visitors: number;
            percentage: number;
        } | null;
        avgVisitorsPerCountry: number;
    };
}

export default function Dashboard({
    stats,
    visitorStats,
    growthStats,
    recentEnquiries,
    recentBlogs,
    recentServices,
    recentUsers,
    topPerformers,
    todayStats,
    visitorCountryData,
    visitorAnalytics,
}: DashboardProps) {
    const { colors, isDark } = useTheme();
    const [animatedStats, setAnimatedStats] = useState<Partial<Stats>>({});

    // Animation for counting numbers
    useEffect(() => {
        const animateNumber = (key: keyof Stats, target: number) => {
            let current = 0;
            const increment = Math.ceil(target / 30);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                setAnimatedStats((prev) => ({ ...prev, [key]: current }));
            }, 50);
        };

        Object.entries(stats).forEach(([key, value]) => {
            animateNumber(key as keyof Stats, value);
        });
    }, [stats]);

    // Main statistics cards configuration
    const mainStatsConfig = [
        {
            title: 'Total Visitors',
            value: animatedStats.totalVisitors || 0,
            icon: Globe,
            gradient: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
            change: growthStats.monthlyGrowth,
            changeType: growthStats.monthlyGrowth >= 0 ? 'increase' : 'decrease',
            description: 'All time visitors',
        },
        {
            title: 'Today Visitors',
            value: animatedStats.todayVisitors || 0,
            icon: Eye,
            gradient: `linear-gradient(135deg, ${colors.accent.main} 0%, ${colors.primary.main} 100%)`,
            change: growthStats.weeklyGrowth,
            changeType: growthStats.weeklyGrowth >= 0 ? 'increase' : 'decrease',
            description: 'Unique visitors today',
        },
        {
            title: 'Content Items',
            value: (animatedStats.blogs || 0) + (animatedStats.services || 0) + (animatedStats.portfolios || 0),
            icon: FileText,
            gradient: `linear-gradient(135deg, #10b981 0%, #059669 100%)`,
            change: 12.5,
            changeType: 'increase',
            description: 'Total content pieces',
        },
        {
            title: 'Enquiries',
            value: animatedStats.enquiries || 0,
            icon: Mail,
            gradient: `linear-gradient(135deg, #f59e0b 0%, #d97706 100%)`,
            change: 8.7,
            changeType: 'increase',
            description: 'Customer inquiries',
        },
    ];

    // Content statistics
    const contentStats = [
        { title: 'Published Blogs', value: animatedStats.publishedBlogs || 0, icon: BookOpen, color: colors.success.main },
        { title: 'Draft Blogs', value: animatedStats.draftBlogs || 0, icon: FileText, color: colors.warning.main },
        { title: 'Active Services', value: animatedStats.activeServices || 0, icon: Briefcase, color: colors.primary.main },
        { title: 'Team Members', value: animatedStats.team || 0, icon: Users, color: colors.secondary.main },
        { title: 'Portfolios', value: animatedStats.portfolios || 0, icon: Image, color: colors.accent.main },
        { title: 'Testimonials', value: animatedStats.testimonials || 0, icon: Star, color: colors.success.main },
        { title: 'Products', value: animatedStats.products || 0, icon: Package, color: colors.primary.main },
        { title: 'FAQs', value: animatedStats.faqs || 0, icon: HelpCircle, color: colors.secondary.main },
    ];

    // Country flag mapping
    const getCountryFlag = (country: string) => {
        const flagMap: { [key: string]: string } = {
            India: '🇮🇳',
            'United States': '🇺🇸',
            'United Kingdom': '🇬🇧',
            Canada: '🇨🇦',
            Australia: '🇦🇺',
            Germany: '🇩🇪',
            France: '🇫🇷',
            Japan: '🇯🇵',
            China: '🇨🇳',
            Brazil: '🇧🇷',
            Mexico: '🇲🇽',
            Italy: '🇮🇹',
            Spain: '🇪🇸',
            Netherlands: '🇳🇱',
            Sweden: '🇸🇪',
            Norway: '🇳🇴',
            Denmark: '🇩🇰',
            Finland: '🇫🇮',
            Switzerland: '🇨🇭',
            Austria: '🇦🇹',
            Belgium: '🇧🇪',
            Poland: '🇵🇱',
            'Czech Republic': '🇨🇿',
            Hungary: '🇭🇺',
            Romania: '🇷🇴',
            Bulgaria: '🇧🇬',
            Greece: '🇬🇷',
            Portugal: '🇵🇹',
            Ireland: '🇮🇪',
            'New Zealand': '🇳🇿',
            'South Africa': '🇿🇦',
            Egypt: '🇪🇬',
            Nigeria: '🇳🇬',
            Kenya: '🇰🇪',
            Morocco: '🇲🇦',
            Tunisia: '🇹🇳',
            Algeria: '🇩🇿',
            Ghana: '🇬🇭',
            Ethiopia: '🇪🇹',
            Uganda: '🇺🇬',
            Tanzania: '🇹🇿',
            Zimbabwe: '🇿🇼',
            Zambia: '🇿🇲',
            Malawi: '🇲🇼',
            Mozambique: '🇲🇿',
            Angola: '🇦🇴',
            Botswana: '🇧🇼',
            Namibia: '🇳🇦',
            Lesotho: '🇱🇸',
            Eswatini: '🇸🇿',
            Madagascar: '🇲🇬',
            Mauritius: '🇲🇺',
            Seychelles: '🇸🇨',
            Comoros: '🇰🇲',
            Djibouti: '🇩🇯',
            Somalia: '🇸🇴',
            Eritrea: '🇪🇷',
            Sudan: '🇸🇩',
            'South Sudan': '🇸🇸',
            'Central African Republic': '🇨🇫',
            Chad: '🇹🇩',
            Niger: '🇳🇪',
            Mali: '🇲🇱',
            'Burkina Faso': '🇧🇫',
            Senegal: '🇸🇳',
            Gambia: '🇬🇲',
            'Guinea-Bissau': '🇬🇼',
            Guinea: '🇬🇳',
            'Sierra Leone': '🇸🇱',
            Liberia: '🇱🇷',
            'Ivory Coast': '🇨🇮',
            Togo: '🇹🇬',
            Benin: '🇧🇯',
            Cameroon: '🇨🇲',
            'Equatorial Guinea': '🇬🇶',
            Gabon: '🇬🇦',
            Congo: '🇨🇬',
            'Democratic Republic of the Congo': '🇨🇩',
            Rwanda: '🇷🇼',
            Burundi: '🇧🇮',
        };
        return flagMap[country] || '🌍';
    };

    return (
        <AdminLayout>
            <Head title="Dashboard - OneOne Solution" />

            <div className="min-h-screen space-y-8 p-6">
                {/* Header Section with Glass Effect */}
                <div
                    className="relative overflow-hidden rounded-3xl border p-8 backdrop-blur-lg"
                    style={{
                        background: `linear-gradient(135deg, ${colors.primary.main}15 0%, ${colors.secondary.main}15 50%, ${colors.accent.main}15 100%)`,
                        borderColor: colors.background.border,
                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                    }}
                >
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="mb-2 text-4xl font-bold" style={{ color: colors.text.primary }}>
                                    Welcome Back! 👋
                                </h1>
                                <p className="text-lg" style={{ color: colors.text.secondary }}>
                                    Here's what's happening with OneOne Solution today
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div
                                    className="flex items-center space-x-2 rounded-xl px-4 py-2 backdrop-blur-sm"
                                    style={{
                                        background: `${colors.background.card}80`,
                                        border: `1px solid ${colors.background.border}`,
                                    }}
                                >
                                    <Calendar className="h-5 w-5" style={{ color: colors.primary.main }} />
                                    <span className="font-medium" style={{ color: colors.text.primary }}>
                                        {new Date().toLocaleDateString('en-IN', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Today's Quick Stats */}
                        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                            {[
                                { label: 'Today Visitors', value: todayStats.visitors, icon: Eye },
                                { label: 'New Enquiries', value: todayStats.enquiries, icon: Mail },
                                { label: 'New Blogs', value: todayStats.blogs, icon: BookOpen },
                                { label: 'New Users', value: todayStats.users, icon: Users },
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="animate-fade-in-up flex items-center space-x-3 rounded-xl p-4 backdrop-blur-sm"
                                    style={{
                                        background: `${colors.background.card}60`,
                                        border: `1px solid ${colors.background.border}50`,
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                >
                                    <div className="rounded-lg p-2" style={{ background: `${colors.primary.main}20` }}>
                                        <stat.icon className="h-5 w-5" style={{ color: colors.primary.main }} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold" style={{ color: colors.text.primary }}>
                                            {stat.value}
                                        </p>
                                        <p className="text-sm" style={{ color: colors.text.tertiary }}>
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Background Animation Elements */}
                    <div className="absolute top-0 right-0 h-96 w-96 opacity-10">
                        <div
                            className="h-full w-full animate-pulse rounded-full"
                            style={{ background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)` }}
                        ></div>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {mainStatsConfig.map((stat, index) => (
                        <div
                            key={index}
                            className="group animate-fade-in-up relative transform cursor-pointer overflow-hidden rounded-2xl border p-6 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            style={{
                                background: `${colors.background.card}90`,
                                borderColor: colors.background.border,
                                boxShadow: `0 10px 25px -5px ${colors.primary.main}15`,
                                animationDelay: `${index * 150}ms`,
                            }}
                        >
                            {/* Gradient Background */}
                            <div
                                className="absolute inset-0 opacity-5 transition-opacity duration-300 group-hover:opacity-10"
                                style={{ background: stat.gradient }}
                            ></div>

                            <div className="relative z-10">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="rounded-xl p-3" style={{ background: stat.gradient }}>
                                        <stat.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        {stat.changeType === 'increase' ? (
                                            <ArrowUp className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <ArrowDown className="h-4 w-4 text-red-500" />
                                        )}
                                        <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                                            {Math.abs(stat.change)}%
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-1 text-sm font-medium" style={{ color: colors.text.tertiary }}>
                                        {stat.title}
                                    </h3>
                                    <p className="mb-1 text-3xl font-bold" style={{ color: colors.text.primary }}>
                                        {stat.value.toLocaleString()}
                                    </p>
                                    <p className="text-xs" style={{ color: colors.text.muted }}>
                                        {stat.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Statistics Grid */}
                <div
                    className="rounded-2xl border p-6 backdrop-blur-lg"
                    style={{
                        background: `${colors.background.card}90`,
                        borderColor: colors.background.border,
                        boxShadow: `0 10px 25px -5px ${colors.primary.main}10`,
                    }}
                >
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold" style={{ color: colors.text.primary }}>
                                Content Overview
                            </h2>
                            <p style={{ color: colors.text.tertiary }}>Detailed breakdown of your content</p>
                        </div>
                        <div
                            className="flex items-center space-x-2 rounded-xl px-4 py-2"
                            style={{
                                background: `${colors.primary.main}15`,
                                border: `1px solid ${colors.primary.main}25`,
                            }}
                        >
                            <BarChart3 className="h-5 w-5" style={{ color: colors.primary.main }} />
                            <span className="font-medium" style={{ color: colors.primary.main }}>
                                Analytics
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
                        {contentStats.map((stat, index) => (
                            <div
                                key={index}
                                className="animate-fade-in-up cursor-pointer rounded-xl p-4 text-center transition-all duration-300 hover:scale-105"
                                style={{
                                    background: `${stat.color}10`,
                                    border: `1px solid ${stat.color}25`,
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                <div className="mb-3 flex justify-center">
                                    <div className="rounded-full p-3" style={{ background: `${stat.color}20` }}>
                                        <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                                    </div>
                                </div>
                                <p className="mb-1 text-2xl font-bold" style={{ color: colors.text.primary }}>
                                    {stat.value}
                                </p>
                                <p className="text-sm" style={{ color: colors.text.tertiary }}>
                                    {stat.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Visitor Analytics Chart */}
                    <div className="lg:col-span-2">
                        <div
                            className="overflow-hidden rounded-2xl border backdrop-blur-lg"
                            style={{
                                background: `${colors.background.card}90`,
                                borderColor: colors.background.border,
                                boxShadow: `0 10px 25px -5px ${colors.primary.main}10`,
                            }}
                        >
                            <div className="border-b p-6" style={{ borderColor: colors.background.divider }}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold" style={{ color: colors.text.primary }}>
                                            Visitor Analytics
                                        </h2>
                                        <p style={{ color: colors.text.tertiary }}>Country-wise visitor distribution</p>
                                    </div>
                                    <div
                                        className="flex items-center space-x-2 rounded-lg px-3 py-1"
                                        style={{ background: `${colors.primary.main}15` }}
                                    >
                                        <Globe className="h-4 w-4" style={{ color: colors.primary.main }} />
                                        <span className="text-sm font-medium" style={{ color: colors.primary.main }}>
                                            Global
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Country Chart */}
                                <div className="mb-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold" style={{ color: colors.text.primary }}>
                                            Visitor Countries
                                        </h3>
                                        <span
                                            className="rounded-full px-3 py-1 text-sm"
                                            style={{
                                                background: `${colors.primary.main}15`,
                                                color: colors.primary.main,
                                            }}
                                        >
                                            {visitorCountryData.length} Countries
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        {visitorCountryData.length > 0 ? (
                                            visitorCountryData.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="animate-fade-in-up flex cursor-pointer items-center space-x-4 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
                                                    style={{
                                                        background: `${colors.primary.main}05`,
                                                        border: `1px solid ${colors.primary.main}15`,
                                                        animationDelay: `${index * 100}ms`,
                                                    }}
                                                >
                                                    <div className="flex min-w-0 flex-1 items-center space-x-3">
                                                        <span className="text-2xl">{getCountryFlag(item.country)}</span>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="font-medium" style={{ color: colors.text.primary }}>
                                                                {item.country}
                                                            </p>
                                                            <p className="text-sm" style={{ color: colors.text.tertiary }}>
                                                                {item.visitors.toLocaleString()} visitors
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center space-x-3">
                                                        <div className="h-2 w-32 rounded-full" style={{ background: `${colors.primary.main}20` }}>
                                                            <div
                                                                className="h-2 rounded-full transition-all duration-1000"
                                                                style={{
                                                                    background: `linear-gradient(90deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                                                    width: `${item.percentage}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <span
                                                            className="min-w-[3rem] text-right text-sm font-bold"
                                                            style={{ color: colors.text.primary }}
                                                        >
                                                            {item.percentage}%
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="py-12 text-center">
                                                <Globe className="mx-auto mb-4 h-12 w-12 opacity-50" style={{ color: colors.text.muted }} />
                                                <p className="mb-2 text-lg font-medium" style={{ color: colors.text.primary }}>
                                                    No visitor data yet
                                                </p>
                                                <p className="text-sm" style={{ color: colors.text.muted }}>
                                                    Visitor analytics will appear here once you have traffic
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="mt-6 border-t pt-6" style={{ borderColor: colors.background.divider }}>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {[
                                            {
                                                label: 'Total Countries',
                                                value: visitorAnalytics.uniqueCountries.toString(),
                                                icon: Globe,
                                            },
                                            {
                                                label: 'Top Country',
                                                value: visitorAnalytics.topCountry ? visitorAnalytics.topCountry.country : 'N/A',
                                                icon: Users,
                                            },
                                            {
                                                label: 'This Week',
                                                value: visitorStats.thisWeek.toLocaleString(),
                                                icon: Eye,
                                            },
                                            {
                                                label: 'Weekly Growth',
                                                value: `${growthStats.weeklyGrowth >= 0 ? '+' : ''}${growthStats.weeklyGrowth}%`,
                                                icon: TrendingUp,
                                            },
                                        ].map((stat, index) => (
                                            <div
                                                key={index}
                                                className="cursor-pointer rounded-lg p-3 text-center transition-all duration-300 hover:scale-105"
                                                style={{
                                                    background: `${colors.primary.main}08`,
                                                    border: `1px solid ${colors.primary.main}15`,
                                                }}
                                            >
                                                <div className="mb-2 flex justify-center">
                                                    <div className="rounded-full p-2" style={{ background: `${colors.primary.main}20` }}>
                                                        <stat.icon className="h-4 w-4" style={{ color: colors.primary.main }} />
                                                    </div>
                                                </div>
                                                <p className="mb-1 text-lg font-bold" style={{ color: colors.text.primary }}>
                                                    {stat.value}
                                                </p>
                                                <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                    {stat.label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance Overview */}
                    <div className="space-y-6">
                        {/* Visitor Growth */}
                        <div
                            className="rounded-2xl border p-6 backdrop-blur-lg"
                            style={{
                                background: `${colors.background.card}90`,
                                borderColor: colors.background.border,
                                boxShadow: `0 10px 25px -5px ${colors.primary.main}10`,
                            }}
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg font-bold" style={{ color: colors.text.primary }}>
                                    Visitor Growth
                                </h3>
                                <TrendingUp className="h-5 w-5" style={{ color: colors.success.main }} />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span style={{ color: colors.text.secondary }}>This Week</span>
                                        <span className="font-bold" style={{ color: colors.text.primary }}>
                                            {visitorStats.thisWeek.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-full" style={{ background: `${colors.primary.main}20` }}>
                                        <div
                                            className="h-2 rounded-full transition-all duration-1000"
                                            style={{
                                                background: `linear-gradient(90deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                                width: `${Math.min((visitorStats.thisWeek / Math.max(visitorStats.thisWeek, visitorStats.lastWeek, 1)) * 100, 100)}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span style={{ color: colors.text.secondary }}>Last Week</span>
                                        <span className="font-bold" style={{ color: colors.text.primary }}>
                                            {visitorStats.lastWeek.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-full" style={{ background: `${colors.accent.main}20` }}>
                                        <div
                                            className="h-2 rounded-full transition-all duration-1000"
                                            style={{
                                                background: `linear-gradient(90deg, ${colors.accent.main} 0%, ${colors.primary.main} 100%)`,
                                                width: `${Math.min((visitorStats.lastWeek / Math.max(visitorStats.thisWeek, visitorStats.lastWeek, 1)) * 100, 100)}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center border-t pt-4" style={{ borderColor: colors.background.divider }}>
                                    <div className="flex items-center space-x-2">
                                        {growthStats.weeklyGrowth >= 0 ? (
                                            <ArrowUp className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <ArrowDown className="h-4 w-4 text-red-500" />
                                        )}
                                        <span className={`font-bold ${growthStats.weeklyGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {Math.abs(growthStats.weeklyGrowth)}% growth
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top Content */}
                        <div
                            className="rounded-2xl border p-6 backdrop-blur-lg"
                            style={{
                                background: `${colors.background.card}90`,
                                borderColor: colors.background.border,
                                boxShadow: `0 10px 25px -5px ${colors.primary.main}10`,
                            }}
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg font-bold" style={{ color: colors.text.primary }}>
                                    Top Content
                                </h3>
                                <Star className="h-5 w-5" style={{ color: colors.warning.main }} />
                            </div>

                            <div className="space-y-4">
                                {/* Top Blogs */}
                                <div>
                                    <h4 className="mb-3 text-sm font-semibold" style={{ color: colors.text.secondary }}>
                                        📝 Popular Blogs
                                    </h4>
                                    <div className="space-y-2">
                                        {topPerformers.blogs.slice(0, 4).map((blog, index) => (
                                            <div
                                                key={index}
                                                className="flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition-transform hover:scale-[1.02]"
                                                style={{ background: `${colors.primary.main}05` }}
                                            >
                                                <div
                                                    className="flex h-6 w-6 items-center justify-center rounded-full"
                                                    style={{ background: colors.primary.main }}
                                                >
                                                    <span className="text-xs font-bold text-white">{index + 1}</span>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium" style={{ color: colors.text.primary }}>
                                                        {blog.title}
                                                    </p>
                                                    <p className="text-xs" style={{ color: colors.text.muted }}>
                                                        {blog.status === 'published' ? '✅ Published' : '📝 Draft'}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Top Services */}
                                <div>
                                    <h4 className="mb-3 text-sm font-semibold" style={{ color: colors.text.secondary }}>
                                        🔧 Active Services
                                    </h4>
                                    <div className="space-y-2">
                                        {topPerformers.services.slice(0, 4).map((service, index) => (
                                            <div
                                                key={index}
                                                className="flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition-transform hover:scale-[1.02]"
                                                style={{ background: `${colors.secondary.main}05` }}
                                            >
                                                <div
                                                    className="flex h-6 w-6 items-center justify-center rounded-full"
                                                    style={{ background: colors.secondary.main }}
                                                >
                                                    <span className="text-xs font-bold text-white">{index + 1}</span>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium" style={{ color: colors.text.primary }}>
                                                        {service.name}
                                                    </p>
                                                    <p className="text-xs" style={{ color: colors.text.muted }}>
                                                        {service.is_active ? '🟢 Active' : '🔴 Inactive'}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div className="border-t pt-4" style={{ borderColor: colors.background.divider }}>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            className="flex items-center justify-center space-x-2 rounded-lg p-2 text-xs transition-all hover:scale-105"
                                            style={{
                                                background: `${colors.primary.main}10`,
                                                border: `1px solid ${colors.primary.main}20`,
                                                color: colors.primary.main,
                                            }}
                                        >
                                            <BookOpen className="h-3 w-3" />
                                            <span>All Blogs</span>
                                        </button>
                                        <button
                                            className="flex items-center justify-center space-x-2 rounded-lg p-2 text-xs transition-all hover:scale-105"
                                            style={{
                                                background: `${colors.secondary.main}10`,
                                                border: `1px solid ${colors.secondary.main}20`,
                                                color: colors.secondary.main,
                                            }}
                                        >
                                            <Briefcase className="h-3 w-3" />
                                            <span>All Services</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </AdminLayout>
    );
}
