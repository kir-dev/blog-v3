import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['hu', 'en'],
  defaultLocale: 'hu',
  localePrefix: 'as-needed',
  localeDetection: false,
})

export type AppLocale = (typeof routing.locales)[number]
