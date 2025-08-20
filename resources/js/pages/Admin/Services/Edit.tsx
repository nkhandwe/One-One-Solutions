import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '@/contexts/ThemeContext';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, FileText, Image, Save, Settings } from 'lucide-react';
import React from 'react';

interface Service {
    id: number;
    name: string;
    description: string;
    icon: string;
    image: string;
    is_active: boolean;
    position: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    service: Service;
}

export default function ServicesEdit({ service }: Props) {
    const { colors } = useTheme();
    const { data, setData, put, processing, errors } = useForm({
        name: service.name,
        description: service.description,
        icon: service.icon,
        image: service.image,
        is_active: service.is_active,
        position: service.position,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/services/${service.id}`);
    };

    return (
        <AdminLayout>
            <Head title={`Edit Service - ${service.name}`} />

            <div className="p-6">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/services"
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
                                Edit Service
                            </h1>
                            <p style={{ color: colors.text.tertiary }}>Update your service information and settings</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                type="submit"
                                form="service-edit-form"
                                className="shadow-lg transition-all duration-300 hover:scale-105"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                    boxShadow: `0 10px 25px -5px ${colors.primary.main}25`,
                                }}
                                disabled={processing}
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Updating...' : 'Update Service'}
                            </Button>
                        </div>
                    </div>

                    <form id="service-edit-form" onSubmit={handleSubmit} className="space-y-6">
                        {/* Main Content */}
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
                            {/* Left Column - Main Form */}
                            <div className="space-y-6 xl:col-span-3">
                                {/* Basic Information */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                            <FileText className="h-5 w-5" style={{ color: colors.primary.main }} />
                                            Service Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" style={{ color: colors.text.primary }}>
                                                Service Name *
                                            </Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Enter service name..."
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

                                        <div className="space-y-2">
                                            <Label htmlFor="description" style={{ color: colors.text.primary }}>
                                                Description
                                            </Label>
                                            <Textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                placeholder="Describe your service..."
                                                className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                                maxLength={500}
                                            />
                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                {data.description.length}/500 characters
                                            </p>
                                            {errors.description && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.description}
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Media and Icons */}
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
                                            Media & Icons
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="icon" style={{ color: colors.text.primary }}>
                                                Icon (Emoji or Symbol)
                                            </Label>
                                            <Input
                                                id="icon"
                                                value={data.icon}
                                                onChange={(e) => setData('icon', e.target.value)}
                                                placeholder="🚀 or ✨ or any symbol..."
                                                className="text-2xl transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                                maxLength={10}
                                            />
                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                Use emojis, symbols, or single characters as icons
                                            </p>
                                            {errors.icon && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.icon}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="image" style={{ color: colors.text.primary }}>
                                                Image URL
                                            </Label>
                                            <Input
                                                id="image"
                                                value={data.image}
                                                onChange={(e) => setData('image', e.target.value)}
                                                placeholder="https://example.com/image.jpg"
                                                className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                            />
                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                Optional: URL to a service image
                                            </p>
                                            {errors.image && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.image}
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
                                                    Active Service
                                                </Label>
                                            </div>
                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                Active services are visible to visitors
                                            </p>
                                            {errors.is_active && (
                                                <p className="text-sm" style={{ color: colors.error.main }}>
                                                    {errors.is_active}
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Service Statistics */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                            <FileText className="h-5 w-5" style={{ color: colors.accent.main }} />
                                            Service Statistics
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm" style={{ color: colors.text.tertiary }}>
                                                Created:
                                            </span>
                                            <span className="text-xs" style={{ color: colors.text.secondary }}>
                                                {new Date(service.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm" style={{ color: colors.text.tertiary }}>
                                                Last Updated:
                                            </span>
                                            <span className="text-xs" style={{ color: colors.text.secondary }}>
                                                {new Date(service.updated_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm" style={{ color: colors.text.tertiary }}>
                                                Current Position:
                                            </span>
                                            <span className="font-semibold" style={{ color: colors.text.primary }}>
                                                {service.position}
                                            </span>
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
                                        {data.name ? (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    {data.image ? (
                                                        <img src={data.image} alt={data.name} className="h-16 w-16 rounded-lg object-cover" />
                                                    ) : (
                                                        <div
                                                            className="flex h-16 w-16 items-center justify-center rounded-lg text-3xl"
                                                            style={{
                                                                background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                                            }}
                                                        >
                                                            {data.icon || data.name.charAt(0)}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <h3 className="font-semibold" style={{ color: colors.text.primary }}>
                                                            {data.name}
                                                        </h3>
                                                        <p className="text-sm" style={{ color: colors.text.tertiary }}>
                                                            Position: {data.position}
                                                        </p>
                                                    </div>
                                                </div>

                                                {data.description && (
                                                    <p className="text-sm" style={{ color: colors.text.secondary }}>
                                                        {data.description}
                                                    </p>
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
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="py-8 text-center" style={{ color: colors.text.tertiary }}>
                                                Start typing to see a preview of your service...
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
