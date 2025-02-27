import { Button, Link } from '@nextui-org/react'
import Image from 'next/image'

import { environment } from '~/utils/environment'

import { useTranslations } from 'next-intl'
import NextLink from 'next/link'
import Container from './Container'
import { FacebookSvg } from './svg-components/FacebookSvg'
import { GitHubSvg } from './svg-components/GitHubSvg'
import { InstagramSvg } from './svg-components/InstagramSvg'
import { LogoBig } from './svg-components/LogoBig'
import { YoutubeSvg } from './svg-components/YoutubeSvg'
import SchonherzLogo from './svg/Schönherz.svg'
import VercelLogo from './svg/powered-by-vercel.svg'

const socials = [
  { key: 'g', icon: GitHubSvg, href: environment.socials.githubOrgUrl },
  { key: 'y', icon: YoutubeSvg, href: environment.socials.youtubeUrl },
  { key: 'i', icon: InstagramSvg, href: environment.socials.instagramUrl },
  { key: 'f', icon: FacebookSvg, href: environment.socials.facebookUrl },
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
    key: '',
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
        <div className="px-1 pb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-400 font-bold w-min">
          {t('sponsors')}
        </div>
        <div className="flex w-full justify-center items-center gap-3 flex-col sm:flex-row">
          {sponsors.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              target="_blank"
              className={`${item.classNameExtra} w-40`}
            >
              <Image
                src={item.src}
                width={item.w}
                height={item.h}
                alt={item.alt}
                className="h-auto w-full"
              />
            </Link>
          ))}
        </div>
      </div>
      <Container>
        <div className="flex justify-between items-center gap-3 flex-col-reverse sm:flex-row pb-10">
          <div className="h-24 sm:h-16 flex flex-col sm:flex-row items-center text-sm mt-10">
            <LogoBig className="h-full w-auto" />
            <div className="hidden sm:block">
              <p>
                {t.rich('partOfSimonyi', {
                  link: (chunks) => (
                    <Link
                      href={environment.simonyiUrl}
                      target="_blank"
                      className="text-sm"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
              <p>
                <NextLink
                  href="/about/contact"
                  className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-sm"
                >
                  {t('contact')}
                </NextLink>
              </p>
              <p>Kir-Dev &copy; {new Date().getFullYear()}</p>
            </div>
            <div className="block sm:hidden text-center">
              <p>
                <Link className="text-sm" href="/about/contact">
                  {t('contact')}
                </Link>
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
                <Button
                  key={item.key}
                  isIconOnly
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent h-10 w-10"
                >
                  <Link
                    href={item.href}
                    target="_blank"
                    className="h-full w-full text-foreground"
                  >
                    <item.icon className="h-full w-auto fill-current" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
