import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Eye, EyeOff, Key, Lock, Save, User, X } from 'lucide-react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    is_admin: boolean;
    created_at: string;
}

interface ChangePasswordForm {
    password: string;
    password_confirmation: string;
}

interface Props {
    user: User;
}

export default function ChangePassword({ user }: Props) {
    const { colors } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const { data, setData, patch, processing, errors, reset } = useForm<ChangePasswordForm>({
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/users/${user.id}/change-password`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AdminLayout>
            <Head title={`Change Password - ${user.name}`} />

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
                                    Change Password
                                </h1>
                                <p style={{ color: colors.text.tertiary }}>Update password for {user.name}</p>
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

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* User Info Card */}
                        <Card
                            style={{
                                background: `${colors.background.card}90`,
                                borderColor: colors.background.border,
                                boxShadow: `0 10px 25px -5px ${colors.warning.main}15`,
                            }}
                        >
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                    <User className="h-5 w-5" />
                                    User Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-full font-semibold text-white shadow-lg"
                                        style={{
                                            background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                        }}
                                    >
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold" style={{ color: colors.text.primary }}>
                                            {user.name}
                                        </p>
                                        <p className="text-sm" style={{ color: colors.text.tertiary }}>
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: colors.text.tertiary }}>
                                            User ID
                                        </p>
                                        <p className="text-lg font-semibold" style={{ color: colors.text.primary }}>
                                            #{user.id}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium" style={{ color: colors.text.tertiary }}>
                                            Role
                                        </p>
                                        <div className="mt-1">
                                            <span
                                                className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                                                style={{
                                                    background: user.is_admin ? `${colors.primary.main}20` : `${colors.secondary.main}20`,
                                                    color: user.is_admin ? colors.primary.main : colors.secondary.main,
                                                }}
                                            >
                                                {user.is_admin ? 'Administrator' : 'Regular User'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Notice */}
                                <div
                                    className="mt-6 rounded-lg border p-4"
                                    style={{
                                        background: `${colors.warning.main}10`,
                                        borderColor: `${colors.warning.main}30`,
                                    }}
                                >
                                    <div className="flex items-start gap-2">
                                        <Lock className="mt-0.5 h-4 w-4" style={{ color: colors.warning.main }} />
                                        <div>
                                            <p className="text-sm font-medium" style={{ color: colors.warning.main }}>
                                                Security Notice
                                            </p>
                                            <p className="mt-1 text-xs" style={{ color: colors.text.tertiary }}>
                                                The user will be required to use the new password on their next login
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Change Password Form */}
                        <div className="lg:col-span-2">
                            <Card
                                style={{
                                    background: `${colors.background.card}90`,
                                    borderColor: colors.background.border,
                                    boxShadow: `0 25px 50px -12px ${colors.warning.main}25`,
                                }}
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                        <Key className="h-5 w-5" />
                                        Set New Password
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Password */}
                                        <div className="space-y-2">
                                            <Label htmlFor="password" style={{ color: colors.text.primary }}>
                                                New Password *
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
                                                        '--tw-ring-color': colors.warning.main,
                                                    }}
                                                    placeholder="Enter new password"
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
                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                Password should be at least 8 characters long
                                            </p>
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="space-y-2">
                                            <Label htmlFor="password_confirmation" style={{ color: colors.text.primary }}>
                                                Confirm New Password *
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
                                                        '--tw-ring-color': colors.warning.main,
                                                    }}
                                                    placeholder="Confirm new password"
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

                                        {/* Password Requirements */}
                                        <div
                                            className="rounded-lg border p-4"
                                            style={{
                                                background: `${colors.primary.main}05`,
                                                borderColor: `${colors.primary.main}20`,
                                            }}
                                        >
                                            <p className="mb-2 text-sm font-medium" style={{ color: colors.text.primary }}>
                                                Password Requirements:
                                            </p>
                                            <ul className="space-y-1 text-xs" style={{ color: colors.text.tertiary }}>
                                                <li>• At least 8 characters long</li>
                                                <li>• Contains both uppercase and lowercase letters</li>
                                                <li>• Contains at least one number</li>
                                                <li>• Contains at least one special character</li>
                                            </ul>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex justify-end">
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="shadow-lg transition-all duration-300 hover:scale-105"
                                                style={{
                                                    background: `linear-gradient(135deg, ${colors.warning.main} 0%, ${colors.accent.main} 100%)`,
                                                    boxShadow: `0 10px 25px -5px ${colors.warning.main}25`,
                                                }}
                                            >
                                                {processing ? (
                                                    <>
                                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                                                        Updating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="mr-2 h-4 w-4" />
                                                        Update Password
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
