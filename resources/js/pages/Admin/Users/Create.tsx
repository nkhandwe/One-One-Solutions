import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Eye, EyeOff, Mail, Save, Shield, User, X } from 'lucide-react';
import { useState } from 'react';

interface CreateUserForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    is_admin: boolean;
}

export default function CreateUser() {
    const { colors } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<CreateUserForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        is_admin: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/users', {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Create User" />

            <div className="p-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/users"
                                className="group flex items-center justify-center rounded-full border p-3 transition-all duration-300 hover:scale-105"
                                style={{
                                    background: `${colors.background.card}60`,
                                    borderColor: colors.background.border,
                                }}
                            >
                                <ArrowLeft className="h-5 w-5 transition-colors" style={{ color: colors.text.secondary }} />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold" style={{ color: colors.text.primary }}>
                                    Create New User
                                </h1>
                                <p style={{ color: colors.text.tertiary }}>Add a new user to the system</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/users"
                                className="inline-flex items-center justify-center rounded-lg border px-4 py-2 font-medium transition-all duration-300 hover:scale-105"
                                style={{
                                    borderColor: colors.background.border,
                                    color: colors.text.secondary,
                                    background: `${colors.background.card}60`,
                                }}
                            >
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Link>
                        </div>
                    </div>

                    {/* Create User Form */}
                    <Card
                        style={{
                            background: `${colors.background.card}90`,
                            borderColor: colors.background.border,
                            boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                        }}
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                <User className="h-5 w-5" />
                                User Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name" style={{ color: colors.text.primary }}>
                                            Full Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                            style={{
                                                borderColor: colors.background.border,
                                                background: colors.background.input,
                                                color: colors.text.primary,
                                                '--tw-ring-color': colors.primary.main,
                                            }}
                                            placeholder="Enter full name"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-sm" style={{ color: colors.error.main }}>
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email" style={{ color: colors.text.primary }}>
                                            Email Address *
                                        </Label>
                                        <div className="relative">
                                            <div
                                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                                                style={{ color: colors.text.muted }}
                                            >
                                                <Mail className="h-4 w-4" />
                                            </div>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                                placeholder="Enter email address"
                                                required
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="text-sm" style={{ color: colors.error.main }}>
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password" style={{ color: colors.text.primary }}>
                                            Password *
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                                placeholder="Enter password"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 transition-transform hover:scale-110"
                                                style={{ color: colors.text.muted }}
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="text-sm" style={{ color: colors.error.main }}>
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation" style={{ color: colors.text.primary }}>
                                            Confirm Password *
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="password_confirmation"
                                                type={showPasswordConfirmation ? 'text' : 'password'}
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                                placeholder="Confirm password"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 transition-transform hover:scale-110"
                                                style={{ color: colors.text.muted }}
                                            >
                                                {showPasswordConfirmation ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        {errors.password_confirmation && (
                                            <p className="text-sm" style={{ color: colors.error.main }}>
                                                {errors.password_confirmation}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Admin Role */}
                                <div className="space-y-2">
                                    <Label style={{ color: colors.text.primary }}>User Role</Label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="is_admin"
                                            checked={data.is_admin}
                                            onChange={(e) => setData('is_admin', e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-offset-0"
                                            style={{
                                                '--tw-ring-color': colors.primary.main,
                                            }}
                                        />
                                        <Label
                                            htmlFor="is_admin"
                                            className="flex items-center gap-2 text-sm font-medium"
                                            style={{ color: colors.text.secondary }}
                                        >
                                            <Shield className="h-4 w-4" />
                                            Grant admin privileges
                                        </Label>
                                    </div>
                                    <p className="text-sm" style={{ color: colors.text.tertiary }}>
                                        Admin users have full access to manage the system
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="shadow-lg transition-all duration-300 hover:scale-105"
                                        style={{
                                            background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                            boxShadow: `0 10px 25px -5px ${colors.primary.main}25`,
                                        }}
                                    >
                                        {processing ? (
                                            <>
                                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Create User
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
