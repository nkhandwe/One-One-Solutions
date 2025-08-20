import { useTheme } from '@/contexts/ThemeContext';
import { Head, useForm } from '@inertiajs/react';
import { Building2, Eye, EyeOff, Lock, Mail, Monitor, Moon, Shield, Sun, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    setting?: {
        app_name?: string;
        logo_light?: string;
        logo_dark?: string;
        favicon?: string;
    };
}

export default function Login({ status, canResetPassword, setting }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const { theme, setTheme, colors, isDark } = useTheme();

    const appName = setting?.app_name || 'One One Solution';

    // Logo handling with fallbacks
    const getLogoUrl = () => {
        if (isDark && setting?.logo_dark) {
            return setting.logo_dark;
        } else if (!isDark && setting?.logo_light) {
            return setting.logo_light;
        }
        // Fallback to public assets
        return isDark ? '/assets/logo_dark.png' : '/assets/logo_light.png';
    };

    const getFaviconUrl = () => {
        return setting?.favicon || '/assets/favicon.png';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    const features = [
        {
            title: 'Client Management',
            description: 'Manage 100+ Amazon seller accounts efficiently',
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            icon: <TrendingUp className="h-8 w-8" />,
            title: 'Performance Analytics',
            description: 'Track sales growth and account health metrics',
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: 'Secure Access',
            description: 'Enterprise-grade security for your business data',
            gradient: 'from-purple-500 to-pink-500',
        },
    ];

    return (
        <>
            <Head title={`Login - ${appName}`}>
                <link rel="icon" type="image/png" href={getFaviconUrl()} />
            </Head>

            <div
                className="relative flex min-h-screen"
                style={{
                    background: `linear-gradient(135deg, ${colors.background.primary} 0%, ${colors.background.secondary} 50%, ${colors.background.tertiary} 100%)`,
                }}
            >
                {/* Theme Toggle - Top Right */}
                <div className="absolute top-4 right-4 z-20">
                    <div
                        className="flex items-center space-x-1 rounded-xl border p-1 backdrop-blur-lg"
                        style={{
                            background: `${colors.background.card}90`,
                            borderColor: colors.background.border,
                        }}
                    >
                        {[
                            { value: 'light', icon: Sun, label: 'Light' },
                            { value: 'dark', icon: Moon, label: 'Dark' },
                            { value: 'system', icon: Monitor, label: 'System' },
                        ].map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setTheme(option.value as 'light' | 'dark' | 'system')}
                                className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                                    theme === option.value ? 'text-white shadow-lg' : 'hover:scale-105'
                                }`}
                                style={{
                                    background:
                                        theme === option.value
                                            ? `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`
                                            : 'transparent',
                                    color: theme === option.value ? colors.text.inverse : colors.text.secondary,
                                }}
                            >
                                <option.icon className="h-4 w-4" />
                                <span className="hidden sm:inline">{option.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                {/* Left Panel - Features */}
                <div className="relative hidden items-center justify-center p-8 lg:flex lg:w-1/2">
                    {/* Background Animation Elements */}
                    <div className="absolute top-0 right-0 h-96 w-96 opacity-10">
                        <div
                            className="h-full w-full animate-pulse rounded-full"
                            style={{ background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)` }}
                        ></div>
                    </div>

                    <div className="relative z-10 max-w-md">
                        {/* Logo */}
                        <div className="mb-6 flex justify-center">
                            <div
                                className="flex h-30 w-120 items-center justify-center rounded-2xl bg-white p-2 shadow-2xl backdrop-blur-lg"
                                style={{
                                    border: `1px solid ${colors.background.border}`,
                                    boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                }}
                            >
                                <img
                                    src={getLogoUrl()}
                                    alt="Logo"
                                    className="h-full w-full object-contain"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                                <Building2 className="hidden h-14 w-14 text-gray-600" />
                            </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-4">
                            {/* First Row - Client Management and Performance Analytics */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {features.slice(0, 2).map((feature, index) => (
                                    <div
                                        key={index}
                                        className="group animate-fade-in-up cursor-pointer rounded-xl border p-4 backdrop-blur-lg transition-all duration-300 hover:scale-105"
                                        style={{
                                            background: `${colors.background.card}60`,
                                            borderColor: colors.background.border,
                                            animationDelay: `${index * 200}ms`,
                                        }}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className={`rounded-lg bg-gradient-to-br p-2 ${feature.gradient} shadow-lg`}>
                                                <div className="text-white">
                                                    {index === 0 ? <Users className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                                                    {feature.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Second Row - Secure Access */}
                            <div className="grid grid-cols-1">
                                <div
                                    className="group animate-fade-in-up cursor-pointer rounded-xl border p-4 backdrop-blur-lg transition-all duration-300 hover:scale-105"
                                    style={{
                                        background: `${colors.background.card}60`,
                                        borderColor: colors.background.border,
                                        animationDelay: `400ms`,
                                    }}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-2 shadow-lg">
                                            <div className="text-white">
                                                <Shield className="h-5 w-5" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                                                Secure Access
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div
                            className="mt-6 rounded-xl border p-6 text-center backdrop-blur-lg"
                            style={{
                                background: `${colors.background.card}60`,
                                borderColor: colors.background.border,
                                boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                            }}
                        >
                            <div className="mb-2 text-3xl font-bold" style={{ color: colors.primary.main }}>
                                100+
                            </div>
                            <div className="mb-1 text-base font-semibold" style={{ color: colors.text.primary }}>
                                Happy Amazon Sellers
                            </div>
                            <div className="text-sm" style={{ color: colors.text.tertiary }}>
                                Trusted by businesses across India
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Login Form */}
                <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="mb-8 text-center lg:hidden">
                            <div className="mb-6 flex justify-center">
                                <div
                                    className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-2 shadow-2xl"
                                    style={{
                                        border: `1px solid ${colors.background.border}`,
                                    }}
                                >
                                    <img
                                        src={getLogoUrl()}
                                        alt="Logo"
                                        className="h-full w-full object-contain"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            target.nextElementSibling?.classList.remove('hidden');
                                        }}
                                    />
                                    <Building2 className="hidden h-12 w-12 text-gray-600" />
                                </div>
                            </div>
                        </div>

                        {/* Login Form */}
                        <div
                            className="rounded-3xl border p-8 shadow-2xl backdrop-blur-lg"
                            style={{
                                background: `${colors.background.card}90`,
                                borderColor: colors.background.border,
                                boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                            }}
                        >
                            <div className="mb-8 text-center">
                                <h2 className="mb-2 text-3xl font-bold" style={{ color: colors.text.primary }}>
                                    Welcome Back! 👋
                                </h2>
                                <p style={{ color: colors.text.tertiary }}>Sign in to your admin account</p>
                            </div>

                            {status && (
                                <div
                                    className="mb-6 rounded-xl border p-4 backdrop-blur-sm"
                                    style={{
                                        background: `${colors.success.main}15`,
                                        borderColor: colors.success.main,
                                        color: colors.success.main,
                                    }}
                                >
                                    <p className="text-sm">{status}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium" style={{ color: colors.text.primary }}>
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"
                                            style={{ color: colors.text.muted }}
                                        >
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="block w-full rounded-xl border py-4 pr-4 pl-12 transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                            style={{
                                                borderColor: colors.background.border,
                                                background: colors.background.input,
                                                color: colors.text.primary,
                                                '--tw-ring-color': colors.primary.main,
                                            }}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-2 text-sm" style={{ color: colors.error.main }}>
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="mb-2 block text-sm font-medium" style={{ color: colors.text.primary }}>
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"
                                            style={{ color: colors.text.muted }}
                                        >
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="block w-full rounded-xl border py-4 pr-12 pl-12 transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                            style={{
                                                borderColor: colors.background.border,
                                                background: colors.background.input,
                                                color: colors.text.primary,
                                                '--tw-ring-color': colors.primary.main,
                                            }}
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-4 transition-transform hover:scale-110"
                                            style={{ color: colors.text.muted }}
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-sm" style={{ color: colors.error.main }}>
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-offset-0"
                                            style={{
                                                '--tw-ring-color': colors.primary.main,
                                            }}
                                        />
                                        <label htmlFor="remember" className="ml-2 block text-sm" style={{ color: colors.text.secondary }}>
                                            Remember me
                                        </label>
                                    </div>
                                    {canResetPassword && (
                                        <a
                                            href="/forgot-password"
                                            className="text-sm font-medium transition-all duration-200 hover:underline"
                                            style={{ color: colors.primary.main }}
                                        >
                                            Forgot password?
                                        </a>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-xl px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                    style={{
                                        background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                        boxShadow: `0 10px 25px -5px ${colors.primary.main}25`,
                                    }}
                                >
                                    {processing ? (
                                        <div className="flex items-center justify-center">
                                            <div className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                                            Signing in...
                                        </div>
                                    ) : (
                                        'Sign In'
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-sm" style={{ color: colors.text.tertiary }}>
                                    Need help? Contact{' '}
                                    <a
                                        href="mailto:support@oneonesolution.com"
                                        className="font-medium transition-all duration-200 hover:underline"
                                        style={{ color: colors.primary.main }}
                                    >
                                        support@oneonesolution.com
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 text-center">
                            <p className="text-sm" style={{ color: colors.text.muted }}>
                                &copy; 2024 {appName}. All rights reserved.
                            </p>
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
        </>
    );
}
