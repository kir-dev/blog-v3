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
  plugins: [nextui({} satisfies NextUIPluginConfig)],
} satisfies Config

export default config
