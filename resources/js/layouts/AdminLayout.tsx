import AdminNavigation from '@/components/AdminNavigation';
import { useTheme } from '@/contexts/ThemeContext';
import { usePage } from '@inertiajs/react';
import React from 'react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { url } = usePage();
    const { isDark, colors } = useTheme();
    const currentPath = url;

    return (
        <div
            className="flex min-h-screen"
            style={{
                background: isDark
                    ? `linear-gradient(135deg, ${colors.background.primary} 0%, ${colors.background.secondary} 50%, ${colors.background.tertiary} 100%)`
                    : `linear-gradient(135deg, ${colors.background.primary} 0%, ${colors.background.secondary} 50%, ${colors.background.tertiary} 100%)`,
            }}
        >
            <AdminNavigation currentPath={currentPath} />
            <main className="flex-1 ml-64 overflow-auto">{children}</main>
        </div>
    );
}
