import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
        './resources/js/**/*.ts',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Instrument Sans', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                float: {
                    '0%, 100%': {
                        transform: 'translateY(0px) rotate(0deg)'
                    },
                    '50%': {
                        transform: 'translateY(-20px) rotate(180deg)'
                    },
                },
                'float-slow': {
                    '0%, 100%': {
                        transform: 'translateY(0px) rotate(0deg) scale(1)'
                    },
                    '33%': {
                        transform: 'translateY(-30px) rotate(120deg) scale(1.1)'
                    },
                    '66%': {
                        transform: 'translateY(-15px) rotate(240deg) scale(0.9)'
                    },
                },
                shimmer: {
                    '0%': {
                        transform: 'translateX(-100%) skewX(-15deg)'
                    },
                    '100%': {
                        transform: 'translateX(100%) skewX(-15deg)'
                    },
                },
                'pulse-slow': {
                    '0%, 100%': {
                        opacity: '1',
                        transform: 'scale(1)'
                    },
                    '50%': {
                        opacity: '0.8',
                        transform: 'scale(1.05)'
                    },
                },
                'bounce-subtle': {
                    '0%, 100%': {
                        transform: 'translateY(0) scale(1)'
                    },
                    '50%': {
                        transform: 'translateY(-10px) scale(1.02)'
                    },
                },
                'slide-in-left': {
                    '0%': {
                        transform: 'translateX(-100%) rotateY(-30deg)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'translateX(0) rotateY(0deg)',
                        opacity: '1'
                    },
                },
                'slide-in-right': {
                    '0%': {
                        transform: 'translateX(100%) rotateY(30deg)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'translateX(0) rotateY(0deg)',
                        opacity: '1'
                    },
                },
                'slide-in-up': {
                    '0%': {
                        transform: 'translateY(100%) rotateX(-30deg)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'translateY(0) rotateX(0deg)',
                        opacity: '1'
                    },
                },
                'fade-in': {
                    '0%': {
                        opacity: '0',
                        transform: 'scale(0.9)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'scale(1)'
                    },
                },
                'scale-in': {
                    '0%': {
                        transform: 'scale(0) rotate(-180deg)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'scale(1) rotate(0deg)',
                        opacity: '1'
                    },
                },
                'glow-pulse': {
                    '0%, 100%': {
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
                    },
                    '50%': {
                        boxShadow: '0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)'
                    },
                },
                'text-shimmer': {
                    '0%': {
                        backgroundPosition: '-200% center'
                    },
                    '100%': {
                        backgroundPosition: '200% center'
                    },
                },
                'morph': {
                    '0%, 100%': {
                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
                    },
                    '25%': {
                        borderRadius: '58% 42% 75% 25% / 76% 46% 54% 24%'
                    },
                    '50%': {
                        borderRadius: '50% 50% 33% 67% / 55% 27% 73% 45%'
                    },
                    '75%': {
                        borderRadius: '33% 67% 58% 42% / 63% 68% 32% 37%'
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                float: 'float 6s ease-in-out infinite',
                'float-slow': 'float-slow 12s ease-in-out infinite',
                shimmer: 'shimmer 2s linear infinite',
                'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'bounce-subtle': 'bounce-subtle 3s ease-in-out infinite',
                'slide-in-left': 'slide-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-in-right': 'slide-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-in-up': 'slide-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                'fade-in': 'fade-in 0.6s ease-out',
                'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
                'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
                'morph': 'morph 8s ease-in-out infinite',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'mesh-gradient': 'linear-gradient(45deg, var(--tw-gradient-stops))',
                'shimmer-gradient': 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
                'aurora': 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b)',
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
                'glow-lg': '0 0 40px rgba(59, 130, 246, 0.3)',
                'glow-xl': '0 0 60px rgba(59, 130, 246, 0.2)',
                'inner-glow': 'inset 0 0 20px rgba(59, 130, 246, 0.2)',
                'colored-glow': '0 0 30px var(--glow-color, rgba(59, 130, 246, 0.5))',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            },
            fontFamily: {
                'display': ['Inter', 'system-ui', 'sans-serif'],
                'body': ['Inter', 'system-ui', 'sans-serif'],
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },
        },
    },
    plugins: [
        forms,
        function ({ addUtilities }) {
            const newUtilities = {
                '.text-shadow': {
                    textShadow: '2px 2px 4px rgba(0,0,0,0.10)',
                },
                '.text-shadow-md': {
                    textShadow: '4px 4px 8px rgba(0,0,0,0.12)',
                },
                '.text-shadow-lg': {
                    textShadow: '15px 15px 30px rgba(0,0,0,0.11)',
                },
                '.text-shadow-none': {
                    textShadow: 'none',
                },
                '.backface-hidden': {
                    'backface-visibility': 'hidden',
                },
                '.transform-gpu': {
                    transform: 'translate3d(0, 0, 0)',
                },
                '.perspective-1000': {
                    perspective: '1000px',
                },
                '.preserve-3d': {
                    'transform-style': 'preserve-3d',
                },
            }

            addUtilities(newUtilities);
        }
    ],
};
