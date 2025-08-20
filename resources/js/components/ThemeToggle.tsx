import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import React from 'react';

export const ThemeToggle: React.FC = () => {
    const { theme, setTheme, colors } = useTheme();

    const tabs: { value: 'light' | 'dark' | 'system'; icon: LucideIcon }[] = [
        { value: 'light', icon: Sun },
        { value: 'dark', icon: Moon },
        { value: 'system', icon: Monitor },
    ];

    return (
        <div
            className="inline-flex gap-1 rounded-lg p-1"
            style={{
                background: colors.background.tertiary,
            }}
        >
            {tabs.map(({ value, icon: Icon }) => {
                const isActive = theme === value;

                return (
                    <div className="flex items-center justify-center">
                        <button
                            key={value}
                            onClick={() => setTheme(value)}
                            className={cn(
                                'flex items-center rounded-md px-3.5 py-1.5 transition-all duration-200',
                                isActive ? 'shadow-sm' : 'hover:opacity-80',
                            )}
                            style={{
                                background: isActive ? colors.background.card : 'transparent',
                                color: isActive ? colors.text.primary : colors.text.tertiary,
                                border: isActive ? `1px solid ${colors.background.border}` : 'none',
                            }}
                        >
                            <Icon className="h-4 w-4" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default ThemeToggle;
