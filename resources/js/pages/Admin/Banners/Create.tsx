import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '@/contexts/ThemeContext';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ExternalLink, Image, Save, Settings, Type } from 'lucide-react';
import React from 'react';

export default function BannersCreate() {
    const { colors } = useTheme();
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subtitle: '',
        image: '',
        link: '',
        button_text: '',
        is_active: true,
        position: 1,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/banners');
    };

    return (
        <AdminLayout>
            <Head title="Create New Banner" />

            <div className="p-6">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/banners"
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
                                Create New Banner
                            </h1>
                            <p style={{ color: colors.text.tertiary }}>Add a new banner to your website</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                type="submit"
                                form="banner-create-form"
                                className="shadow-lg transition-all duration-300 hover:scale-105"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                    boxShadow: `0 10px 25px -5px ${colors.primary.main}25`,
                                }}
                                disabled={processing}
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Creating...' : 'Create Banner'}
                            </Button>
                        </div>
                    </div>

                    <form id="banner-create-form" onSubmit={handleSubmit} className="space-y-6">
                        {/* Main Content */}
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
                            {/* Left Column - Main Form */}
                            <div className="space-y-6 xl:col-span-3">
                                {/* Banner Content */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                            <Type className="h-5 w-5" style={{ color: colors.primary.main }} />
                                            Banner Content
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="title" style={{ color: colors.text.primary }}>
                                                Banner Title *
                                            </Label>
                                            <Input
                                                id="title"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                placeholder="Enter banner title..."
                                                className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                                required
                                            />
                                            {errors.title && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.title}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subtitle" style={{ color: colors.text.primary }}>
                                                Subtitle
                                            </Label>
                                            <Textarea
                                                id="subtitle"
                                                value={data.subtitle}
                                                onChange={(e) => setData('subtitle', e.target.value)}
                                                placeholder="Enter banner subtitle or tagline..."
                                                className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                                maxLength={500}
                                            />
                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                {data.subtitle.length}/500 characters
                                            </p>
                                            {errors.subtitle && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.subtitle}
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Banner Image */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                            <Image className="h-5 w-5" style={{ color: colors.secondary.main }} />
                                            Banner Image
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ImageUpload value={data.image} onChange={(url) => setData('image', url)} height="300px" />
                                        {errors.image && (
                                            <p className="mt-2 text-sm" style={{ color: colors.error.main }}>
                                                {errors.image}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Call to Action */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                            <ExternalLink className="h-5 w-5" style={{ color: colors.accent.main }} />
                                            Call to Action
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="link" style={{ color: colors.text.primary }}>
                                                Link URL
                                            </Label>
                                            <Input
                                                id="link"
                                                value={data.link}
                                                onChange={(e) => setData('link', e.target.value)}
                                                placeholder="https://example.com or /page"
                                                className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                            />
                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                Optional: Where should the banner link to when clicked?
                                            </p>
                                            {errors.link && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.link}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="button_text" style={{ color: colors.text.primary }}>
                                                Button Text
                                            </Label>
                                            <Input
                                                id="button_text"
                                                value={data.button_text}
                                                onChange={(e) => setData('button_text', e.target.value)}
                                                placeholder="Learn More, Get Started, etc."
                                                className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                                maxLength={100}
                                            />
                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                Optional: Text for the call-to-action button
                                            </p>
                                            {errors.button_text && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.button_text}
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Sidebar */}
                            <div className="space-y-6 xl:col-span-1">
                                {/* Settings */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                            <Settings className="h-5 w-5" style={{ color: colors.accent.main }} />
                                            Settings
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="position" style={{ color: colors.text.primary }}>
                                                Display Position
                                            </Label>
                                            <Input
                                                id="position"
                                                type="number"
                                                value={data.position}
                                                onChange={(e) => setData('position', parseInt(e.target.value) || 1)}
                                                min="1"
                                                className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                            />
                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                Lower numbers appear first
                                            </p>
                                            {errors.position && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.position}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="is_active"
                                                    checked={data.is_active}
                                                    onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                                                />
                                                <Label htmlFor="is_active" style={{ color: colors.text.primary }}>
                                                    Active Banner
                                                </Label>
                                            </div>
                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                Active banners are visible on your website
                                            </p>
                                            {errors.is_active && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.is_active}
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
                                        {data.title ? (
                                            <div className="space-y-4">
                                                {data.image && (
                                                    <div className="overflow-hidden rounded-lg">
                                                        <img src={data.image} alt={data.title} className="h-32 w-full object-cover" />
                                                    </div>
                                                )}

                                                <div className="space-y-2">
                                                    <h3 className="font-semibold" style={{ color: colors.text.primary }}>
                                                        {data.title}
                                                    </h3>
                                                    {data.subtitle && (
                                                        <p className="text-sm" style={{ color: colors.text.secondary }}>
                                                            {data.subtitle}
                                                        </p>
                                                    )}
                                                </div>

                                                {(data.link || data.button_text) && (
                                                    <div className="space-y-2">
                                                        {data.link && (
                                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                                Link: {data.link}
                                                            </p>
                                                        )}
                                                        {data.button_text && (
                                                            <Badge
                                                                variant="outline"
                                                                style={{
                                                                    borderColor: colors.accent.main,
                                                                    color: colors.accent.main,
                                                                }}
                                                            >
                                                                {data.button_text}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="border-t pt-4" style={{ borderColor: colors.background.divider }}>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm" style={{ color: colors.text.tertiary }}>
                                                            Status:
                                                        </span>
                                                        <Badge
                                                            variant="outline"
                                                            style={{
                                                                borderColor: data.is_active ? colors.success.main : colors.warning.main,
                                                                color: data.is_active ? colors.success.main : colors.warning.main,
                                                                background: data.is_active ? `${colors.success.main}15` : `${colors.warning.main}15`,
                                                            }}
                                                        >
                                                            {data.is_active ? 'Active' : 'Inactive'}
                                                        </Badge>
                                                    </div>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <span className="text-sm" style={{ color: colors.text.tertiary }}>
                                                            Position:
                                                        </span>
                                                        <span className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                                                            {data.position}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="py-8 text-center" style={{ color: colors.text.tertiary }}>
                                                Start typing to see a preview of your banner...
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

