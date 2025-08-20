import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Mail, Save, Shield, User, X } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    is_admin: boolean;
    created_at: string;
}

interface EditUserForm {
    name: string;
    email: string;
    is_admin: boolean;
}

interface Props {
    user: User;
}

export default function EditUser({ user }: Props) {
    const { colors } = useTheme();

    const { data, setData, patch, processing, errors } = useForm<EditUserForm>({
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/users/${user.id}`);
    };

    return (
        <AdminLayout>
            <Head title={`Edit User - ${user.name}`} />

            <div className="p-6">
                <div className="mx-auto max-w-7xl space-y-6">
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
                                    Edit User
                                </h1>
                                <p style={{ color: colors.text.tertiary }}>Update user information for {user.name}</p>
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
                                boxShadow: `0 10px 25px -5px ${colors.primary.main}15`,
                            }}
                        >
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                    <User className="h-5 w-5" />
                                    User Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
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
                                        Email Status
                                    </p>
                                    <div className="mt-1">
                                        <span
                                            className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                                            style={{
                                                background: user.email_verified_at ? `${colors.success.main}20` : `${colors.warning.main}20`,
                                                color: user.email_verified_at ? colors.success.main : colors.warning.main,
                                            }}
                                        >
                                            {user.email_verified_at ? 'Verified' : 'Unverified'}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium" style={{ color: colors.text.tertiary }}>
                                        Member Since
                                    </p>
                                    <p className="text-sm" style={{ color: colors.text.secondary }}>
                                        {new Date(user.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium" style={{ color: colors.text.tertiary }}>
                                        Current Role
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
                            </CardContent>
                        </Card>

                        {/* Edit Form */}
                        <div className="lg:col-span-2">
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
                                        Edit Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                                    required
                                                />
                                            </div>
                                            {errors.email && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.email}
                                                </p>
                                            )}
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
                                                        Updating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="mr-2 h-4 w-4" />
                                                        Update User
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
