'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    Quote,
    Code,
    Link as LinkIcon,
    Image as ImageIcon,
    Undo,
    Redo
} from 'lucide-react';
import { Button } from './button';
import { useState } from 'react';

interface WYSIWYGEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
    height?: string;
    disabled?: boolean;
}

export function WYSIWYGEditor({
    value,
    onChange,
    placeholder = 'Start writing your content...',
    height = '300px',
    disabled = false,
}: WYSIWYGEditorProps) {
    const { colors } = useTheme();
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [showImageInput, setShowImageInput] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // Disable link extension from StarterKit since we're adding it separately
                link: false,
            }),
            Image,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline cursor-pointer',
                },
            }),
        ],
        content: value,
        editable: !disabled,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const addLink = () => {
        if (linkUrl) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
            setLinkUrl('');
            setShowLinkInput(false);
        }
    };

    const addImage = () => {
        if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
            setImageUrl('');
            setShowImageInput(false);
        }
    };



    const MenuBar = () => (
        <div
            className="flex flex-wrap items-center gap-1 p-3 border-b rounded-t-lg"
            style={{
                borderColor: colors.background.border,
                backgroundColor: colors.background.card,
            }}
        >
            {/* Text Formatting */}
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 ${editor.isActive('bold') ? 'bg-primary-100 text-primary-700' : ''}`}
                style={{
                    color: editor.isActive('bold') ? colors.primary.main : colors.text.secondary,
                    backgroundColor: editor.isActive('bold') ? `${colors.primary.main}15` : 'transparent',
                }}
            >
                <Bold className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 ${editor.isActive('italic') ? 'bg-primary-100 text-primary-700' : ''}`}
                style={{
                    color: editor.isActive('italic') ? colors.primary.main : colors.text.secondary,
                    backgroundColor: editor.isActive('italic') ? `${colors.primary.main}15` : 'transparent',
                }}
            >
                <Italic className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 ${editor.isActive('underline') ? 'bg-primary-100 text-primary-700' : ''}`}
                style={{
                    color: editor.isActive('underline') ? colors.primary.main : colors.text.secondary,
                    backgroundColor: editor.isActive('underline') ? `${colors.primary.main}15` : 'transparent',
                }}
            >
                <UnderlineIcon className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 ${editor.isActive('strike') ? 'bg-primary-100 text-primary-700' : ''}`}
                style={{
                    color: editor.isActive('strike') ? colors.primary.main : colors.text.secondary,
                    backgroundColor: editor.isActive('strike') ? `${colors.primary.main}15` : 'transparent',
                }}
            >
                <Strikethrough className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            {/* Headings */}
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 ${editor.isActive('heading', { level: 1 }) ? 'bg-primary-100 text-primary-700' : ''}`}
                style={{
                    color: editor.isActive('heading', { level: 1 }) ? colors.primary.main : colors.text.secondary,
                    backgroundColor: editor.isActive('heading', { level: 1 }) ? `${colors.primary.main}15` : 'transparent',
                }}
            >
                <Heading1 className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 ${editor.isActive('heading', { level: 2 }) ? 'bg-primary-100 text-primary-700' : ''}`}
                style={{
                    color: editor.isActive('heading', { level: 2 }) ? colors.primary.main : colors.text.secondary,
                    backgroundColor: editor.isActive('heading', { level: 2 }) ? `${colors.primary.main}15` : 'transparent',
                }}
            >
                <Heading2 className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 ${editor.isActive('heading', { level: 3 }) ? 'bg-primary-100 text-primary-700' : ''}`}
                style={{
                    color: editor.isActive('heading', { level: 3 }) ? colors.primary.main : colors.text.secondary,
                    backgroundColor: editor.isActive('heading', { level: 3 }) ? `${colors.primary.main}15` : 'transparent',
                }}
            >
                <Heading3 className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            {/* Lists */}
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 ${editor.isActive('bulletList') ? 'bg-primary-100 text-primary-700' : ''}`}
                style={{
                    color: editor.isActive('bulletList') ? colors.primary.main : colors.text.secondary,
                    backgroundColor: editor.isActive('bulletList') ? `${colors.primary.main}15` : 'transparent',
                }}
            >
                <List className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 ${editor.isActive('orderedList') ? 'bg-primary-100 text-primary-700' : ''}`}
                style={{
                    color: editor.isActive('orderedList') ? colors.primary.main : colors.text.secondary,
                    backgroundColor: editor.isActive('orderedList') ? `${colors.primary.main}15` : 'transparent',
                }}
            >
                <ListOrdered className="h-4 w-4" />
            </Button>

            

            <div className="w-px h-6 bg-gray-300 mx-2" />

            {/* Block Elements */}
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 ${editor.isActive('blockquote') ? 'bg-primary-100 text-primary-700' : ''}`}
                style={{
                    color: editor.isActive('blockquote') ? colors.primary.main : colors.text.secondary,
                    backgroundColor: editor.isActive('blockquote') ? `${colors.primary.main}15` : 'transparent',
                }}
            >
                <Quote className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`p-2 ${editor.isActive('codeBlock') ? 'bg-primary-100 text-primary-700' : ''}`}
                style={{
                    color: editor.isActive('codeBlock') ? colors.primary.main : colors.text.secondary,
                    backgroundColor: editor.isActive('codeBlock') ? `${colors.primary.main}15` : 'transparent',
                }}
            >
                <Code className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            {/* Links and Images */}
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowLinkInput(!showLinkInput)}
                className={`p-2 ${editor.isActive('link') ? 'bg-primary-100 text-primary-700' : ''}`}
                style={{
                    color: editor.isActive('link') ? colors.primary.main : colors.text.secondary,
                    backgroundColor: editor.isActive('link') ? `${colors.primary.main}15` : 'transparent',
                }}
            >
                <LinkIcon className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowImageInput(!showImageInput)}
                className="p-2"
                style={{ color: colors.text.secondary }}
            >
                <ImageIcon className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            {/* Undo/Redo */}
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="p-2"
                style={{ color: colors.text.secondary }}
            >
                <Undo className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="p-2"
                style={{ color: colors.text.secondary }}
            >
                <Redo className="h-4 w-4" />
            </Button>
        </div>
    );

    return (
        <div className="wysiwyg-editor">
            <style>{`
                .wysiwyg-editor .ProseMirror {
                    outline: none;
                    min-height: ${height};
                    padding: 16px;
                    font-family: inherit;
                    line-height: 1.6;
                    color: var(--editor-text);
                }

                .wysiwyg-editor .ProseMirror p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: var(--editor-text-muted);
                    pointer-events: none;
                    height: 0;
                }

                .wysiwyg-editor .ProseMirror h1,
                .wysiwyg-editor .ProseMirror h2,
                .wysiwyg-editor .ProseMirror h3,
                .wysiwyg-editor .ProseMirror h4,
                .wysiwyg-editor .ProseMirror h5,
                .wysiwyg-editor .ProseMirror h6 {
                    color: var(--editor-text);
                    font-weight: 600;
                    margin-top: 1.5em;
                    margin-bottom: 0.5em;
                }

                .wysiwyg-editor .ProseMirror h1 { font-size: 2em; }
                .wysiwyg-editor .ProseMirror h2 { font-size: 1.5em; }
                .wysiwyg-editor .ProseMirror h3 { font-size: 1.17em; }

                .wysiwyg-editor .ProseMirror blockquote {
                    border-left: 4px solid var(--editor-primary);
                    background: rgba(166, 52, 70, 0.1);
                    margin: 16px 0;
                    padding: 16px 20px;
                    border-radius: 0 8px 8px 0;
                }

                .wysiwyg-editor .ProseMirror code {
                    background: var(--editor-tertiary);
                    color: var(--editor-accent);
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-family: 'Monaco', 'Consolas', monospace;
                }

                .wysiwyg-editor .ProseMirror pre {
                    background: var(--editor-tertiary);
                    border: 1px solid var(--editor-border);
                    border-radius: 8px;
                    padding: 16px;
                    overflow-x: auto;
                }

                .wysiwyg-editor .ProseMirror ul,
                .wysiwyg-editor .ProseMirror ol {
                    padding-left: 1.5em;
                    margin: 1em 0;
                }

                .wysiwyg-editor .ProseMirror img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                }

                .wysiwyg-editor .ProseMirror a {
                    color: var(--editor-primary);
                    text-decoration: underline;
                }
            `}</style>

            <MenuBar />

            {/* Link Input */}
            {showLinkInput && (
                <div
                    className="p-3 border-b"
                    style={{
                        borderColor: colors.background.border,
                        backgroundColor: colors.background.input,
                    }}
                >
                    <div className="flex gap-2">
                        <input
                            type="url"
                            placeholder="Enter URL..."
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            className="flex-1 px-3 py-2 border rounded-md"
                            style={{
                                borderColor: colors.background.border,
                                backgroundColor: colors.background.card,
                                color: colors.text.primary,
                            }}
                            onKeyPress={(e) => e.key === 'Enter' && addLink()}
                        />
                        <Button onClick={addLink} size="sm">Add</Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowLinkInput(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {/* Image Input */}
            {showImageInput && (
                <div
                    className="p-3 border-b"
                    style={{
                        borderColor: colors.background.border,
                        backgroundColor: colors.background.input,
                    }}
                >
                    <div className="flex gap-2">
                        <input
                            type="url"
                            placeholder="Enter image URL..."
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="flex-1 px-3 py-2 border rounded-md"
                            style={{
                                borderColor: colors.background.border,
                                backgroundColor: colors.background.card,
                                color: colors.text.primary,
                            }}
                            onKeyPress={(e) => e.key === 'Enter' && addImage()}
                        />
                        <Button onClick={addImage} size="sm">Add</Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowImageInput(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            <div
                className="border rounded-b-lg"
                style={{
                    borderColor: colors.background.border,
                    backgroundColor: colors.background.input,
                    minHeight: height,
                }}
            >
                <EditorContent
                    editor={editor}
                    style={{
                        '--editor-border': colors.background.border,
                        '--editor-bg': colors.background.card,
                        '--editor-input-bg': colors.background.input,
                        '--editor-text': colors.text.primary,
                        '--editor-text-muted': colors.text.muted,
                        '--editor-text-secondary': colors.text.secondary,
                        '--editor-primary': colors.primary.main,
                        '--editor-tertiary': colors.background.tertiary,
                        '--editor-accent': colors.accent.main,
                    } as React.CSSProperties}
                />
            </div>
        </div>
    );
}
