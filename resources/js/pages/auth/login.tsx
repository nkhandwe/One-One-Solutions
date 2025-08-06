import { Head, useForm } from '@inertiajs/react';
import { ArrowRight, Eye, EyeOff, LoaderCircle, Lock, Mail, Monitor, Moon, Shield, Sparkles, Sun, Users, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
    const [theme, setTheme] = useState('system');
    const [isDark, setIsDark] = useState(false);
    const [currentFeature, setCurrentFeature] = useState(0);

    // Refs for GSAP animations
    const containerRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);
    const logoRef = useRef(null);
    const formRef = useRef(null);
    const featuresRef = useRef(null);
    const orbsRef = useRef(null);
    const themeToggleRef = useRef(null);

    const appName = settings?.app_name || 'ModernApp';
    const appLogo = settings?.app_logo;

    const features = [
        {
            icon: <Sparkles className="h-6 w-6" />,
            title: 'AI-Powered Analytics',
            description: 'Get intelligent insights with machine learning algorithms that adapt to your business patterns.',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: 'Advanced Security',
            description: 'Military-grade encryption with biometric authentication and zero-trust architecture.',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: 'Lightning Performance',
            description: 'Quantum-speed processing with edge computing infrastructure for instant responses.',
            color: 'from-orange-500 to-red-500',
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: 'Team Collaboration',
            description: 'Real-time collaboration tools with smart workflows and automated task management.',
            color: 'from-green-500 to-emerald-500',
        },
    ];

    // Theme management
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'system';
        setTheme(savedTheme);
        applyTheme(savedTheme);
    }, []);

    const applyTheme = (newTheme: string) => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const systemDark = mediaQuery.matches;
        const shouldBeDark = newTheme === 'dark' || (newTheme === 'system' && systemDark);

        setIsDark(shouldBeDark);
        document.documentElement.classList.toggle('dark', shouldBeDark);
    };

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    // GSAP animations
    useEffect(() => {
        // Import GSAP dynamically
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = () => {
            // @ts-ignore
            const { gsap } = window;

            // Initial setup - hide elements
            gsap.set([leftPanelRef.current, rightPanelRef.current, themeToggleRef.current], {
                opacity: 0,
                y: 50,
            });

            gsap.set(orbsRef.current?.children || [], {
                scale: 0,
                rotation: 0,
            });

            // Main timeline
            const tl = gsap.timeline();

            // Animate containers
            tl.to(leftPanelRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
            })
                .to(
                    rightPanelRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: 'power3.out',
                    },
                    '-=0.8',
                )
                .to(
                    themeToggleRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'back.out(1.7)',
                    },
                    '-=0.6',
                );

            // Animate floating orbs
            if (orbsRef.current) {
                gsap.to(orbsRef.current.children, {
                    scale: 1,
                    rotation: 360,
                    duration: 2,
                    ease: 'elastic.out(1, 0.5)',
                    stagger: 0.2,
                });

                // Continuous floating animation
                gsap.to(orbsRef.current.children, {
                    y: 'random(-20, 20)',
                    x: 'random(-20, 20)',
                    duration: 'random(3, 5)',
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                    stagger: {
                        each: 0.5,
                        repeat: -1,
                    },
                });
            }

            // Logo animation
            if (logoRef.current) {
                gsap.from(logoRef.current, {
                    scale: 0,
                    rotation: -180,
                    duration: 1.5,
                    ease: 'elastic.out(1, 0.3)',
                    delay: 0.5,
                });
            }

            // Form elements animation
            if (formRef.current) {
                const formElements = formRef.current.querySelectorAll('.form-element');
                gsap.from(formElements, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: 'power2.out',
                    stagger: 0.1,
                    delay: 1,
                });
            }

            // Features animation
            if (featuresRef.current) {
                const featureCards = featuresRef.current.querySelectorAll('.feature-card');
                gsap.from(featureCards, {
                    opacity: 0,
                    x: -50,
                    duration: 1,
                    ease: 'power2.out',
                    stagger: 0.2,
                    delay: 1.2,
                });
            }
        };
        document.head.appendChild(script);

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    // Feature cycling
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [features.length]);

    // Input animations
    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        // @ts-ignore
        if (window.gsap) {
            // @ts-ignore
            window.gsap.to(e.target.parentElement, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        // @ts-ignore
        if (window.gsap) {
            // @ts-ignore
            window.gsap.to(e.target.parentElement, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Sign In" />
            <div className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${isDark ? 'dark' : ''}`}>
                {/* Background with animated gradient */}
                <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transition-all duration-500 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
                    {/* Animated grid pattern */}
                    <div className="absolute inset-0 opacity-30">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                backgroundSize: '60px 60px',
                            }}
                        />
                    </div>
                </div>

                {/* Floating orbs */}
                <div ref={orbsRef} className="pointer-events-none fixed inset-0">
                    <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-3xl" />
                    <div className="absolute top-3/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl" />
                    <div className="absolute bottom-1/4 left-1/3 h-80 w-80 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-400/20 blur-3xl" />
                    <div className="absolute top-1/2 right-1/3 h-72 w-72 rounded-full bg-gradient-to-r from-orange-400/20 to-red-400/20 blur-3xl" />
                </div>

                {/* Theme toggle */}
                <div ref={themeToggleRef} className="fixed top-6 right-6 z-50">
                    <div className="flex items-center space-x-2 rounded-full border border-gray-200/50 bg-white/80 p-2 shadow-lg backdrop-blur-lg dark:border-gray-700/50 dark:bg-gray-800/80">
                        {[
                            { key: 'light', icon: Sun, label: 'Light' },
                            { key: 'system', icon: Monitor, label: 'System' },
                            { key: 'dark', icon: Moon, label: 'Dark' },
                        ].map(({ key, icon: Icon, label }) => (
                            <button
                                key={key}
                                onClick={() => handleThemeChange(key)}
                                className={`rounded-full p-2 transition-all duration-300 ${
                                    theme === key
                                        ? 'scale-110 bg-blue-500 text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                                }`}
                                title={label}
                            >
                                <Icon className="h-4 w-4" />
                            </button>
                        ))}
                    </div>
                </div>

                <div ref={containerRef} className="relative z-10 flex min-h-screen">
                    {/* Left Panel - Features Showcase */}
                    <div ref={leftPanelRef} className="relative hidden lg:flex lg:w-1/2">
                        <div className="relative z-10 flex flex-1 flex-col justify-center px-12 xl:px-20">
                            {/* Logo and branding */}
                            <div className="mb-16">
                                <div ref={logoRef} className="mb-8 flex items-center space-x-4">
                                    {appLogo ? (
                                        <img src={appLogo} alt={appName} className="h-16 w-16 rounded-2xl shadow-2xl" />
                                    ) : (
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl">
                                            <Sparkles className="h-8 w-8 text-white" />
                                        </div>
                                    )}
                                    <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-gray-300">
                                        {appName}
                                    </h1>
                                </div>
                                <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Welcome to the Future</h2>
                                <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                                    Experience the next generation of productivity with our AI-powered platform designed for modern teams.
                                </p>
                            </div>

                            {/* Features showcase */}
                            <div ref={featuresRef} className="relative">
                                <div className="relative h-80 overflow-hidden">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className={`feature-card absolute inset-0 transition-all duration-700 ${
                                                index === currentFeature ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            }`}
                                        >
                                            <div className="rounded-3xl border border-gray-200/50 bg-white/60 p-8 shadow-2xl backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-800/60">
                                                <div
                                                    className={`h-16 w-16 bg-gradient-to-br ${feature.color} mb-6 flex items-center justify-center rounded-2xl text-white shadow-lg`}
                                                >
                                                    {feature.icon}
                                                </div>
                                                <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                                                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Feature indicators */}
                                <div className="mt-8 flex justify-center space-x-3">
                                    {features.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentFeature(index)}
                                            className={`rounded-full transition-all duration-300 ${
                                                index === currentFeature
                                                    ? 'h-3 w-8 bg-blue-500 shadow-lg'
                                                    : 'h-3 w-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="mt-16 grid grid-cols-3 gap-8">
                                {[
                                    { number: '50K+', label: 'Active Users' },
                                    { number: '99.9%', label: 'Uptime' },
                                    { number: '24/7', label: 'Support' },
                                ].map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Login Form */}
                    <div ref={rightPanelRef} className="flex w-full items-center justify-center p-8 lg:w-1/2">
                        <div className="w-full max-w-md">
                            {/* Mobile logo */}
                            <div className="mb-12 flex flex-col items-center lg:hidden">
                                {appLogo ? (
                                    <img src={appLogo} alt={appName} className="mb-4 h-20 w-20 rounded-2xl shadow-2xl" />
                                ) : (
                                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl">
                                        <Sparkles className="h-10 w-10 text-white" />
                                    </div>
                                )}
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{appName}</h1>
                            </div>

                            {/* Status message */}
                            {status && (
                                <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                                    <p className="text-center text-sm font-medium text-green-600 dark:text-green-400">{status}</p>
                                </div>
                            )}

                            {/* Form container */}
                            <div className="relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl dark:border-gray-700/50 dark:bg-gray-800/70">
                                {/* Animated background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20" />

                                <div ref={formRef} className="relative z-10">
                                    {/* Header */}
                                    <div className="form-element mb-8 text-center">
                                        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
                                        <p className="text-gray-600 dark:text-gray-300">Sign in to continue your journey</p>
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Email field */}
                                        <div className="form-element space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                            <div className="group relative">
                                                <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400 transition-colors group-focus-within:text-blue-500" />
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    onFocus={handleInputFocus}
                                                    onBlur={handleInputBlur}
                                                    placeholder="Enter your email"
                                                    className="h-14 w-full rounded-xl border-2 border-gray-200 bg-white/50 pr-4 pl-12 text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-blue-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400"
                                                    required
                                                    autoFocus
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 transition-all duration-300 group-focus-within:from-blue-500/10 group-focus-within:to-purple-500/10" />
                                            </div>
                                            {errors.email && <div className="text-sm text-red-500">{errors.email}</div>}
                                        </div>

                                        {/* Password field */}
                                        <div className="form-element space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                                {canResetPassword && (
                                                    <a
                                                        href={route('password.request')}
                                                        className="text-sm text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                                    >
                                                        Forgot password?
                                                    </a>
                                                )}
                                            </div>
                                            <div className="group relative">
                                                <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400 transition-colors group-focus-within:text-blue-500" />
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={data.password}
                                                    onChange={(e) => setData('password', e.target.value)}
                                                    onFocus={handleInputFocus}
                                                    onBlur={handleInputBlur}
                                                    placeholder="Enter your password"
                                                    className="h-14 w-full rounded-xl border-2 border-gray-200 bg-white/50 pr-12 pl-12 text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-blue-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                                                >
                                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                </button>
                                                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 transition-all duration-300 group-focus-within:from-blue-500/10 group-focus-within:to-purple-500/10" />
                                            </div>
                                            {errors.password && <div className="text-sm text-red-500">{errors.password}</div>}
                                        </div>

                                        {/* Remember me */}
                                        <div className="form-element flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                id="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                                className="h-4 w-4 rounded border-2 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                                            />
                                            <label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-300">
                                                Remember me for 30 days
                                            </label>
                                        </div>

                                        {/* Submit button */}
                                        <div className="form-element">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="group relative h-14 w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 group-hover:translate-x-[100%]" />
                                                <div className="relative flex items-center justify-center space-x-2">
                                                    {processing ? (
                                                        <LoaderCircle className="h-5 w-5 animate-spin" />
                                                    ) : (
                                                        <>
                                                            <span>Sign In</span>
                                                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                                        </>
                                                    )}
                                                </div>
                                            </button>
                                        </div>
                                    </form>

                                    {/* Divider */}
                                    <div className="form-element my-8">
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="bg-white/70 px-4 text-gray-500 dark:bg-gray-800/70 dark:text-gray-400">
                                                    New to {appName}?
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sign up link */}
                                    <div className="form-element text-center">
                                        <a
                                            href={route('register')}
                                            className="group inline-flex items-center space-x-2 font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            <span>Create an account</span>
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                                <p>© 2024 {appName}. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CSS for animations */}
                <style>{`
                    @keyframes float {
                        0%,
                        100% {
                            transform: translateY(0px);
                        }
                        50% {
                            transform: translateY(-10px);
                        }
                    }

                    @keyframes pulse {
                        0%,
                        100% {
                            opacity: 1;
                        }
                        50% {
                            opacity: 0.5;
                        }
                    }

                    .animate-float {
                        animation: float 6s ease-in-out infinite;
                    }

                    .animate-pulse {
                        animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                    }
                `}</style>
            </div>
        </>
    );
}

