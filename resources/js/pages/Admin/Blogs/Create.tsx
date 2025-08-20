import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Eye, EyeOff, FileText, Image, Plus, Save, Tag, User, X } from 'lucide-react';
import React, { useState } from 'react';

export default function BlogCreate() {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        author: '',
        tags: [] as string[],
        is_published: false,
    });

    const [newTag, setNewTag] = useState('');

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()],
            }));
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/blogs', formData);
    };

    return (
        <AdminLayout>
            <Head title="Create Blog Post" />

            <div className="p-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/blogs"
                                className="rounded-lg border border-white/20 bg-white/70 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-white/90"
                            >
                                <ArrowLeft className="h-5 w-5 text-neutral-900" />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-neutral-900">Create Blog Post</h1>
                                <p className="text-neutral-600">Write and publish a new blog post</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                type="submit"
                                form="blog-form"
                                className="from-primary-600 to-primary-light hover:from-primary-dark hover:to-primary-600 border-0 bg-gradient-to-r"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                Save Blog Post
                            </Button>
                        </div>
                    </div>

                    <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
                        {/* Main Content */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* Left Column - Main Form */}
                            <div className="space-y-6 lg:col-span-2">
                                {/* Title */}
                                <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-neutral-900">
                                            <FileText className="text-primary-600 h-5 w-5" />
                                            Blog Post Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title" className="text-neutral-700">
                                                Title *
                                            </Label>
                                            <Input
                                                id="title"
                                                value={formData.title}
                                                onChange={(e) => handleInputChange('title', e.target.value)}
                                                placeholder="Enter blog post title..."
                                                className="focus:border-primary-600 border-neutral-200 bg-white/70 backdrop-blur-sm"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="excerpt" className="text-neutral-700">
                                                Excerpt
                                            </Label>
                                            <Textarea
                                                id="excerpt"
                                                value={formData.excerpt}
                                                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                                                placeholder="Brief summary of the blog post..."
                                                className="focus:border-primary-600 min-h-[100px] border-neutral-200 bg-white/70 backdrop-blur-sm"
                                                maxLength={500}
                                            />
                                            <p className="text-xs text-neutral-500">{formData.excerpt.length}/500 characters</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="content" className="text-neutral-700">
                                                Content *
                                            </Label>
                                            <Textarea
                                                id="content"
                                                value={formData.content}
                                                onChange={(e) => handleInputChange('content', e.target.value)}
                                                placeholder="Write your blog post content here..."
                                                className="focus:border-primary-600 min-h-[300px] border-neutral-200 bg-white/70 backdrop-blur-sm"
                                                required
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Sidebar */}
                            <div className="space-y-6">
                                {/* Publish Settings */}
                                <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-neutral-900">
                                            {formData.is_published ? (
                                                <Eye className="h-5 w-5 text-green-600" />
                                            ) : (
                                                <EyeOff className="h-5 w-5 text-orange-600" />
                                            )}
                                            Publish Settings
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="is_published"
                                                checked={formData.is_published}
                                                onCheckedChange={(checked) => handleInputChange('is_published', checked)}
                                            />
                                            <Label htmlFor="is_published" className="text-neutral-700">
                                                Publish immediately
                                            </Label>
                                        </div>
                                        {formData.is_published && (
                                            <p className="text-sm text-green-600">This post will be published immediately when saved.</p>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Author */}
                                <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-neutral-900">
                                            <User className="text-secondary-600 h-5 w-5" />
                                            Author
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Input
                                            value={formData.author}
                                            onChange={(e) => handleInputChange('author', e.target.value)}
                                            placeholder="Author name..."
                                            className="focus:border-secondary-600 border-neutral-200 bg-white/70 backdrop-blur-sm"
                                        />
                                    </CardContent>
                                </Card>

                                {/* Featured Image */}
                                <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-neutral-900">
                                            <Image className="text-accent-600 h-5 w-5" />
                                            Featured Image
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Input
                                            value={formData.image}
                                            onChange={(e) => handleInputChange('image', e.target.value)}
                                            placeholder="Image URL or path..."
                                            className="focus:border-accent-600 border-neutral-200 bg-white/70 backdrop-blur-sm"
                                        />
                                    </CardContent>
                                </Card>

                                {/* Tags */}
                                <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-neutral-900">
                                            <Tag className="h-5 w-5 text-purple-600" />
                                            Tags
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex gap-2">
                                            <Input
                                                value={newTag}
                                                onChange={(e) => setNewTag(e.target.value)}
                                                placeholder="Add a tag..."
                                                className="border-neutral-200 bg-white/70 backdrop-blur-sm focus:border-purple-600"
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                            />
                                            <Button
                                                type="button"
                                                onClick={addTag}
                                                size="sm"
                                                className="border-0 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {formData.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {formData.tags.map((tag, index) => (
                                                    <Badge key={index} variant="outline" className="border-purple-200 bg-purple-50 text-purple-700">
                                                        {tag}
                                                        <button type="button" onClick={() => removeTag(tag)} className="ml-2 hover:text-purple-900">
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
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
                                {formData.title ? (
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-bold text-neutral-900">{formData.title}</h2>
                                        {formData.excerpt && <p className="text-neutral-600 italic">"{formData.excerpt}"</p>}
                                        {formData.author && <p className="text-sm text-neutral-500">By {formData.author}</p>}
                                        {formData.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {formData.tags.map((tag, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                        <div className="border-t border-neutral-200 pt-4">
                                            <p className="text-sm text-neutral-500">
                                                Status: {formData.is_published ? 'Will be published' : 'Draft'}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="py-8 text-center text-neutral-500">Start typing to see a preview of your blog post...</p>
                                )}
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
