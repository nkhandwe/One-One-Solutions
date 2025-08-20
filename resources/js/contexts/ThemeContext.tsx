import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    isDark: boolean;
    colors: ThemeColors;
}

interface ThemeColors {
    // Primary colors (Red - your brand color)
    primary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        main: string;
        light: string;
        dark: string;
    };
    // Secondary colors (Blue)
    secondary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        main: string;
        light: string;
        dark: string;
    };
    // Accent colors (Purple)
    accent: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        main: string;
        light: string;
        dark: string;
    };
    // Background colors
    background: {
        primary: string;
        secondary: string;
        tertiary: string;
        card: string;
        cardHover: string;
        input: string;
        border: string;
        divider: string;
    };
    // Text colors
    text: {
        primary: string;
        secondary: string;
        tertiary: string;
        muted: string;
        inverse: string;
    };
    // Status colors
    success: {
        main: string;
        light: string;
        dark: string;
        text: string;
        bg: string;
    };
    warning: {
        main: string;
        light: string;
        dark: string;
        text: string;
        bg: string;
    };
    error: {
        main: string;
        light: string;
        dark: string;
        text: string;
        bg: string;
    };
    info: {
        main: string;
        light: string;
        dark: string;
        text: string;
        bg: string;
    };
}

const lightColors: ThemeColors = {
    primary: {
        50: '#fef2f3',
        100: '#fde7ea',
        200: '#fbd3d9',
        300: '#f7b3be',
        400: '#f08596',
        500: '#e85d73',
        600: '#d43d5a',
        700: '#a63446',
        800: '#8a2a3a',
        900: '#732530',
        main: '#a63446',
        light: '#c44a5e',
        dark: '#8a2a3a',
    },
    secondary: {
        50: '#f0f8ff',
        100: '#e0f1ff',
        200: '#bae3ff',
        300: '#7cd0ff',
        400: '#36b7ff',
        500: '#0c9eff',
        600: '#0c6291',
        700: '#0a4f75',
        800: '#0a4f75',
        900: '#0a4f75',
        main: '#0c6291',
        light: '#1a7bb3',
        dark: '#0a4f75',
    },
    accent: {
        50: '#fdf2f8',
        100: '#fce7f3',
        200: '#fbcfe8',
        300: '#f9a8d4',
        400: '#f472b6',
        500: '#ec4899',
        600: '#db2777',
        700: '#be185d',
        800: '#9d174d',
        900: '#7e1946',
        main: '#7e1946',
        light: '#9a2a56',
        dark: '#651339',
    },
    background: {
        primary: '#ffffff',
        secondary: '#fbfef9',
        tertiary: '#f5f7f2',
        card: 'rgba(255, 255, 255, 0.8)',
        cardHover: 'rgba(255, 255, 255, 0.9)',
        input: 'rgba(255, 255, 255, 0.7)',
        border: 'rgba(0, 0, 0, 0.1)',
        divider: 'rgba(0, 0, 0, 0.06)',
    },
    text: {
        primary: '#000004',
        secondary: '#262626',
        tertiary: '#525252',
        muted: '#737373',
        inverse: '#ffffff',
    },
    success: {
        main: '#10b981',
        light: '#34d399',
        dark: '#059669',
        text: '#ffffff',
        bg: 'rgba(16, 185, 129, 0.1)',
    },
    warning: {
        main: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706',
        text: '#ffffff',
        bg: 'rgba(245, 158, 11, 0.1)',
    },
    error: {
        main: '#ef4444',
        light: '#f87171',
        dark: '#dc2626',
        text: '#ffffff',
        bg: 'rgba(239, 68, 68, 0.1)',
    },
    info: {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb',
        text: '#ffffff',
        bg: 'rgba(59, 130, 246, 0.1)',
    },
};

const darkColors: ThemeColors = {
    primary: {
        50: '#fef2f3',
        100: '#fde7ea',
        200: '#fbd3d9',
        300: '#f7b3be',
        400: '#f08596',
        500: '#e85d73',
        600: '#d43d5a',
        700: '#a63446',
        800: '#8a2a3a',
        900: '#732530',
        main: '#a63446',
        light: '#c44a5e',
        dark: '#8a2a3a',
    },
    secondary: {
        50: '#f0f8ff',
        100: '#e0f1ff',
        200: '#bae3ff',
        300: '#7cd0ff',
        400: '#36b7ff',
        500: '#0c9eff',
        600: '#0c6291',
        700: '#0a4f75',
        800: '#0a4f75',
        900: '#0a4f75',
        main: '#0c6291',
        light: '#1a7bb3',
        dark: '#0a4f75',
    },
    accent: {
        50: '#fdf2f8',
        100: '#fce7f3',
        200: '#fbcfe8',
        300: '#f9a8d4',
        400: '#f472b6',
        500: '#ec4899',
        600: '#db2777',
        700: '#be185d',
        800: '#9d174d',
        900: '#7e1946',
        main: '#7e1946',
        light: '#9a2a56',
        dark: '#651339',
    },
    background: {
        primary: '#0a0a0a',
        secondary: '#1a1a1a',
        tertiary: '#262626',
        card: 'rgba(38, 38, 38, 0.8)',
        cardHover: 'rgba(38, 38, 38, 0.9)',
        input: 'rgba(38, 38, 38, 0.7)',
        border: 'rgba(255, 255, 255, 0.1)',
        divider: 'rgba(255, 255, 255, 0.06)',
    },
    text: {
        primary: '#ffffff',
        secondary: '#e5e5e5',
        tertiary: '#a3a3a3',
        muted: '#737373',
        inverse: '#000004',
    },
    success: {
        main: '#10b981',
        light: '#34d399',
        dark: '#059669',
        text: '#ffffff',
        bg: 'rgba(16, 185, 129, 0.2)',
    },
    warning: {
        main: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706',
        text: '#ffffff',
        bg: 'rgba(245, 158, 11, 0.2)',
    },
    error: {
        main: '#ef4444',
        light: '#f87171',
        dark: '#dc2626',
        text: '#ffffff',
        bg: 'rgba(239, 68, 68, 0.2)',
    },
    info: {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb',
        text: '#ffffff',
        bg: 'rgba(59, 130, 246, 0.2)',
    },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>('system');
    const [isDark, setIsDark] = useState(false);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);

        // Apply theme immediately
        applyTheme(newTheme);
    };

    const applyTheme = (newTheme: Theme) => {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = newTheme === 'dark' || (newTheme === 'system' && systemPrefersDark);

        setIsDark(shouldBeDark);

        // Update document classes
        document.documentElement.classList.toggle('dark', shouldBeDark);
        document.documentElement.classList.toggle('light', !shouldBeDark);
    };

    useEffect(() => {
        // Load saved theme from localStorage
        const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
        setThemeState(savedTheme);
        applyTheme(savedTheme);

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                applyTheme('system');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    const colors = isDark ? darkColors : lightColors;

    const value: ThemeContextType = {
        theme,
        setTheme,
        isDark,
        colors,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
