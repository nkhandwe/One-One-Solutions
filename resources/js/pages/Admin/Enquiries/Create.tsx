import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '@/contexts/ThemeContext';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Mail, MessageSquare, Phone, Save, User } from 'lucide-react';
import React from 'react';

export default function EnquiriesCreate() {
    const { colors } = useTheme();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        ip_address: '',
        user_agent: '',
        page_url: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/enquiries');
    };

    return (
        <AdminLayout>
            <Head title="Create New Enquiry" />

            <div className="p-6">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/enquiries"
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
                                Create New Enquiry
                            </h1>
                            <p style={{ color: colors.text.tertiary }}>Add a new customer enquiry manually</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                type="submit"
                                form="enquiry-create-form"
                                className="shadow-lg transition-all duration-300 hover:scale-105"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                    boxShadow: `0 10px 25px -5px ${colors.primary.main}25`,
                                }}
                                disabled={processing}
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Creating...' : 'Create Enquiry'}
                            </Button>
                        </div>
                    </div>

                    <form id="enquiry-create-form" onSubmit={handleSubmit} className="space-y-6">
                        {/* Main Content */}
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
                            {/* Left Column - Main Form */}
                            <div className="space-y-6 xl:col-span-3">
                                {/* Contact Information */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                            <User className="h-5 w-5" style={{ color: colors.primary.main }} />
                                            Contact Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" style={{ color: colors.text.primary }}>
                                                    Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder="Enter contact name..."
                                                    className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                    style={{
                                                        borderColor: colors.background.border,
                                                        background: colors.background.input,
                                                        color: colors.text.primary,
                                                        '--tw-ring-color': colors.primary.main,
                                                    }}
                                                />
                                                {errors.name && (
                                                    <p className="text-sm" style={{ color: colors.error.main }}>
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email" style={{ color: colors.text.primary }}>
                                                    Email
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder="Enter email address..."
                                                    className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                    style={{
                                                        borderColor: colors.background.border,
                                                        background: colors.background.input,
                                                        color: colors.text.primary,
                                                        '--tw-ring-color': colors.primary.main,
                                                    }}
                                                />
                                                {errors.email && (
                                                    <p className="text-sm" style={{ color: colors.error.main }}>
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone" style={{ color: colors.text.primary }}>
                                                Phone Number
                                            </Label>
                                            <Input
                                                id="phone"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                placeholder="Enter phone number..."
                                                className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                            />
                                            {errors.phone && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Enquiry Details */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                            <MessageSquare className="h-5 w-5" style={{ color: colors.secondary.main }} />
                                            Enquiry Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="subject" style={{ color: colors.text.primary }}>
                                                Subject
                                            </Label>
                                            <Input
                                                id="subject"
                                                value={data.subject}
                                                onChange={(e) => setData('subject', e.target.value)}
                                                placeholder="Enter enquiry subject..."
                                                className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                            />
                                            {errors.subject && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.subject}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message" style={{ color: colors.text.primary }}>
                                                Message *
                                            </Label>
                                            <Textarea
                                                id="message"
                                                value={data.message}
                                                onChange={(e) => setData('message', e.target.value)}
                                                placeholder="Enter enquiry message..."
                                                className="min-h-[200px] transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                                maxLength={5000}
                                                required
                                            />
                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                {data.message.length}/5000 characters
                                            </p>
                                            {errors.message && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.message}
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Sidebar */}
                            <div className="space-y-6 xl:col-span-1">
                                {/* Technical Information */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                            <MessageSquare className="h-5 w-5" style={{ color: colors.accent.main }} />
                                            Technical Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="ip_address" style={{ color: colors.text.primary }}>
                                                IP Address
                                            </Label>
                                            <Input
                                                id="ip_address"
                                                value={data.ip_address}
                                                onChange={(e) => setData('ip_address', e.target.value)}
                                                placeholder="127.0.0.1"
                                                className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                            />
                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                Optional: Visitor's IP address
                                            </p>
                                            {errors.ip_address && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.ip_address}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="page_url" style={{ color: colors.text.primary }}>
                                                Page URL
                                            </Label>
                                            <Input
                                                id="page_url"
                                                value={data.page_url}
                                                onChange={(e) => setData('page_url', e.target.value)}
                                                placeholder="https://example.com/contact"
                                                className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                            />
                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                Optional: Page where enquiry was submitted
                                            </p>
                                            {errors.page_url && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.page_url}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="user_agent" style={{ color: colors.text.primary }}>
                                                User Agent
                                            </Label>
                                            <Textarea
                                                id="user_agent"
                                                value={data.user_agent}
                                                onChange={(e) => setData('user_agent', e.target.value)}
                                                placeholder="Browser user agent string..."
                                                className="min-h-[80px] transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                                maxLength={500}
                                            />
                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                Optional: Browser information
                                            </p>
                                            {errors.user_agent && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.user_agent}
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Preview */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle style={{ color: colors.text.primary }}>Preview</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {data.message ? (
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <h3 className="font-semibold" style={{ color: colors.text.primary }}>
                                                        {data.subject || 'No Subject'}
                                                    </h3>
                                                    <p className="text-sm" style={{ color: colors.text.secondary }}>
                                                        {data.message}
                                                    </p>
                                                </div>

                                                {(data.name || data.email || data.phone) && (
                                                    <div className="space-y-2">
                                                        <h4 className="text-sm font-medium" style={{ color: colors.text.primary }}>
                                                            Contact Information:
                                                        </h4>
                                                        {data.name && (
                                                            <p className="text-xs" style={{ color: colors.text.secondary }}>
                                                                <User className="mr-1 inline h-3 w-3" />
                                                                {data.name}
                                                            </p>
                                                        )}
                                                        {data.email && (
                                                            <p className="text-xs" style={{ color: colors.text.secondary }}>
                                                                <Mail className="mr-1 inline h-3 w-3" />
                                                                {data.email}
                                                            </p>
                                                        )}
                                                        {data.phone && (
                                                            <p className="text-xs" style={{ color: colors.text.secondary }}>
                                                                <Phone className="mr-1 inline h-3 w-3" />
                                                                {data.phone}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="border-t pt-4" style={{ borderColor: colors.background.divider }}>
                                                    <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                        Message length: {data.message.length} characters
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="py-8 text-center" style={{ color: colors.text.tertiary }}>
                                                Start typing to see a preview of your enquiry...
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

