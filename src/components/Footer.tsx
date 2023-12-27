import { Link } from '@nextui-org/react'
import Image from 'next/image'

import Container from './Container'
import KirDevLogo from './svg/kirdev-named.svg'
import VercelLogo from './svg/powered-by-vercel.svg'

export default function Footer() {
  return (
    <footer className="border-t-1 border-solid border-gray-200 dark:border-gray-700 pt-4">
      <div className="d-flex flex-col">
        <p className="px-1 bg-clip-text bg-gradient-to-r from-red-400 to-orange-300 font-bold">
          Támogatóink
        </p>
        <div className="d-flex justify-content-center align-items-center gap-3 flex-col sm:flex-row">
          <Link
            href="https://vercel.com?utm_source=kir-dev&utm_campaign=oss"
            className="relative h-12"
          >
            <Image src={VercelLogo} fill alt="Vercel Logo" />
          </Link>
          <Link
            href="https://rackhost.hu"
            className="bg-white p-2 rounded-sm relative h-12"
          >
            <Image fill src="/images/rackhost.png" alt="Rackhost Logo" />
          </Link>
          <Link href="https://betteruptime.com/" className="relative h-12">
            <Image
              fill
              alt="Better Uptime Website Monitoring"
              src="https://betteruptime.com/assets/static_assets/badges/light.png"
            />
          </Link>
        </div>
      </div>
      <Container>
        <div className="d-flex justify-content-center align-items-center gap-3 flex-col-reverse sm:flex-row">
          <div className="relative h-16 text-background dark:text-foreground">
            <Image src={KirDevLogo} fill alt="Kir Dev Logo" />
          </div>
        </div>
      </Container>
    </footer>
  )
}
