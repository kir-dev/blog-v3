import { nextui, NextUIPluginConfig } from '@nextui-org/react'
import { Config } from 'tailwindcss/types/config'

const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {},
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#f97316',
              foreground: '#0a0a0a',
            },
            background: {
              DEFAULT: '#f9f9f9',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#ea580c',
              foreground: '#f9f9f9',
            },
            background: {
              DEFAULT: '#0a0a0a',
            },
          },
        },
      },
    } satisfies NextUIPluginConfig),
  ],
} satisfies Config

export default config
