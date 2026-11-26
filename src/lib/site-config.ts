export const siteConfig = {
  canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://kir-dev.hu',
  defaultTitle: 'Kir-Dev',
  titleTemplate: '%s | Kir-Dev',
  description:
    'A Schönherz kollégium webfejlesztő körének, azaz a Kir-Dev kör blog és portfolió weboldala. Olvashatsz körünk ' +
    'történetéről, szakmai újdonságokról, tanfolyamainkról és projektjeink haladásáról. Körünk a BME VIK Simonyi Károly ' +
    'Szakkollégiumának tagja.',
  shortDescription:
    'A Schönherz kollégium webfejlesztő körének, azaz a Kir-Dev kör blog és portfolió weboldala.',
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
  defaultOgImage: '/images/default-og.png',
  twitterHandle: '@kirdev',
} as const
