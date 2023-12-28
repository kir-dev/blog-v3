/** @type {import('next').NextConfig} */
const config = {
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
}

export default config
