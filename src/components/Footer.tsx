import { Button, Link } from '@nextui-org/react'
import Image from 'next/image'

import { siteConfig } from '~/utils/site-config'

import Container from './Container'
import VercelLogo from './svg/powered-by-vercel.svg'
import { FacebookSvg } from './svg-components/FacebookSvg'
import { GitHubSvg } from './svg-components/GitHubSvg'
import { InstagramSvg } from './svg-components/InstagramSvg'
import { LogoBig } from './svg-components/LogoBig'
import { YoutubeSvg } from './svg-components/YoutubeSvg'

const socials = [
  { key: 'g', icon: GitHubSvg, href: siteConfig.links.github },
  { key: 'y', icon: YoutubeSvg, href: siteConfig.links.youtube },
  { key: 'i', icon: InstagramSvg, href: siteConfig.links.instagram },
  { key: 'f', icon: FacebookSvg, href: siteConfig.links.facebook },
]

export default function Footer() {
  return (
    <footer className="flex flex-col gap-10 pt-32">
      <div className="flex flex-col items-center">
        <div className="px-1 pb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-400 font-bold w-min">
          Támogatóink
        </div>
        <div className="flex w-full justify-center items-center gap-3 flex-col sm:flex-row">
          <Link
            href="https://vercel.com?utm_source=kir-dev&utm_campaign=oss"
            className="w-40"
          >
            <Image
              src={VercelLogo}
              width={209}
              height={40}
              alt="Vercel Logo"
              className="h-auto w-full"
            />
          </Link>
          <Link
            href="https://rackhost.hu"
            className="bg-white p-2 rounded-lg w-40"
          >
            <Image
              height={382}
              width={1850}
              src="/images/rackhost.png"
              alt="Rackhost Logo"
              className="h-auto w-full"
            />
          </Link>
          <Link href="https://betteruptime.com/" className="w-40">
            <Image
              height={104}
              width={260}
              alt="Better Uptime Website Monitoring"
              src="https://betteruptime.com/assets/static_assets/badges/light.png"
              className="h-auto w-full"
            />
          </Link>
        </div>
      </div>
      <Container>
        <div className="flex justify-between items-center gap-3 flex-col-reverse sm:flex-row pb-10">
          <div className="h-16 flex flex-col sm:flex-row items-center text-sm mt-10">
            <LogoBig className="h-full w-auto" />
            <div className="hidden sm:block">
              <p>
                A Kir-Dev a{' '}
                <Link
                  href="https://simonyi.bme.hu"
                  target="_blank"
                  className="text-sm"
                >
                  Simonyi Károly Szakkollégium
                </Link>{' '}
                tagszervezete.
              </p>
              <p>Kir-Dev &copy; {new Date().getFullYear()}</p>
            </div>
            <div className="block sm:hidden">
              <p>Kir-Dev &copy; {new Date().getFullYear()}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="px-1 pb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-400 font-bold">
              Közösségi linkek
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
