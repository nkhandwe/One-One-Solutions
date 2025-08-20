import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/contexts/ThemeContext';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Edit, Eye, Key, Mail, Plus, Search, Shield, ShieldOff, Trash2, UserCheck, Users } from 'lucide-react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    is_admin: boolean;
    created_at: string;
}

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function AdminUsers({ users }: Props) {
    const { colors, isDark } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'user'>('all');

    const toggleAdmin = (userId: number) => {
        router.patch(`/admin/users/${userId}/toggle-admin`);
    };

    // Filter users based on search and role
    const filteredUsers = users.data.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || (filterRole === 'admin' && user.is_admin) || (filterRole === 'user' && !user.is_admin);
        return matchesSearch && matchesRole;
    });

    const adminUsersCount = users.data.filter((user) => user.is_admin).length;
    const regularUsersCount = users.data.filter((user) => !user.is_admin).length;
    const verifiedUsersCount = users.data.filter((user) => user.email_verified_at).length;

    return (
        <AdminLayout>
            <Head title="Manage Users" />

            <div className="p-6">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/dashboard"
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
                                    User Management
                                </h1>
                                <p style={{ color: colors.text.tertiary }}>Control user access and permissions</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" style={{ color: colors.text.muted }} />
                                <Input
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-64 pl-10 transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                    style={{
                                        borderColor: colors.background.border,
                                        background: colors.background.input,
                                        color: colors.text.primary,
                                        '--tw-ring-color': colors.primary.main,
                                    }}
                                />
                            </div>
                            <Link
                                href="/users/create"
                                className="inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                    boxShadow: `0 10px 25px -5px ${colors.primary.main}25`,
                                }}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add User
                            </Link>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                        <Card
                            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
                            style={{
                                background: `linear-gradient(135deg, ${colors.primary.main}05 0%, ${colors.primary.main}15 100%)`,
                                borderColor: `${colors.primary.main}30`,
                                boxShadow: `0 10px 25px -5px ${colors.primary.main}20`,
                            }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                                <div className="w-full h-full rounded-full" style={{ background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)` }}></div>
                            </div>
                            <CardContent className="p-6 relative">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium mb-2" style={{ color: colors.text.secondary }}>
                                            Total Users
                                        </p>
                                        <p className="text-4xl font-bold mb-1" style={{ color: colors.primary.main }}>
                                            {users.total}
                                        </p>
                                        <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                            All registered users
                                        </p>
                                    </div>
                                    <div 
                                        className="rounded-2xl p-4 shadow-lg"
                                        style={{ 
                                            background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                            boxShadow: `0 8px 25px -5px ${colors.primary.main}40`
                                        }}
                                    >
                                        <Users className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card
                            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
                            style={{
                                background: `linear-gradient(135deg, ${colors.secondary.main}05 0%, ${colors.secondary.main}15 100%)`,
                                borderColor: `${colors.secondary.main}30`,
                                boxShadow: `0 10px 25px -5px ${colors.secondary.main}20`,
                            }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                                <div className="w-full h-full rounded-full" style={{ background: `linear-gradient(135deg, ${colors.secondary.main} 0%, ${colors.accent.main} 100%)` }}></div>
                            </div>
                            <CardContent className="p-6 relative">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium mb-2" style={{ color: colors.text.secondary }}>
                                            Admin Users
                                        </p>
                                        <p className="text-4xl font-bold mb-1" style={{ color: colors.secondary.main }}>
                                            {adminUsersCount}
                                        </p>
                                        <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                            System administrators
                                        </p>
                                    </div>
                                    <div 
                                        className="rounded-2xl p-4 shadow-lg"
                                        style={{ 
                                            background: `linear-gradient(135deg, ${colors.secondary.main} 0%, ${colors.accent.main} 100%)`,
                                            boxShadow: `0 8px 25px -5px ${colors.secondary.main}40`
                                        }}
                                    >
                                        <Shield className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card
                            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
                            style={{
                                background: `linear-gradient(135deg, ${colors.accent.main}05 0%, ${colors.accent.main}15 100%)`,
                                borderColor: `${colors.accent.main}30`,
                                boxShadow: `0 10px 25px -5px ${colors.accent.main}20`,
                            }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                                <div className="w-full h-full rounded-full" style={{ background: `linear-gradient(135deg, ${colors.accent.main} 0%, ${colors.success.main} 100%)` }}></div>
                            </div>
                            <CardContent className="p-6 relative">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium mb-2" style={{ color: colors.text.secondary }}>
                                            Regular Users
                                        </p>
                                        <p className="text-4xl font-bold mb-1" style={{ color: colors.accent.main }}>
                                            {regularUsersCount}
                                        </p>
                                        <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                            Standard accounts
                                        </p>
                                    </div>
                                    <div 
                                        className="rounded-2xl p-4 shadow-lg"
                                        style={{ 
                                            background: `linear-gradient(135deg, ${colors.accent.main} 0%, ${colors.success.main} 100%)`,
                                            boxShadow: `0 8px 25px -5px ${colors.accent.main}40`
                                        }}
                                    >
                                        <UserCheck className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card
                            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
                            style={{
                                background: `linear-gradient(135deg, ${colors.success.main}05 0%, ${colors.success.main}15 100%)`,
                                borderColor: `${colors.success.main}30`,
                                boxShadow: `0 10px 25px -5px ${colors.success.main}20`,
                            }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                                <div className="w-full h-full rounded-full" style={{ background: `linear-gradient(135deg, ${colors.success.main} 0%, ${colors.primary.main} 100%)` }}></div>
                            </div>
                            <CardContent className="p-6 relative">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium mb-2" style={{ color: colors.text.secondary }}>
                                            Verified Users
                                        </p>
                                        <p className="text-4xl font-bold mb-1" style={{ color: colors.success.main }}>
                                            {verifiedUsersCount}
                                        </p>
                                        <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                            Email confirmed
                                        </p>
                                    </div>
                                    <div 
                                        className="rounded-2xl p-4 shadow-lg"
                                        style={{ 
                                            background: `linear-gradient(135deg, ${colors.success.main} 0%, ${colors.primary.main} 100%)`,
                                            boxShadow: `0 8px 25px -5px ${colors.success.main}40`
                                        }}
                                    >
                                        <Eye className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters */}
                    <Card
                        style={{
                            background: `${colors.background.card}90`,
                            borderColor: colors.background.border,
                        }}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium" style={{ color: colors.text.secondary }}>
                                        Filter by Role:
                                    </span>
                                    <div className="flex rounded-lg border" style={{ borderColor: colors.background.border }}>
                                        {[
                                            { value: 'all', label: 'All' },
                                            { value: 'admin', label: 'Admin' },
                                            { value: 'user', label: 'User' },
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => setFilterRole(option.value as 'all' | 'admin' | 'user')}
                                                className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
                                                    filterRole === option.value ? 'text-white' : 'hover:scale-105'
                                                }`}
                                                style={{
                                                    background:
                                                        filterRole === option.value
                                                            ? `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`
                                                            : 'transparent',
                                                    color: filterRole === option.value ? colors.text.inverse : colors.text.secondary,
                                                }}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-sm" style={{ color: colors.text.tertiary }}>
                                    Showing {filteredUsers.length} of {users.total} users
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Users Table */}
                    <Card
                        style={{
                            background: `${colors.background.card}90`,
                            borderColor: colors.background.border,
                            boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                        }}
                    >
                        <CardHeader>
                            <CardTitle style={{ color: colors.text.primary }}>User List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr style={{ borderColor: colors.background.divider }}>
                                            <th className="p-4 text-left font-medium" style={{ color: colors.text.secondary }}>
                                                User
                                            </th>
                                            <th className="p-4 text-left font-medium" style={{ color: colors.text.secondary }}>
                                                Email
                                            </th>
                                            <th className="p-4 text-left font-medium" style={{ color: colors.text.secondary }}>
                                                Status
                                            </th>
                                            <th className="p-4 text-left font-medium" style={{ color: colors.text.secondary }}>
                                                Role
                                            </th>
                                            <th className="p-4 text-left font-medium" style={{ color: colors.text.secondary }}>
                                                Joined
                                            </th>
                                            <th className="p-4 text-left font-medium" style={{ color: colors.text.secondary }}>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((user, index) => (
                                            <tr
                                                key={user.id}
                                                className="group cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                                                style={{
                                                    borderColor: colors.background.divider,
                                                    animationDelay: `${index * 50}ms`,
                                                }}
                                            >
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="flex h-10 w-10 items-center justify-center rounded-full font-semibold text-white shadow-lg"
                                                            style={{
                                                                background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                                            }}
                                                        >
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium" style={{ color: colors.text.primary }}>
                                                                {user.name}
                                                            </p>
                                                            <p className="text-sm" style={{ color: colors.text.tertiary }}>
                                                                ID: {user.id}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-4 w-4" style={{ color: colors.text.muted }} />
                                                        <span style={{ color: colors.text.secondary }}>{user.email}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <Badge
                                                        className="transition-all duration-200 hover:scale-105"
                                                        style={{
                                                            background: user.email_verified_at ? colors.success.main : colors.warning.main,
                                                            color: colors.text.inverse,
                                                        }}
                                                    >
                                                        {user.email_verified_at ? 'Verified' : 'Unverified'}
                                                    </Badge>
                                                </td>
                                                <td className="p-4">
                                                    <Badge
                                                        className="transition-all duration-200 hover:scale-105"
                                                        style={{
                                                            background: user.is_admin ? colors.primary.main : colors.secondary.main,
                                                            color: colors.text.inverse,
                                                        }}
                                                    >
                                                        {user.is_admin ? 'Admin' : 'User'}
                                                    </Badge>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4" style={{ color: colors.text.muted }} />
                                                        <span style={{ color: colors.text.secondary }}>
                                                            {new Date(user.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={`/users/${user.id}/edit`}
                                                            className="flex items-center justify-center rounded-lg border p-2 transition-all duration-300 hover:scale-105"
                                                            style={{
                                                                borderColor: colors.accent.main,
                                                                color: colors.accent.main,
                                                                background: 'transparent',
                                                            }}
                                                            title="Edit User"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>

                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => router.get(`/users/${user.id}/change-password`)}
                                                            className="flex items-center justify-center rounded-lg border p-2 transition-all duration-300 hover:scale-105"
                                                            style={{
                                                                borderColor: colors.warning.main,
                                                                color: colors.warning.main,
                                                                background: 'transparent',
                                                            }}
                                                            title="Change Password"
                                                        >
                                                            <Key className="h-4 w-4" />
                                                        </Button>

                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => toggleAdmin(user.id)}
                                                            className="transition-all duration-300 hover:scale-105"
                                                            style={{
                                                                borderColor: user.is_admin ? colors.primary.main : colors.secondary.main,
                                                                color: user.is_admin ? colors.primary.main : colors.secondary.main,
                                                                background: 'transparent',
                                                            }}
                                                            title={user.is_admin ? 'Remove Admin' : 'Make Admin'}
                                                        >
                                                            {user.is_admin ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                                                        </Button>

                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                if (confirm('Are you sure you want to delete this user?')) {
                                                                    router.delete(`/users/${user.id}`);
                                                                }
                                                            }}
                                                            className="flex items-center justify-center rounded-lg border p-2 transition-all duration-300 hover:scale-105"
                                                            style={{
                                                                borderColor: colors.error.main,
                                                                color: colors.error.main,
                                                                background: 'transparent',
                                                            }}
                                                            title="Delete User"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {users.last_page > 1 && (
                                <div
                                    className="mt-6 flex items-center justify-between border-t pt-6"
                                    style={{ borderColor: colors.background.divider }}
                                >
                                    <p className="text-sm" style={{ color: colors.text.tertiary }}>
                                        Showing {(users.current_page - 1) * users.per_page + 1} to{' '}
                                        {Math.min(users.current_page * users.per_page, users.total)} of {users.total} results
                                    </p>
                                    <div className="flex items-center gap-2">
                                        {Array.from({ length: users.last_page }, (_, i) => i + 1).map((page) => (
                                            <Button
                                                key={page}
                                                variant={page === users.current_page ? 'default' : 'outline'}
                                                size="sm"
                                                className="transition-all duration-200 hover:scale-105"
                                                style={{
                                                    background:
                                                        page === users.current_page
                                                            ? `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`
                                                            : 'transparent',
                                                    borderColor: page === users.current_page ? colors.primary.main : colors.background.border,
                                                    color: page === users.current_page ? colors.text.inverse : colors.text.secondary,
                                                }}
                                            >
                                                {page}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
