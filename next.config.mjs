import { withPlausibleProxy } from 'next-plausible'

/** @type {import('next').NextConfig} */
const config = withPlausibleProxy({
  customDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_URL,
})({
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'betteruptime.com' },
    ],
  },
  redirects: async () => [
    {
      source: '/about',
      destination: '/about/history',
      permanent: true,
    },
    {
      source: '/ly/:short',
      destination: 'https://api.shorz.kir-dev.hu/ly/:short',
      permanent: true
    }
  ],
  i18n: {
    locales: ['hu', 'en'],
    defaultLocale: 'hu',
  },
})

export default config
