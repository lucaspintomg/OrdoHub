/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {
      // CSS Variables for Design Tokens
      colors: {
        // Primary colors - Blue theme for family organization
        primary: {
          50: 'hsl(var(--color-primary-50) / <alpha-value>)',
          100: 'hsl(var(--color-primary-100) / <alpha-value>)',
          200: 'hsl(var(--color-primary-200) / <alpha-value>)',
          300: 'hsl(var(--color-primary-300) / <alpha-value>)',
          400: 'hsl(var(--color-primary-400) / <alpha-value>)',
          500: 'hsl(var(--color-primary-500) / <alpha-value>)',
          600: 'hsl(var(--color-primary-600) / <alpha-value>)',
          700: 'hsl(var(--color-primary-700) / <alpha-value>)',
          800: 'hsl(var(--color-primary-800) / <alpha-value>)',
          900: 'hsl(var(--color-primary-900) / <alpha-value>)',
          950: 'hsl(var(--color-primary-950) / <alpha-value>)',
        },
        // Secondary colors - Green for success/completed tasks
        secondary: {
          50: 'hsl(var(--color-secondary-50) / <alpha-value>)',
          100: 'hsl(var(--color-secondary-100) / <alpha-value>)',
          200: 'hsl(var(--color-secondary-200) / <alpha-value>)',
          300: 'hsl(var(--color-secondary-300) / <alpha-value>)',
          400: 'hsl(var(--color-secondary-400) / <alpha-value>)',
          500: 'hsl(var(--color-secondary-500) / <alpha-value>)',
          600: 'hsl(var(--color-secondary-600) / <alpha-value>)',
          700: 'hsl(var(--color-secondary-700) / <alpha-value>)',
          800: 'hsl(var(--color-secondary-800) / <alpha-value>)',
          900: 'hsl(var(--color-secondary-900) / <alpha-value>)',
          950: 'hsl(var(--color-secondary-950) / <alpha-value>)',
        },
        // Accent colors - Orange for highlights and notifications
        accent: {
          50: 'hsl(var(--color-accent-50) / <alpha-value>)',
          100: 'hsl(var(--color-accent-100) / <alpha-value>)',
          200: 'hsl(var(--color-accent-200) / <alpha-value>)',
          300: 'hsl(var(--color-accent-300) / <alpha-value>)',
          400: 'hsl(var(--color-accent-400) / <alpha-value>)',
          500: 'hsl(var(--color-accent-500) / <alpha-value>)',
          600: 'hsl(var(--color-accent-600) / <alpha-value>)',
          700: 'hsl(var(--color-accent-700) / <alpha-value>)',
          800: 'hsl(var(--color-accent-800) / <alpha-value>)',
          900: 'hsl(var(--color-accent-900) / <alpha-value>)',
          950: 'hsl(var(--color-accent-950) / <alpha-value>)',
        },
        // Neutral colors for backgrounds and text
        neutral: {
          50: 'hsl(var(--color-neutral-50) / <alpha-value>)',
          100: 'hsl(var(--color-neutral-100) / <alpha-value>)',
          200: 'hsl(var(--color-neutral-200) / <alpha-value>)',
          300: 'hsl(var(--color-neutral-300) / <alpha-value>)',
          400: 'hsl(var(--color-neutral-400) / <alpha-value>)',
          500: 'hsl(var(--color-neutral-500) / <alpha-value>)',
          600: 'hsl(var(--color-neutral-600) / <alpha-value>)',
          700: 'hsl(var(--color-neutral-700) / <alpha-value>)',
          800: 'hsl(var(--color-neutral-800) / <alpha-value>)',
          900: 'hsl(var(--color-neutral-900) / <alpha-value>)',
          950: 'hsl(var(--color-neutral-950) / <alpha-value>)',
        },
        // Semantic colors
        success: {
          50: 'hsl(var(--color-success-50) / <alpha-value>)',
          100: 'hsl(var(--color-success-100) / <alpha-value>)',
          200: 'hsl(var(--color-success-200) / <alpha-value>)',
          300: 'hsl(var(--color-success-300) / <alpha-value>)',
          400: 'hsl(var(--color-success-400) / <alpha-value>)',
          500: 'hsl(var(--color-success-500) / <alpha-value>)',
          600: 'hsl(var(--color-success-600) / <alpha-value>)',
          700: 'hsl(var(--color-success-700) / <alpha-value>)',
          800: 'hsl(var(--color-success-800) / <alpha-value>)',
          900: 'hsl(var(--color-success-900) / <alpha-value>)',
          950: 'hsl(var(--color-success-950) / <alpha-value>)',
        },
        warning: {
          50: 'hsl(var(--color-warning-50) / <alpha-value>)',
          100: 'hsl(var(--color-warning-100) / <alpha-value>)',
          200: 'hsl(var(--color-warning-200) / <alpha-value>)',
          300: 'hsl(var(--color-warning-300) / <alpha-value>)',
          400: 'hsl(var(--color-warning-400) / <alpha-value>)',
          500: 'hsl(var(--color-warning-500) / <alpha-value>)',
          600: 'hsl(var(--color-warning-600) / <alpha-value>)',
          700: 'hsl(var(--color-warning-700) / <alpha-value>)',
          800: 'hsl(var(--color-warning-800) / <alpha-value>)',
          900: 'hsl(var(--color-warning-900) / <alpha-value>)',
          950: 'hsl(var(--color-warning-950) / <alpha-value>)',
        },
        error: {
          50: 'hsl(var(--color-error-50) / <alpha-value>)',
          100: 'hsl(var(--color-error-100) / <alpha-value>)',
          200: 'hsl(var(--color-error-200) / <alpha-value>)',
          300: 'hsl(var(--color-error-300) / <alpha-value>)',
          400: 'hsl(var(--color-error-400) / <alpha-value>)',
          500: 'hsl(var(--color-error-500) / <alpha-value>)',
          600: 'hsl(var(--color-error-600) / <alpha-value>)',
          700: 'hsl(var(--color-error-700) / <alpha-value>)',
          800: 'hsl(var(--color-error-800) / <alpha-value>)',
          900: 'hsl(var(--color-error-900) / <alpha-value>)',
          950: 'hsl(var(--color-error-950) / <alpha-value>)',
        },
        info: {
          50: 'hsl(var(--color-info-50) / <alpha-value>)',
          100: 'hsl(var(--color-info-100) / <alpha-value>)',
          200: 'hsl(var(--color-info-200) / <alpha-value>)',
          300: 'hsl(var(--color-info-300) / <alpha-value>)',
          400: 'hsl(var(--color-info-400) / <alpha-value>)',
          500: 'hsl(var(--color-info-500) / <alpha-value>)',
          600: 'hsl(var(--color-info-600) / <alpha-value>)',
          700: 'hsl(var(--color-info-700) / <alpha-value>)',
          800: 'hsl(var(--color-info-800) / <alpha-value>)',
          900: 'hsl(var(--color-info-900) / <alpha-value>)',
          950: 'hsl(var(--color-info-950) / <alpha-value>)',
        },
        // Custom colors for specific features
        task: {
          pending: 'hsl(var(--color-task-pending) / <alpha-value>)',
          progress: 'hsl(var(--color-task-progress) / <alpha-value>)',
          completed: 'hsl(var(--color-task-completed) / <alpha-value>)',
          overdue: 'hsl(var(--color-task-overdue) / <alpha-value>)',
        },
        expense: {
          food: 'hsl(var(--color-expense-food) / <alpha-value>)',
          transport: 'hsl(var(--color-expense-transport) / <alpha-value>)',
          health: 'hsl(var(--color-expense-health) / <alpha-value>)',
          entertainment: 'hsl(var(--color-expense-entertainment) / <alpha-value>)',
          utilities: 'hsl(var(--color-expense-utilities) / <alpha-value>)',
          other: 'hsl(var(--color-expense-other) / <alpha-value>)',
        },
        family: {
          parent: 'hsl(var(--color-family-parent) / <alpha-value>)',
          child: 'hsl(var(--color-family-child) / <alpha-value>)',
          teen: 'hsl(var(--color-family-teen) / <alpha-value>)',
          guest: 'hsl(var(--color-family-guest) / <alpha-value>)',
        },
      },
      
      // Typography scale
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },

      // Font families
      fontFamily: {
        'sans': ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        'serif': ['var(--font-serif)', 'Georgia', 'serif'],
        'mono': ['var(--font-mono)', 'Fira Code', 'monospace'],
        'heading': ['var(--font-heading)', 'Inter', 'system-ui', 'sans-serif'],
        'body': ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },

      // Spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },

      // Border radius
      borderRadius: {
        'xs': '0.125rem',
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      // Box shadows
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'none': 'none',
        // Custom shadows for components
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'modal': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'dropdown': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },

      // Animations
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-in-right': 'slideInRight 0.3s ease-in-out',
        'slide-in-left': 'slideInLeft 0.3s ease-in-out',
        'slide-in-up': 'slideInUp 0.3s ease-in-out',
        'slide-in-down': 'slideInDown 0.3s ease-in-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 0.8s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
      },

      // Keyframes for animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },

      // Custom gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600))',
        'gradient-secondary': 'linear-gradient(135deg, var(--color-secondary-500), var(--color-secondary-600))',
        'gradient-accent': 'linear-gradient(135deg, var(--color-accent-500), var(--color-accent-600))',
        'gradient-hero': 'linear-gradient(135deg, var(--color-primary-600), var(--color-secondary-500), var(--color-accent-500))',
      },

      // Screen sizes for responsive design
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },

      // Container configuration
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },

      // Z-index scale
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      // Backdrop blur
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },

      // Custom utilities for OrdoHub
      utilities: {
        '.card': {
          '@apply bg-white dark:bg-neutral-800 rounded-lg shadow-card border border-neutral-200 dark:border-neutral-700': {},
        },
        '.card-hover': {
          '@apply hover:shadow-card-hover transition-shadow duration-200': {},
        },
        '.btn': {
          '@apply inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50': {},
        },
        '.btn-primary': {
          '@apply bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800': {},
        },
        '.btn-secondary': {
          '@apply bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800': {},
        },
        '.btn-outline': {
          '@apply border border-neutral-300 bg-transparent hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800': {},
        },
        '.input': {
          '@apply flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:ring-offset-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary-400': {},
        },
        '.text-gradient': {
          '@apply bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent': {},
        },
        '.glass': {
          '@apply bg-white/80 backdrop-blur-md border border-white/20 dark:bg-neutral-800/80 dark:border-neutral-700/20': {},
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography')({
      className: 'prose',
    }),
    require('@tailwindcss/aspect-ratio'),
    
    // Custom plugin for OrdoHub utilities
    function({ addUtilities, addComponents, theme }) {
      // Add custom utilities
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme('colors.neutral.100'),
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme('colors.neutral.400'),
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: theme('colors.neutral.500'),
          },
        },
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-pretty': {
          'text-wrap': 'pretty',
        },
      })

      // Add custom components
      addComponents({
        '.card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.lg'),
          boxShadow: theme('boxShadow.card'),
          border: `1px solid ${theme('colors.neutral.200')}`,
          '.dark &': {
            backgroundColor: theme('colors.neutral.800'),
            borderColor: theme('colors.neutral.700'),
          },
        },
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.medium'),
          transition: 'colors 200ms',
          '&:focus-visible': {
            outline: 'none',
            ringWidth: '2px',
            ringColor: theme('colors.primary.500'),
            ringOffsetWidth: '2px',
          },
          '&:disabled': {
            pointerEvents: 'none',
            opacity: '0.5',
          },
        },
        '.btn-sm': {
          height: theme('spacing.8'),
          paddingLeft: theme('spacing.3'),
          paddingRight: theme('spacing.3'),
          fontSize: theme('fontSize.sm'),
        },
        '.btn-md': {
          height: theme('spacing.10'),
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          fontSize: theme('fontSize.sm'),
        },
        '.btn-lg': {
          height: theme('spacing.12'),
          paddingLeft: theme('spacing.6'),
          paddingRight: theme('spacing.6'),
          fontSize: theme('fontSize.base'),
        },
      })
    },
  ],
}
