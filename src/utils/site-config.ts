export type SiteConfig = typeof siteConfig

export const siteConfig = {
  siteUrl: 'https://kir-dev.hu/',
  name: 'Kir-Dev',
  translations: ['hu'],
  lang: 'hu',
  description:
    `A Schönherz kollégium webfejlesztő körének, azaz a Kir-Dev kör blog és portfolió weboldala. Olvashatsz körünk ` +
    `történetéről, szakmai újdonságokról, tanfolyamainkról és projektjeink haladásáról. Körünk a BME VIK Simonyi Károly ` +
    `Szakkollégiumának tagja.`,
  ogImage: '/images/default-og.png',
  author: 'kir-dev',
  email: 'hello@kir-dev.hu',
  keywords: [
    'web-development',
    'software',
    'devops',
    'rails',
    'nodejs',
    'spring-boot',
    'community',
    'simonyi',
    'kir-dev',
  ],
  robots: 'index, follow',
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
    card: 'summary_large_image',
    title: 'Kir-Dev',
    description:
      'A Schönherz kollégium webfejlesztő körének, azaz a Kir-Dev kör blog és portfolió weboldala.',
    image: '/images/default-og.png',
    creator: '@kirdev',
  },
  links: {
    github: 'https://github.com/kir-dev',
    twitter: 'https://twitter.com/kirdev',
    instagram: 'https://instagram.com/kir.dev',
    youtube: 'https://youtube.com/channel/UCkpMTj9qST_7RDt2YL4RUEw',
    facebook: 'https://facebook.com/kirdevteam',
  },
}
