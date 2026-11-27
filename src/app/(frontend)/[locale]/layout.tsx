import '~/styles/global.css'
import '~/styles/prism-okaidia.css'

import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import React from 'react'
import { routing } from '~/i18n/routing'
import { siteConfig } from '~/lib/site-config'
import { Providers } from './Providers'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonical),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  icons: {
    icon: '/favicon/favicon-96x96.png',
    apple: [
      {
        url: '/favicon/apple-icon-76x76.png',
        sizes: '76x76',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    url: `${siteConfig.canonical}/`,
    siteName: 'Kir-Dev',
    description: siteConfig.shortDescription,
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'Kir-Dev',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: siteConfig.twitterHandle,
  },
}

export default async function FrontendLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()
  const plausibleUrl = process.env.NEXT_PUBLIC_PLAUSIBLE_URL

  return (
    <html lang={locale} suppressHydrationWarning className={inter.className}>
      <body>
        <Script
          id="YeetGatsby"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            if (window.navigator && navigator.serviceWorker) {
              navigator.serviceWorker.getRegistrations().then(function(registrations) {
                for (let registration of registrations) {
                  registration.unregister();
                }
              });
            }`,
          }}
        />
        {plausibleUrl && (
          <Script
            defer
            data-domain="kir-dev.hu"
            src={`${plausibleUrl.replace(/\/$/, '')}/js/script.js`}
            strategy="afterInteractive"
          />
        )}
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
