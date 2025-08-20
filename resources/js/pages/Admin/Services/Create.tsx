import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Hash, Image, Save, Settings, ToggleLeft, ToggleRight } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
    nextPosition: number;
}

export default function ServiceCreate({ nextPosition }: Props) {
    const [formData, setFormData] = useState({
        name: '',
        short_description: '',
        description: '',
        icon: '',
        image: '',
        is_active: true,
        position: nextPosition,
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/services', formData);
    };

    return (
        <AdminLayout>
            <Head title="Create Service" />

            <div className="p-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/services"
                                className="rounded-lg border border-white/20 bg-white/70 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-white/90"
                            >
                                <ArrowLeft className="h-5 w-5 text-neutral-900" />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-neutral-900">Create Service</h1>
                                <p className="text-neutral-600">Create a new service for your business</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                type="submit"
                                form="service-form"
                                className="from-primary-600 to-primary-light hover:from-primary-dark hover:to-primary-600 border-0 bg-gradient-to-r"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                Save Service
                            </Button>
                        </div>
                    </div>

                    <form id="service-form" onSubmit={handleSubmit} className="space-y-6">
                        {/* Main Content */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* Left Column - Main Form */}
                            <div className="space-y-6 lg:col-span-2">
                                {/* Service Details */}
                                <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-neutral-900">
                                            <Settings className="text-primary-600 h-5 w-5" />
                                            Service Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-neutral-700">
                                                Service Name *
                                            </Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                placeholder="Enter service name..."
                                                className="focus:border-primary-600 border-neutral-200 bg-white/70 backdrop-blur-sm"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="short_description" className="text-neutral-700">
                                                Short Description
                                            </Label>
                                            <Textarea
                                                id="short_description"
                                                value={formData.short_description}
                                                onChange={(e) => handleInputChange('short_description', e.target.value)}
                                                placeholder="Brief summary of the service..."
                                                className="focus:border-primary-600 min-h-[100px] border-neutral-200 bg-white/70 backdrop-blur-sm"
                                                maxLength={500}
                                            />
                                            <p className="text-xs text-neutral-500">{formData.short_description.length}/500 characters</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description" className="text-neutral-700">
                                                Detailed Description *
                                            </Label>
                                            <Textarea
                                                id="description"
                                                value={formData.description}
                                                onChange={(e) => handleInputChange('description', e.target.value)}
                                                placeholder="Detailed description of the service..."
                                                className="focus:border-primary-600 min-h-[300px] border-neutral-200 bg-white/70 backdrop-blur-sm"
                                                required
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Sidebar */}
                            <div className="space-y-6">
                                {/* Status Settings */}
                                <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-neutral-900">
                                            {formData.is_active ? (
                                                <ToggleRight className="h-5 w-5 text-green-600" />
                                            ) : (
                                                <ToggleLeft className="h-5 w-5 text-orange-600" />
                                            )}
                                            Status Settings
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="is_active"
                                                checked={formData.is_active}
                                                onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                                            />
                                            <Label htmlFor="is_active" className="text-neutral-700">
                                                Active service
                                            </Label>
                                        </div>
                                        {formData.is_active ? (
                                            <p className="text-sm text-green-600">This service will be visible on your website.</p>
                                        ) : (
                                            <p className="text-sm text-orange-600">This service will be hidden from your website.</p>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Position */}
                                <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-neutral-900">
                                            <Hash className="text-secondary-600 h-5 w-5" />
                                            Display Position
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={formData.position}
                                            onChange={(e) => handleInputChange('position', parseInt(e.target.value) || 1)}
                                            className="focus:border-secondary-600 border-neutral-200 bg-white/70 backdrop-blur-sm"
                                        />
                                        <p className="mt-1 text-xs text-neutral-500">Controls the order in which this service appears</p>
                                    </CardContent>
                                </Card>

                                {/* Icon */}
                                <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-neutral-900">
                                            <Settings className="text-accent-600 h-5 w-5" />
                                            Icon
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Input
                                            value={formData.icon}
                                            onChange={(e) => handleInputChange('icon', e.target.value)}
                                            placeholder="Icon class or emoji..."
                                            className="focus:border-accent-600 border-neutral-200 bg-white/70 backdrop-blur-sm"
                                        />
                                        <p className="mt-1 text-xs text-neutral-500">Icon class (e.g., fa-home) or emoji</p>
                                    </CardContent>
                                </Card>

                                {/* Image */}
                                <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-neutral-900">
                                            <Image className="h-5 w-5 text-purple-600" />
                                            Service Image
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Input
                                            value={formData.image}
                                            onChange={(e) => handleInputChange('image', e.target.value)}
                                            placeholder="Image URL or path..."
                                            className="border-neutral-200 bg-white/70 backdrop-blur-sm focus:border-purple-600"
                                        />
                                        <p className="mt-1 text-xs text-neutral-500">Featured image for this service</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Preview Card */}
                        <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-neutral-900">Preview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {formData.name ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            {formData.icon && (
                                                <div className="bg-primary-50 flex h-12 w-12 items-center justify-center rounded-lg">
                                                    <span className="text-lg">{formData.icon}</span>
                                                </div>
                                            )}
                                            <div>
                                                <h2 className="text-2xl font-bold text-neutral-900">{formData.name}</h2>
                                                <div className="flex items-center gap-2 text-sm text-neutral-500">
                                                    <Hash className="h-3 w-3" />
                                                    <span>Position {formData.position}</span>
                                                    <span className="mx-2">•</span>
                                                    <span className={formData.is_active ? 'text-green-600' : 'text-orange-600'}>
                                                        {formData.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {formData.short_description && <p className="text-neutral-600 italic">"{formData.short_description}"</p>}
                                        {formData.description && (
                                            <div className="rounded-lg bg-neutral-50 p-4">
                                                <p className="text-sm text-neutral-600">{formData.description.substring(0, 200)}...</p>
                                            </div>
                                        )}
                                        {formData.image && (
                                            <div className="text-sm text-neutral-500">
                                                <Image className="mr-1 inline h-4 w-4" />
                                                Image: {formData.image}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="py-8 text-center text-neutral-500">Start typing to see a preview of your service...</p>
                                )}
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
