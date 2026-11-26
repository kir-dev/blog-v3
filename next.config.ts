import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const mediaEndpoint = process.env.S3_ENDPOINT
  ? new URL(process.env.S3_ENDPOINT)
  : null

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.resolve(dirname),
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: 'betteruptime.com' },
      ...(mediaEndpoint
        ? [
            {
              protocol: mediaEndpoint.protocol.slice(0, -1) as 'http' | 'https',
              hostname: mediaEndpoint.hostname,
              port: mediaEndpoint.port,
              pathname: '/**',
            },
          ]
        : []),
    ],
  },
  redirects: async () => [
    {
      source: '/about',
      destination: '/about/history',
      permanent: true,
    },
    {
      source: '/studio',
      destination: '/admin',
      permanent: true,
    },
    {
      source: '/studio/:path*',
      destination: '/admin/:path*',
      permanent: true,
    },
    {
      source: '/ly/:short',
      destination: 'https://api.shorz.kir-dev.hu/ly/:short',
      permanent: true,
    },
  ],
}

export default withPayload(withNextIntl(nextConfig))
