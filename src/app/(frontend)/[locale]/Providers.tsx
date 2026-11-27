'use client'

import { ThemeProvider } from 'next-themes'
import React from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      themes={['dark', 'light']}
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  )
}
