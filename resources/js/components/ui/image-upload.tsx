import { useTheme } from '@/contexts/ThemeContext';
import { router } from '@inertiajs/react';
import { Upload, X, Image as ImageIcon, Eye } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './button';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove?: () => void;
    className?: string;
    height?: string;
    accept?: string;
    maxSize?: number;
    disabled?: boolean;
}

export function ImageUpload({
    value,
    onChange,
    onRemove,
    className = '',
    height = '200px',
    accept = 'image/*',
    maxSize = 5 * 1024 * 1024, // 5MB
    disabled = false,
}: ImageUploadProps) {
    const { colors } = useTheme();
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(value || null);

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            if (acceptedFiles.length === 0) return;

            const file = acceptedFiles[0];
            setUploading(true);

            try {
                // Create preview
                const objectUrl = URL.createObjectURL(file);
                setPreview(objectUrl);

                // Create FormData for upload
                const formData = new FormData();
                formData.append('image', file);

                // Upload file using Inertia
                router.post('/upload/image', formData, {
                    onSuccess: (page: any) => {
                        // Assuming the response contains the image URL
                        const imageUrl = page.props?.imageUrl || objectUrl;
                        onChange(imageUrl);
                        setPreview(imageUrl);
                    },
                    onError: (errors) => {
                        console.error('Upload failed:', errors);
                        setPreview(null);
                        // For now, use the object URL as fallback
                        onChange(objectUrl);
                        setPreview(objectUrl);
                    },
                    onFinish: () => {
                        setUploading(false);
                    },
                });
            } catch (error) {
                console.error('Upload error:', error);
                setUploading(false);
                setPreview(null);
            }
        },
        [onChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { [accept]: [] },
        maxSize,
        maxFiles: 1,
        disabled: disabled || uploading,
    });

    const handleRemove = () => {
        setPreview(null);
        if (onRemove) {
            onRemove();
        } else {
            onChange('');
        }
    };

    const handlePreview = () => {
        if (preview) {
            window.open(preview, '_blank');
        }
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {preview ? (
                <div
                    className="group relative overflow-hidden rounded-lg border"
                    style={{
                        borderColor: colors.background.border,
                        height,
                    }}
                >
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                    />

                    {/* Overlay with actions */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handlePreview}
                                className="bg-white/90 text-black hover:bg-white"
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleRemove}
                                className="bg-white/90 text-red-600 hover:bg-white hover:text-red-700"
                                disabled={disabled || uploading}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {uploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <div className="flex items-center gap-2 text-white">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                <span className="text-sm">Uploading...</span>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={`
                        group relative cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-all duration-300
                        ${isDragActive
                            ? 'border-primary-500 bg-primary-50'
                            : 'hover:border-primary-400 hover:bg-primary-25'
                        }
                        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
                    `}
                    style={{
                        borderColor: isDragActive ? colors.primary.main : colors.background.border,
                        backgroundColor: isDragActive ? `${colors.primary.main}10` : 'transparent',
                        height,
                    }}
                >
                    <input {...getInputProps()} />

                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div
                            className="rounded-full p-4"
                            style={{
                                background: `${colors.primary.main}15`,
                            }}
                        >
                            {uploading ? (
                                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
                            ) : (
                                <Upload
                                    className="h-8 w-8"
                                    style={{ color: colors.primary.main }}
                                />
                            )}
                        </div>

                        <div className="space-y-2">
                            <p className="text-lg font-medium" style={{ color: colors.text.primary }}>
                                {uploading ? 'Uploading...' : isDragActive ? 'Drop image here' : 'Upload Image'}
                            </p>
                            <p className="text-sm" style={{ color: colors.text.tertiary }}>
                                {uploading
                                    ? 'Please wait while your image is being uploaded'
                                    : 'Drag and drop an image here, or click to select'
                                }
                            </p>
                            <p className="text-xs" style={{ color: colors.text.muted }}>
                                Max size: {Math.round(maxSize / (1024 * 1024))}MB
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
