import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { WYSIWYGEditor } from '@/components/ui/wysiwyg-editor';
import { useTheme } from '@/contexts/ThemeContext';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Eye, EyeOff, FileText, Folder, Globe, Image, Plus, Save, Tag, User, X } from 'lucide-react';
import React, { useState } from 'react';

interface Category {
    id: number;
    name: string;
    color: string;
    icon?: string;
}

interface Props {
    categories: Category[];
}

export default function BlogCreate({ categories }: Props) {
    const { colors } = useTheme();
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        meta_description: '',
        meta_keywords: [] as string[],
        content: '',
        featured_image: '',
        image: '',
        author: '',
        category_id: '',
        tags: [] as string[],
        is_published: false,
    });

    const [newTag, setNewTag] = useState('');
    const [newKeyword, setNewKeyword] = useState('');

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

    const addKeyword = () => {
        if (newKeyword.trim() && !formData.meta_keywords.includes(newKeyword.trim())) {
            setFormData((prev) => ({
                ...prev,
                meta_keywords: [...prev.meta_keywords, newKeyword.trim()],
            }));
            setNewKeyword('');
        }
    };

    const removeKeyword = (keywordToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            meta_keywords: prev.meta_keywords.filter((keyword) => keyword !== keywordToRemove),
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
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/blogs"
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
                                Create Blog Post
                            </h1>
                            <p style={{ color: colors.text.tertiary }}>Write and publish a new blog post with rich content</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                type="submit"
                                form="blog-form"
                                className="shadow-lg transition-all duration-300 hover:scale-105"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                    boxShadow: `0 10px 25px -5px ${colors.primary.main}25`,
                                }}
                            >
                                <Save className="mr-2 h-4 w-4" />
                                Save Blog Post
                            </Button>
                        </div>
                    </div>

                    <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
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
                                            Blog Post Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="title" style={{ color: colors.text.primary }}>
                                                Title *
                                            </Label>
                                            <Input
                                                id="title"
                                                value={formData.title}
                                                onChange={(e) => handleInputChange('title', e.target.value)}
                                                placeholder="Enter blog post title..."
                                                className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="excerpt" style={{ color: colors.text.primary }}>
                                                Excerpt
                                            </Label>
                                            <Textarea
                                                id="excerpt"
                                                value={formData.excerpt}
                                                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                                                placeholder="Brief summary of the blog post..."
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
                                                {formData.excerpt.length}/500 characters
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="meta_description" style={{ color: colors.text.primary }}>
                                                Meta Description (SEO)
                                            </Label>
                                            <Textarea
                                                id="meta_description"
                                                value={formData.meta_description}
                                                onChange={(e) => handleInputChange('meta_description', e.target.value)}
                                                placeholder="SEO meta description..."
                                                className="min-h-[80px] transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                                maxLength={160}
                                            />
                                            <p className="text-xs" style={{ color: colors.text.tertiary }}>
                                                {formData.meta_description.length}/160 characters
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Content Editor */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                            <FileText className="h-5 w-5" style={{ color: colors.secondary.main }} />
                                            Content Editor
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <WYSIWYGEditor
                                            value={formData.content}
                                            onChange={(content) => handleInputChange('content', content)}
                                            placeholder="Write your blog post content here..."
                                            height="400px"
                                        />
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Sidebar */}
                            <div className="space-y-6 xl:col-span-1">
                                {/* Publish Settings */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                            {formData.is_published ? (
                                                <Eye className="h-5 w-5" style={{ color: colors.success.main }} />
                                            ) : (
                                                <EyeOff className="h-5 w-5" style={{ color: colors.warning.main }} />
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
                                            <Label htmlFor="is_published" style={{ color: colors.text.primary }}>
                                                Publish immediately
                                            </Label>
                                        </div>
                                        {formData.is_published && (
                                            <p className="text-sm" style={{ color: colors.success.main }}>
                                                This post will be published immediately when saved.
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Category */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                            <Folder className="h-5 w-5" style={{ color: colors.secondary.main }} />
                                            Category
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
                                            <SelectTrigger
                                                className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                            >
                                                <SelectValue placeholder="Select a category..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">No Category</SelectItem>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                                                            {category.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </CardContent>
                                </Card>

                                {/* Author */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                            <User className="h-5 w-5" style={{ color: colors.accent.main }} />
                                            Author
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Input
                                            value={formData.author}
                                            onChange={(e) => handleInputChange('author', e.target.value)}
                                            placeholder="Author name..."
                                            className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                            style={{
                                                borderColor: colors.background.border,
                                                background: colors.background.input,
                                                color: colors.text.primary,
                                                '--tw-ring-color': colors.primary.main,
                                            }}
                                        />
                                    </CardContent>
                                </Card>

                                {/* Featured Image */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                            <Image className="h-5 w-5" style={{ color: colors.success.main }} />
                                            Featured Image
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ImageUpload
                                            value={formData.featured_image}
                                            onChange={(url) => handleInputChange('featured_image', url)}
                                            height="200px"
                                        />
                                        <div className="mt-4 space-y-2">
                                            <Label style={{ color: colors.text.primary }}>Or enter image URL:</Label>
                                            <Input
                                                value={formData.image}
                                                onChange={(e) => handleInputChange('image', e.target.value)}
                                                placeholder="Image URL or path..."
                                                className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Tags */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                            <Tag className="h-5 w-5" style={{ color: colors.accent.main }} />
                                            Tags
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex gap-2">
                                            <Input
                                                value={newTag}
                                                onChange={(e) => setNewTag(e.target.value)}
                                                placeholder="Add a tag..."
                                                className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                            />
                                            <Button
                                                type="button"
                                                onClick={addTag}
                                                size="sm"
                                                className="shadow-lg transition-all duration-300 hover:scale-105"
                                                style={{
                                                    background: `linear-gradient(135deg, ${colors.accent.main} 0%, ${colors.secondary.main} 100%)`,
                                                }}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {formData.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {formData.tags.map((tag, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="outline"
                                                        className="transition-all duration-300"
                                                        style={{
                                                            borderColor: colors.accent.main,
                                                            background: `${colors.accent.main}15`,
                                                            color: colors.accent.main,
                                                        }}
                                                    >
                                                        {tag}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTag(tag)}
                                                            className="ml-2 transition-colors hover:opacity-70"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* SEO Keywords */}
                                <Card
                                    style={{
                                        background: `${colors.background.card}90`,
                                        borderColor: colors.background.border,
                                        boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2" style={{ color: colors.text.primary }}>
                                            <Globe className="h-5 w-5" style={{ color: colors.warning.main }} />
                                            SEO Keywords
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex gap-2">
                                            <Input
                                                value={newKeyword}
                                                onChange={(e) => setNewKeyword(e.target.value)}
                                                placeholder="Add SEO keyword..."
                                                className="transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                                            />
                                            <Button
                                                type="button"
                                                onClick={addKeyword}
                                                size="sm"
                                                className="shadow-lg transition-all duration-300 hover:scale-105"
                                                style={{
                                                    background: `linear-gradient(135deg, ${colors.warning.main} 0%, ${colors.accent.main} 100%)`,
                                                }}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {formData.meta_keywords.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {formData.meta_keywords.map((keyword, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="outline"
                                                        className="transition-all duration-300"
                                                        style={{
                                                            borderColor: colors.warning.main,
                                                            background: `${colors.warning.main}15`,
                                                            color: colors.warning.main,
                                                        }}
                                                    >
                                                        {keyword}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeKeyword(keyword)}
                                                            className="ml-2 transition-colors hover:opacity-70"
                                                        >
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
                                {formData.title ? (
                                    <div className="space-y-4">
                                        {(formData.featured_image || formData.image) && (
                                            <div className="overflow-hidden rounded-lg">
                                                <img
                                                    src={formData.featured_image || formData.image}
                                                    alt={formData.title}
                                                    className="h-48 w-full object-cover"
                                                />
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            {formData.category_id &&
                                                formData.category_id !== 'none' &&
                                                categories.find((c) => c.id.toString() === formData.category_id) && (
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="h-3 w-3 rounded-full"
                                                            style={{
                                                                backgroundColor: categories.find((c) => c.id.toString() === formData.category_id)
                                                                    ?.color,
                                                            }}
                                                        ></div>
                                                        <span className="text-sm font-medium" style={{ color: colors.text.secondary }}>
                                                            {categories.find((c) => c.id.toString() === formData.category_id)?.name}
                                                        </span>
                                                    </div>
                                                )}
                                            <h2 className="text-2xl font-bold" style={{ color: colors.text.primary }}>
                                                {formData.title}
                                            </h2>
                                        </div>

                                        {formData.excerpt && (
                                            <p className="italic" style={{ color: colors.text.secondary }}>
                                                "{formData.excerpt}"
                                            </p>
                                        )}

                                        {formData.author && (
                                            <p className="text-sm" style={{ color: colors.text.tertiary }}>
                                                By {formData.author}
                                            </p>
                                        )}

                                        {formData.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {formData.tags.map((tag, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="outline"
                                                        className="text-xs"
                                                        style={{
                                                            borderColor: colors.accent.main,
                                                            color: colors.accent.main,
                                                        }}
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}

                                        <div className="border-t pt-4" style={{ borderColor: colors.background.divider }}>
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm" style={{ color: colors.text.tertiary }}>
                                                    Status: {formData.is_published ? 'Will be published' : 'Draft'}
                                                </p>
                                                <Badge
                                                    variant="outline"
                                                    style={{
                                                        borderColor: formData.is_published ? colors.success.main : colors.warning.main,
                                                        color: formData.is_published ? colors.success.main : colors.warning.main,
                                                        background: formData.is_published ? `${colors.success.main}15` : `${colors.warning.main}15`,
                                                    }}
                                                >
                                                    {formData.is_published ? 'Published' : 'Draft'}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="py-8 text-center" style={{ color: colors.text.tertiary }}>
                                        Start typing to see a preview of your blog post...
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
