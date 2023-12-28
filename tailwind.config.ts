import { nextui, NextUIPluginConfig } from '@nextui-org/react'
import { Config } from 'tailwindcss/types/config'

const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#f97316',
              foreground: '#000000',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#ea580c',
              foreground: '#ffffff',
            },
          },
        },
      },
    } satisfies NextUIPluginConfig),
  ],
} satisfies Config

export default config
