import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/(frontend)/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: {
          DEFAULT: 'rgb(var(--color-foreground) / <alpha-value>)',
          50: 'rgb(var(--color-foreground-50) / <alpha-value>)',
          100: 'rgb(var(--color-foreground-100) / <alpha-value>)',
          200: 'rgb(var(--color-foreground-200) / <alpha-value>)',
          300: 'rgb(var(--color-foreground-300) / <alpha-value>)',
          400: 'rgb(var(--color-foreground-400) / <alpha-value>)',
          500: 'rgb(var(--color-foreground-500) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          foreground: 'rgb(var(--color-primary-foreground) / <alpha-value>)',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
        },
        secondary: {
          DEFAULT: '#9353d3',
          foreground: '#ffffff',
        },
        success: {
          DEFAULT: '#17c964',
          foreground: '#0a0a0a',
        },
        danger: {
          DEFAULT: '#f31260',
          foreground: '#ffffff',
        },
        default: {
          DEFAULT: 'rgb(var(--color-default) / <alpha-value>)',
          foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        },
      },
      borderWidth: {
        1: '1px',
        3: '3px',
      },
      borderRadius: {
        large: '0.875rem',
      },
      boxShadow: {
        small: '0 0 5px 0 rgb(0 0 0 / 0.02), 0 2px 10px 0 rgb(0 0 0 / 0.06)',
      },
      fontSize: {
        tiny: ['0.75rem', { lineHeight: '1rem' }],
        small: ['0.875rem', { lineHeight: '1.25rem' }],
      },
      transitionProperty: {
        left: 'left',
      },
    },
  },
  plugins: [typography],
}

export default config
