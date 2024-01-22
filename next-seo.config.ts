import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  canonical: 'https://kir-dev.hu/',
  defaultTitle: 'Kir-Dev',
  titleTemplate: '%s | Kir-Dev',
  languageAlternates: [{ hrefLang: 'hu-HU', href: 'https://kir-dev.hu/' }],
  description:
    `A Schönherz kollégium webfejlesztő körének, azaz a Kir-Dev kör blog és portfolió weboldala. Olvashatsz körünk ` +
    `történetéről, szakmai újdonságokról, tanfolyamainkról és projektjeink haladásáról. Körünk a BME VIK Simonyi Károly ` +
    `Szakkollégiumának tagja.`,
  additionalMetaTags: [
    {
      property: 'keywords',
      content: [
        'web-development',
        'software',
        'devops',
        'rails',
        'nodejs',
        'spring-boot',
        'community',
        'simonyi',
        'kir-dev',
      ].join(','),
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/favicon/apple-icon-76x76.png',
      sizes: '76x76',
    },
    {
      rel: 'manifest',
      href: '/favicon/site.webmanifest',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    url: 'https://kir-dev.hu/',
    siteName: 'Kir-Dev',
    description:
      'A Schönherz kollégium webfejlesztő körének, azaz a Kir-Dev kör blog és portfolió weboldala.',
    images: [
      {
        url: '/images/default-og.png',
        width: 1200,
        height: 630,
        alt: 'Kir-Dev',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
    handle: '@kirdev',
  },
}

export default config
