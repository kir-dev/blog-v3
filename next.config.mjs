import { withPlausibleProxy } from 'next-plausible'

/** @type {import('next').NextConfig} */
const config = withPlausibleProxy()({
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
  ],
})

export default config
