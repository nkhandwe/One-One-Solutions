import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/contexts/ThemeContext';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Download, Edit, Eye, Mail, MessageSquare, Phone, Plus, Search, Trash2, User, X } from 'lucide-react';
import { useState } from 'react';

interface Enquiry {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    ip_address: string;
    user_agent: string;
    page_url: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    enquiries: Enquiry[] | { data: Enquiry[]; [key: string]: any };
}

export default function EnquiriesIndex({ enquiries }: Props) {
    const { colors } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [contactType, setContactType] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const [sortBy, setSortBy] = useState('created_at');

    // Handle both array and paginated object
    const enquiriesArray = Array.isArray(enquiries) ? enquiries : enquiries?.data || [];
    const totalEnquiriesCount = enquiriesArray.length;
    const todayEnquiriesCount = enquiriesArray.filter((e) => new Date(e.created_at).toDateString() === new Date().toDateString()).length;
    const thisWeekEnquiriesCount = enquiriesArray.filter((e) => {
        const enquiryDate = new Date(e.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return enquiryDate >= weekAgo;
    }).length;
    const withEmailCount = enquiriesArray.filter((e) => e.email && e.email.trim() !== '').length;
    const withPhoneCount = enquiriesArray.filter((e) => e.phone && e.phone.trim() !== '').length;

    // Filter and sort enquiries
    const filteredEnquiries = enquiriesArray
        .filter((enquiry) => {
            const matchesSearch =
                enquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                enquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                enquiry.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                enquiry.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                enquiry.message?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesContactType =
                contactType === 'all' ||
                (contactType === 'with_email' && enquiry.email && enquiry.email.trim() !== '') ||
                (contactType === 'with_phone' && enquiry.phone && enquiry.phone.trim() !== '');

            const matchesDateRange =
                dateRange === 'all' ||
                (dateRange === 'today' && new Date(enquiry.created_at).toDateString() === new Date().toDateString()) ||
                (dateRange === 'this_week' &&
                    (() => {
                        const enquiryDate = new Date(enquiry.created_at);
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return enquiryDate >= weekAgo;
                    })()) ||
                (dateRange === 'this_month' && new Date(enquiry.created_at).getMonth() === new Date().getMonth()) ||
                (dateRange === 'recent' &&
                    (() => {
                        const enquiryDate = new Date(enquiry.created_at);
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return enquiryDate >= weekAgo;
                    })());

            return matchesSearch && matchesContactType && matchesDateRange;
        })
        .sort((a, b) => {
            if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
            if (sortBy === 'subject') return (a.subject || '').localeCompare(b.subject || '');
            if (sortBy === 'created_at') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

    const handleDelete = (enquiryId: number) => {
        if (confirm('Are you sure you want to delete this enquiry?')) {
            router.delete(`/enquiries/${enquiryId}`);
        }
    };

    const handleExport = () => {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (contactType !== 'all') params.append('contact_type', contactType);
        if (dateRange !== 'all') params.append('date_range', dateRange);

        const url = `/enquiries/export${params.toString() ? '?' + params.toString() : ''}`;
        window.open(url, '_blank');
    };

    const clearFilters = () => {
        setSearchTerm('');
        setContactType('all');
        setDateRange('all');
        setSortBy('created_at');
    };

    return (
        <AdminLayout>
            <Head title="Enquiries Management" />

            <div className="p-6">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
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
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold" style={{ color: colors.text.primary }}>
                                Enquiries Management
                            </h1>
                            <p style={{ color: colors.text.tertiary }}>Manage customer inquiries and contact form submissions</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={handleExport}
                                variant="outline"
                                className="shadow-lg transition-all duration-300 hover:scale-105"
                                style={{
                                    borderColor: colors.background.border,
                                    color: colors.text.secondary,
                                }}
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Export CSV
                            </Button>
                            <Link
                                href="/enquiries/create"
                                className="shadow-lg transition-all duration-300 hover:scale-105"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                    boxShadow: `0 10px 25px -5px ${colors.primary.main}25`,
                                }}
                            >
                                <Button className="bg-transparent text-white hover:bg-white/10">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Enquiry
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {/* Total Enquiries */}
                        <Card
                            className="group relative overflow-hidden transition-all duration-300 hover:scale-105"
                            style={{
                                background: `linear-gradient(135deg, ${colors.background.card}90 0%, ${colors.background.card}70 100%)`,
                                borderColor: colors.background.border,
                                boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                            }}
                        >
                            <div
                                className="absolute -top-4 -right-4 h-24 w-24 rounded-full opacity-10 transition-all duration-300 group-hover:scale-110"
                                style={{ background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)` }}
                            />
                            <CardContent className="relative p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: colors.text.tertiary }}>
                                            Total Enquiries
                                        </p>
                                        <p className="text-3xl font-bold" style={{ color: colors.text.primary }}>
                                            {totalEnquiriesCount}
                                        </p>
                                    </div>
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-full"
                                        style={{
                                            background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                        }}
                                    >
                                        <MessageSquare className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Today's Enquiries */}
                        <Card
                            className="group relative overflow-hidden transition-all duration-300 hover:scale-105"
                            style={{
                                background: `linear-gradient(135deg, ${colors.background.card}90 0%, ${colors.background.card}70 100%)`,
                                borderColor: colors.background.border,
                                boxShadow: `0 25px 50px -12px ${colors.success.main}25`,
                            }}
                        >
                            <div
                                className="absolute -top-4 -right-4 h-24 w-24 rounded-full opacity-10 transition-all duration-300 group-hover:scale-110"
                                style={{ background: `linear-gradient(135deg, ${colors.success.main} 0%, ${colors.accent.main} 100%)` }}
                            />
                            <CardContent className="relative p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: colors.text.tertiary }}>
                                            Today
                                        </p>
                                        <p className="text-3xl font-bold" style={{ color: colors.text.primary }}>
                                            {todayEnquiriesCount}
                                        </p>
                                    </div>
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-full"
                                        style={{
                                            background: `linear-gradient(135deg, ${colors.success.main} 0%, ${colors.accent.main} 100%)`,
                                        }}
                                    >
                                        <Calendar className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* This Week's Enquiries */}
                        <Card
                            className="group relative overflow-hidden transition-all duration-300 hover:scale-105"
                            style={{
                                background: `linear-gradient(135deg, ${colors.background.card}90 0%, ${colors.background.card}70 100%)`,
                                borderColor: colors.background.border,
                                boxShadow: `0 25px 50px -12px ${colors.warning.main}25`,
                            }}
                        >
                            <div
                                className="absolute -top-4 -right-4 h-24 w-24 rounded-full opacity-10 transition-all duration-300 group-hover:scale-110"
                                style={{ background: `linear-gradient(135deg, ${colors.warning.main} 0%, ${colors.accent.main} 100%)` }}
                            />
                            <CardContent className="relative p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: colors.text.tertiary }}>
                                            This Week
                                        </p>
                                        <p className="text-3xl font-bold" style={{ color: colors.text.primary }}>
                                            {thisWeekEnquiriesCount}
                                        </p>
                                    </div>
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-full"
                                        style={{
                                            background: `linear-gradient(135deg, ${colors.warning.main} 0%, ${colors.accent.main} 100%)`,
                                        }}
                                    >
                                        <Calendar className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* With Contact Info */}
                        <Card
                            className="group relative overflow-hidden transition-all duration-300 hover:scale-105"
                            style={{
                                background: `linear-gradient(135deg, ${colors.background.card}90 0%, ${colors.background.card}70 100%)`,
                                borderColor: colors.background.border,
                                boxShadow: `0 25px 50px -12px ${colors.secondary.main}25`,
                            }}
                        >
                            <div
                                className="absolute -top-4 -right-4 h-24 w-24 rounded-full opacity-10 transition-all duration-300 group-hover:scale-110"
                                style={{ background: `linear-gradient(135deg, ${colors.secondary.main} 0%, ${colors.accent.main} 100%)` }}
                            />
                            <CardContent className="relative p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: colors.text.tertiary }}>
                                            With Contact Info
                                        </p>
                                        <p className="text-3xl font-bold" style={{ color: colors.text.primary }}>
                                            {withEmailCount + withPhoneCount}
                                        </p>
                                    </div>
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-full"
                                        style={{
                                            background: `linear-gradient(135deg, ${colors.secondary.main} 0%, ${colors.accent.main} 100%)`,
                                        }}
                                    >
                                        <User className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters and Search */}
                    <Card
                        style={{
                            background: `${colors.background.card}90`,
                            borderColor: colors.background.border,
                            boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                        }}
                    >
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex flex-1 items-center gap-4">
                                    <div className="relative max-w-md flex-1">
                                        <Search
                                            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                                            style={{ color: colors.text.tertiary }}
                                        />
                                        <Input
                                            placeholder="Search enquiries..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                            style={{
                                                borderColor: colors.background.border,
                                                background: colors.background.input,
                                                color: colors.text.primary,
                                                '--tw-ring-color': colors.primary.main,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium" style={{ color: colors.text.secondary }}>
                                            Contact:
                                        </span>
                                        <Select value={contactType} onValueChange={setContactType}>
                                            <SelectTrigger
                                                className="w-32 transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                            >
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Types</SelectItem>
                                                <SelectItem value="with_email">With Email</SelectItem>
                                                <SelectItem value="with_phone">With Phone</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium" style={{ color: colors.text.secondary }}>
                                            Date:
                                        </span>
                                        <Select value={dateRange} onValueChange={setDateRange}>
                                            <SelectTrigger
                                                className="w-32 transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                            >
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Time</SelectItem>
                                                <SelectItem value="today">Today</SelectItem>
                                                <SelectItem value="this_week">This Week</SelectItem>
                                                <SelectItem value="this_month">This Month</SelectItem>
                                                <SelectItem value="recent">Recent (7 days)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium" style={{ color: colors.text.secondary }}>
                                            Sort by:
                                        </span>
                                        <Select value={sortBy} onValueChange={setSortBy}>
                                            <SelectTrigger
                                                className="w-32 transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                            >
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="created_at">Date</SelectItem>
                                                <SelectItem value="name">Name</SelectItem>
                                                <SelectItem value="subject">Subject</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {(searchTerm || contactType !== 'all' || dateRange !== 'all' || sortBy !== 'created_at') && (
                                        <Button
                                            onClick={clearFilters}
                                            variant="outline"
                                            size="sm"
                                            className="transition-all duration-200 hover:scale-105"
                                            style={{
                                                borderColor: colors.background.border,
                                                color: colors.text.secondary,
                                            }}
                                        >
                                            <X className="mr-2 h-4 w-4" />
                                            Clear
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm" style={{ color: colors.text.tertiary }}>
                                    Showing {filteredEnquiries.length} of {totalEnquiriesCount} enquiries
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Enquiries Table */}
                    <Card
                        style={{
                            background: `${colors.background.card}90`,
                            borderColor: colors.background.border,
                            boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                        }}
                    >
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr style={{ borderBottomColor: colors.background.divider }}>
                                            <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: colors.text.secondary }}>
                                                Contact
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: colors.text.secondary }}>
                                                Subject
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: colors.text.secondary }}>
                                                Message
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: colors.text.secondary }}>
                                                Source
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: colors.text.secondary }}>
                                                Date
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: colors.text.secondary }}>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredEnquiries.map((enquiry, index) => (
                                            <tr
                                                key={enquiry.id}
                                                className="group hover:bg-opacity-50 transition-all duration-200"
                                                style={{
                                                    borderBottomColor: colors.background.divider,
                                                    background: index % 2 === 0 ? `${colors.background.card}30` : 'transparent',
                                                }}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <User className="h-4 w-4" style={{ color: colors.text.tertiary }} />
                                                            <span className="font-medium" style={{ color: colors.text.primary }}>
                                                                {enquiry.name || 'Anonymous'}
                                                            </span>
                                                        </div>
                                                        <div className="space-y-1">
                                                            {enquiry.email && (
                                                                <div className="flex items-center gap-2">
                                                                    <Mail className="h-3 w-3" style={{ color: colors.text.tertiary }} />
                                                                    <span className="text-sm" style={{ color: colors.text.secondary }}>
                                                                        {enquiry.email}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {enquiry.phone && (
                                                                <div className="flex items-center gap-2">
                                                                    <Phone className="h-3 w-3" style={{ color: colors.text.tertiary }} />
                                                                    <span className="text-sm" style={{ color: colors.text.secondary }}>
                                                                        {enquiry.phone}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-medium" style={{ color: colors.text.primary }}>
                                                        {enquiry.subject || 'No Subject'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="max-w-xs truncate text-sm" style={{ color: colors.text.tertiary }}>
                                                        {enquiry.message || 'No message'}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                        style={{
                                                            borderColor: colors.accent.main,
                                                            color: colors.accent.main,
                                                        }}
                                                    >
                                                        {enquiry.page_url ? new URL(enquiry.page_url).pathname : 'Unknown'}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm" style={{ color: colors.text.tertiary }}>
                                                        {new Date(enquiry.created_at).toLocaleDateString()}
                                                    </span>
                                                    <br />
                                                    <span className="text-xs" style={{ color: colors.text.tertiary }}>
                                                        {new Date(enquiry.created_at).toLocaleTimeString()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={`/enquiries/${enquiry.id}`}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 hover:scale-110"
                                                            style={{
                                                                background: colors.background.tertiary,
                                                                color: colors.text.secondary,
                                                            }}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                        <Link
                                                            href={`/enquiries/${enquiry.id}/edit`}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 hover:scale-110"
                                                            style={{
                                                                background: colors.background.tertiary,
                                                                color: colors.text.secondary,
                                                            }}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <Button
                                                            onClick={() => handleDelete(enquiry.id)}
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-8 w-8 p-0 transition-all duration-200 hover:scale-110"
                                                            style={{
                                                                borderColor: colors.error.main,
                                                                color: colors.error.main,
                                                            }}
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

                            {filteredEnquiries.length === 0 && (
                                <div className="py-12 text-center">
                                    <div className="mx-auto mb-4 h-16 w-16 rounded-full" style={{ background: `${colors.background.tertiary}` }}>
                                        <Search className="mx-auto h-8 w-8 py-4" style={{ color: colors.text.tertiary }} />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold" style={{ color: colors.text.primary }}>
                                        {totalEnquiriesCount === 0 ? 'No enquiries yet' : 'No enquiries found'}
                                    </h3>
                                    <p style={{ color: colors.text.tertiary }}>
                                        {totalEnquiriesCount === 0
                                            ? 'Customer enquiries will appear here when they submit contact forms.'
                                            : searchTerm || contactType !== 'all' || dateRange !== 'all'
                                              ? 'Try adjusting your search or filters.'
                                              : 'Customer enquiries will appear here when they submit contact forms.'}
                                    </p>
                                    {totalEnquiriesCount === 0 && (
                                        <div className="mt-4">
                                            <Link
                                                href="/enquiries/create"
                                                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 hover:scale-105"
                                                style={{
                                                    background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                                    color: 'white',
                                                }}
                                            >
                                                <Plus className="h-4 w-4" />
                                                Create Your First Enquiry
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}

