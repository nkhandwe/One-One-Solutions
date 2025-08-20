import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Link, router } from '@inertiajs/react';
import {
    BarChart3,
    Briefcase,
    FileText,
    HelpCircle,
    Image,
    LayoutDashboard,
    LogOut,
    MessageSquare,
    Package,
    Settings,
    Star,
    User,
    Users,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface AdminNavigationProps {
    currentPath: string;
}

const navigationItems = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        color: 'text-primary-600',
        bgColor: 'bg-primary-50',
    },

    {
        name: 'Users',
        href: '/admin/users',
        icon: Users,
        color: 'text-secondary-600',
        bgColor: 'bg-secondary-50',
    },
    {
        name: 'Blogs',
        href: '/blogs',
        icon: FileText,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
    },
    {
        name: 'Enquiries',
        href: '/enquiries',
        icon: MessageSquare,
        color: 'text-accent-600',
        bgColor: 'bg-accent-50',
    },
    {
        name: 'Portfolios',
        href: '/portfolios',
        icon: Briefcase,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
    },
    {
        name: 'Products',
        href: '/products',
        icon: Package,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
    },
    {
        name: 'Services',
        href: '/services',
        icon: Settings,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
    },
    {
        name: 'Team',
        href: '/teams',
        icon: Users,
        color: 'text-pink-600',
        bgColor: 'bg-pink-50',
    },
    {
        name: 'Testimonials',
        href: '/testimonials',
        icon: Star,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
    },
    {
        name: 'Banners',
        href: '/banners',
        icon: Image,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
    },
    {
        name: 'FAQs',
        href: '/faqs',
        icon: HelpCircle,
        color: 'text-teal-600',
        bgColor: 'bg-teal-50',
    },
    {
        name: 'Analytics',
        href: '/admin/analytics',
        icon: BarChart3,
        color: 'text-cyan-600',
        bgColor: 'bg-cyan-50',
    },
];

export default function AdminNavigation({ currentPath }: AdminNavigationProps) {
    const { isDark, colors } = useTheme();

    const handleLogout = () => {
        router.post('/logout');
    };

    const handleProfile = () => {
        router.get('/profile');
    };

    return (
        <nav
            className="fixed top-0 left-0 flex h-screen w-64 flex-col shadow-xl backdrop-blur-md"
            style={{
                borderRight: `1px solid ${colors.background.border}`,
                background: colors.background.card,
            }}
        >
            {/* Header Section */}
            <div
                className="border-b p-6"
                style={{
                    borderColor: colors.background.divider,
                    background: `linear-gradient(135deg, ${colors.primary.main}15 0%, ${colors.secondary.main}15 100%)`,
                }}
            >
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl shadow-lg"
                        style={{
                            background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                        }}
                    >
                        <span className="text-xl font-bold text-white">O</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold" style={{ color: colors.text.primary }}>
                            OneOne Solution
                        </h1>
                        <p className="text-sm" style={{ color: colors.text.tertiary }}>
                            Admin Dashboard
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Items - Scrollable */}
            <div
                className="scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent flex-1 overflow-y-auto p-6"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: `${colors.primary.main}40 transparent`,
                }}
            >
                <div className="space-y-2">
                    {navigationItems.map((item) => {
                        const isActive = currentPath === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                                    isActive
                                        ? 'from-primary-500 to-secondary-500 shadow-primary-500/25 bg-gradient-to-r text-white shadow-lg'
                                        : isDark
                                          ? 'hover:shadow-md'
                                          : 'hover:shadow-md'
                                }`}
                                style={{
                                    color: isActive ? colors.text.inverse : colors.text.secondary,
                                    background: isActive ? 'linear-gradient(135deg, #a63446 0%, #0c6291 100%)' : 'transparent',
                                    boxShadow: isActive ? '0 10px 15px -3px rgba(166, 52, 70, 0.25)' : 'none',
                                }}
                            >
                                <div
                                    className="rounded-lg p-2"
                                    style={{
                                        background: isActive ? 'rgba(255, 255, 255, 0.2)' : colors.background.tertiary,
                                    }}
                                >
                                    <Icon
                                        className="h-5 w-5"
                                        style={{
                                            color: isActive ? colors.text.inverse : colors.primary.main,
                                        }}
                                    />
                                </div>
                                <span
                                    className="font-medium"
                                    style={{
                                        color: isActive ? colors.text.inverse : colors.text.secondary,
                                    }}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* User Profile Card - Fixed at Bottom */}
            <div className="border-t p-6" style={{ borderColor: colors.background.divider }}>
                <div
                    className="mb-4 rounded-xl p-4"
                    style={{
                        background: colors.background.tertiary,
                        border: `1px solid ${colors.background.border}`,
                    }}
                >
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: colors.primary.main }}>
                            <span className="text-sm font-bold text-white">U</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium" style={{ color: colors.text.primary }}>
                                Admin User
                            </p>
                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                admin@oneone.com
                            </p>
                        </div>
                    </div>

                    {/* Profile and Logout Buttons */}
                    <div className="mb-3 flex gap-2">
                        <Button
                            onClick={handleProfile}
                            variant="outline"
                            size="sm"
                            className="flex-1 p-2"
                            style={{
                                borderColor: colors.background.border,
                                color: colors.text.secondary,
                            }}
                            title="Profile"
                        >
                            <User className="h-4 w-4" />
                        </Button>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            size="sm"
                            className="flex-1 p-2"
                            style={{
                                borderColor: colors.error.main,
                                color: colors.error.main,
                            }}
                            title="Logout"
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Theme Toggle */}
                    <div className="mb-0">
                        <p className="mb-2 text-xs font-medium" style={{ color: colors.text.tertiary }}>
                            Theme
                        </p>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
