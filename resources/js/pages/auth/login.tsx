import { Head, useForm } from '@inertiajs/react';
import { ChevronRight, Eye, EyeOff, LoaderCircle, Moon, Shield, Sparkles, Sun, Zap } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    settings?: {
        app_name?: string;
        app_logo?: string;
    };
}

export default function Login({ status, canResetPassword, settings }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const appName = settings?.app_name || 'Your App';
    const appLogo = settings?.app_logo;

    const features = [
        {
            icon: <Sparkles className="h-6 w-6" />,
            title: 'Smart Analytics',
            description: 'Get insights that matter with our advanced analytics dashboard',
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: 'Enterprise Security',
            description: 'Bank-level security with end-to-end encryption for your data',
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: 'Lightning Fast',
            description: 'Optimized performance that scales with your growing business',
        },
    ];

    useEffect(() => {
        setIsLoaded(true);

        // Check for saved theme preference or default to dark
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

        setDarkMode(shouldUseDark);
        document.documentElement.classList.toggle('dark', shouldUseDark);

        // Auto-slide features
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % features.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [features.length]);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.documentElement.classList.toggle('dark', newDarkMode);
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
                {/* Background with animated gradient */}
                <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 transition-colors duration-300 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
                    <div className="absolute inset-0 opacity-50">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                backgroundRepeat: 'repeat',
                            }}
                        ></div>
                    </div>
                </div>

                {/* Floating orbs animation */}
                <div className="pointer-events-none fixed inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/5"></div>
                    <div className="absolute top-3/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-cyan-400/10 blur-3xl delay-1000 dark:bg-cyan-500/5"></div>
                    <div className="absolute bottom-1/4 left-1/3 h-80 w-80 animate-pulse rounded-full bg-purple-400/10 blur-3xl delay-2000 dark:bg-purple-500/5"></div>
                </div>

                {/* Dark mode toggle */}
                <button
                    onClick={toggleDarkMode}
                    className={`group fixed top-6 right-6 z-50 rounded-full border border-gray-200 bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800/80 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
                    type="button"
                >
                    {darkMode ? (
                        <Sun className="h-5 w-5 text-yellow-500 transition-transform duration-300 group-hover:rotate-180" />
                    ) : (
                        <Moon className="h-5 w-5 text-gray-700 transition-transform duration-300 group-hover:-rotate-12" />
                    )}
                </button>

                <div className="relative z-10 flex">
                    {/* Left side - Feature showcase */}
                    <div
                        className={`relative hidden overflow-hidden lg:flex lg:w-1/2 ${isLoaded ? 'translate-x-0' : '-translate-x-full'} transition-transform delay-300 duration-1000`}
                    >
                        <div className="relative z-10 flex flex-1 flex-col justify-center px-12 xl:px-16">
                            {/* Logo and brand */}
                            <div className="mb-16">
                                <div className="mb-6 flex items-center space-x-4">
                                    {appLogo ? (
                                        <img src={appLogo} alt={appName} className="h-12 w-12 rounded-2xl shadow-lg" />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                                            <span className="text-xl font-bold text-white">{appName.charAt(0)}</span>
                                        </div>
                                    )}
                                    <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:to-gray-300">
                                        {appName}
                                    </h1>
                                </div>
                                <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                                    Welcome back! Sign in to continue your journey with our powerful platform.
                                </p>
                            </div>

                            {/* Feature slides */}
                            <div className="relative mb-8 h-48">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-all duration-700 ${
                                            index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}
                                    >
                                        <div className="flex items-start space-x-4 rounded-2xl border border-gray-200/50 bg-white/60 p-6 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/60">
                                            <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-3 text-white shadow-lg">
                                                {feature.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                                                <p className="leading-relaxed text-gray-600 dark:text-gray-300">{feature.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Slide indicators */}
                            <div className="flex space-x-2">
                                {features.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        type="button"
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            index === currentSlide
                                                ? 'w-8 bg-blue-500'
                                                : 'w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right side - Login form */}
                    <div
                        className={`flex w-full items-center justify-center p-8 lg:w-1/2 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} transition-all delay-500 duration-1000`}
                    >
                        <div className="w-full max-w-md">
                            {/* Mobile logo */}
                            <div className="mb-12 flex flex-col items-center lg:hidden">
                                {appLogo ? (
                                    <img src={appLogo} alt={appName} className="mb-4 h-16 w-16 rounded-2xl shadow-lg" />
                                ) : (
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                                        <span className="text-2xl font-bold text-white">{appName.charAt(0)}</span>
                                    </div>
                                )}
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{appName}</h1>
                            </div>

                            {/* Form container */}
                            <div className="relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-8 shadow-2xl backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-800/80">
                                {/* Decorative gradient */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-cyan-50/50 dark:from-blue-900/20 dark:via-transparent dark:to-cyan-900/20"></div>

                                <div className="relative z-10">
                                    {/* Header */}
                                    <div className="mb-8 text-center">
                                        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
                                        <p className="text-gray-600 dark:text-gray-300">Sign in to your account to continue</p>
                                    </div>

                                    {/* Status message */}
                                    {status && (
                                        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                                            <p className="text-center text-sm font-medium text-green-600 dark:text-green-400">{status}</p>
                                        </div>
                                    )}

                                    {/* Form */}
                                    <form className="space-y-6" onSubmit={submit}>
                                        {/* Email field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Email address
                                            </Label>
                                            <div className="group relative">
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder="email@example.com"
                                                    className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 transition-all duration-200 group-hover:border-gray-300 focus:border-blue-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:group-hover:border-gray-500 dark:focus:border-blue-400"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-cyan-500/0 transition-all duration-300 group-focus-within:from-blue-500/10 group-focus-within:via-blue-500/5 group-focus-within:to-cyan-500/10"></div>
                                            </div>
                                            <InputError message={errors.email} />
                                        </div>

                                        {/* Password field */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Password
                                                </Label>
                                                {canResetPassword && (
                                                    <TextLink
                                                        href={route('password.request')}
                                                        className="text-sm text-blue-600 transition-colors duration-200 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                                        tabIndex={5}
                                                    >
                                                        Forgot password?
                                                    </TextLink>
                                                )}
                                            </div>
                                            <div className="group relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="current-password"
                                                    value={data.password}
                                                    onChange={(e) => setData('password', e.target.value)}
                                                    placeholder="Enter your password"
                                                    className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 pr-12 transition-all duration-200 group-hover:border-gray-300 focus:border-blue-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:group-hover:border-gray-500 dark:focus:border-blue-400"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-gray-400 transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-300"
                                                >
                                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                </button>
                                                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-cyan-500/0 transition-all duration-300 group-focus-within:from-blue-500/10 group-focus-within:via-blue-500/5 group-focus-within:to-cyan-500/10"></div>
                                            </div>
                                            <InputError message={errors.password} />
                                        </div>

                                        {/* Remember me */}
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                checked={data.remember}
                                                onClick={() => setData('remember', !data.remember)}
                                                tabIndex={3}
                                                className="rounded-md border-2 border-gray-300 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-gray-600"
                                            />
                                            <Label htmlFor="remember" className="cursor-pointer text-sm text-gray-600 dark:text-gray-300">
                                                Remember me for 30 days
                                            </Label>
                                        </div>

                                        {/* Submit button */}
                                        <Button
                                            type="submit"
                                            className="group relative h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl"
                                            tabIndex={4}
                                            disabled={processing}
                                        >
                                            <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 group-hover:translate-x-full"></div>
                                            <div className="relative flex items-center justify-center space-x-2">
                                                {processing ? (
                                                    <LoaderCircle className="h-5 w-5 animate-spin" />
                                                ) : (
                                                    <>
                                                        <span>Sign in</span>
                                                        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                                                    </>
                                                )}
                                            </div>
                                        </Button>
                                    </form>

                                    {/* Sign up link */}
                                    <div className="mt-8 text-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="bg-white/80 px-4 text-gray-500 dark:bg-gray-800/80 dark:text-gray-400">
                                                    New to {appName}?
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <TextLink
                                                href={route('register')}
                                                tabIndex={5}
                                                className="group inline-flex items-center space-x-2 font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                <span>Create an account</span>
                                                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                                            </TextLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
