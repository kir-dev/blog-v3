import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link as IntlLink } from '~/i18n/navigation'
import { environment } from '~/utils/environment'
import Container from './Container'
import { FacebookSvg } from './svg-components/FacebookSvg'
import { GitHubSvg } from './svg-components/GitHubSvg'
import { InstagramSvg } from './svg-components/InstagramSvg'
import { LogoBig } from './svg-components/LogoBig'
import { YoutubeSvg } from './svg-components/YoutubeSvg'
import SchonherzLogo from './svg/Schönherz.svg'
import VercelLogo from './svg/powered-by-vercel.svg'

const socials = [
  { key: 'g', label: 'GitHub', icon: GitHubSvg, href: environment.socials.githubOrgUrl },
  { key: 'y', label: 'YouTube', icon: YoutubeSvg, href: environment.socials.youtubeUrl },
  { key: 'i', label: 'Instagram', icon: InstagramSvg, href: environment.socials.instagramUrl },
  { key: 'f', label: 'Facebook', icon: FacebookSvg, href: environment.socials.facebookUrl },
]

const sponsors = [
  {
    key: 'v',
    src: VercelLogo,
    w: 209,
    h: 40,
    alt: 'Vercel Logo',
    href: 'https://vercel.com?utm_source=kir-dev&utm_campaign=oss',
  },
  {
    key: 'r',
    src: '/images/rackhost.png',
    w: 1850,
    h: 382,
    alt: 'Rackhost Logo',
    href: 'https://rackhost.hu',
    classNameExtra: 'bg-white py-2 px-4 rounded-lg',
  },
  {
    key: 'b',
    src: 'https://betteruptime.com/assets/static_assets/badges/light.png',
    h: 260,
    w: 104,
    alt: 'Better Uptime Website Monitoring',
    href: 'https://betteruptime.com/',
  },
  {
    key: 's',
    src: SchonherzLogo,
    w: 320,
    h: 100,
    alt: 'Schönherz Logo',
    href: 'https://svie.hu',
    classNameExtra: 'bg-white py-2 px-4 rounded-lg',
  },
]

export default function Footer() {
  const t = useTranslations('common.footer')
  return (
    <footer className="flex flex-col gap-10 pt-32">
      <div className="flex flex-col items-center">
        <div className="px-1 pb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-400 font-bold whitespace-nowrap">
          {t('sponsors')}
        </div>
        <div className="flex w-full justify-center items-center gap-3 flex-col sm:flex-row">
          {sponsors.map((item) => (
            <a
              key={item.key}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${item.classNameExtra ?? ''} w-40 hover:opacity-80 transition-opacity`}
            >
              <Image
                src={item.src}
                width={item.w}
                height={item.h}
                alt={item.alt}
                className="h-auto w-full"
              />
            </a>
          ))}
        </div>
      </div>
      <Container>
        <div className="flex justify-between items-center gap-3 flex-col-reverse sm:flex-row pb-10">
          <div className="h-24 sm:h-16 flex flex-col sm:flex-row items-center gap-3 text-sm mt-10">
            <LogoBig className="h-full w-auto" />
            <div className="hidden sm:block">
              <p>
                {t.rich('partOfSimonyi', {
                  link: (chunks) => (
                    <a
                      href={environment.simonyiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:opacity-80 transition-opacity"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
              <p>
                <IntlLink
                  href="/about/contact"
                  className="text-primary no-underline hover:opacity-80 transition-opacity text-sm"
                >
                  {t('contact')}
                </IntlLink>
              </p>
              <p>Kir-Dev &copy; {new Date().getFullYear()}</p>
            </div>
            <div className="block sm:hidden text-center">
              <p>
                <IntlLink
                  className="text-sm text-primary hover:opacity-80"
                  href="/about/contact"
                >
                  {t('contact')}
                </IntlLink>
              </p>
              <p>Kir-Dev &copy; {new Date().getFullYear()}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="px-1 pb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-400 font-bold">
              {t('socials')}
            </div>
            <div className="flex gap-4">
              {socials.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-10 w-10 items-center justify-center text-foreground hover:opacity-80 transition-opacity"
                >
                  <item.icon className="h-full w-auto fill-current" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
