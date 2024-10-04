import '~/styles/global.css'
import '~/styles/prism-okaidia.css'

import SEO from '../../next-seo.config'

import { NextUIProvider } from '@nextui-org/react'
import { NextIntlClientProvider } from 'next-intl'
import PlausibleProvider from 'next-plausible'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { lazy } from 'react'
import Refractor from 'react-refractor'
import { RefractorSyntax } from 'refractor'
import bash from 'refractor/lang/bash'
import css from 'refractor/lang/css'
import docker from 'refractor/lang/docker'
import java from 'refractor/lang/java'
import js from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import kt from 'refractor/lang/kotlin'
import md from 'refractor/lang/markdown'
import htmlEtc from 'refractor/lang/markup'
import py from 'refractor/lang/python'
import rb from 'refractor/lang/ruby'
import sql from 'refractor/lang/sql'
import tsx from 'refractor/lang/tsx'
import ts from 'refractor/lang/typescript'
import yaml from 'refractor/lang/yaml'

export interface SharedPageProps {
  draftMode: boolean
  token: string
  messages: Record<string, string>
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))

const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
})

const loadLangs = (langs: RefractorSyntax[]) =>
  langs.forEach(Refractor.registerLanguage)

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  loadLangs([
    bash,
    docker,
    js,
    rb,
    tsx,
    ts,
    yaml,
    css,
    java,
    json,
    kt,
    md,
    py,
    sql,
    htmlEtc,
  ])
  const router = useRouter()

  return (
    <>
      <DefaultSeo {...SEO} />
      <Script
        id="YeetGatsby"
        dangerouslySetInnerHTML={{
          __html: `
          if(window.navigator && navigator.serviceWorker) {
            navigator.serviceWorker.getRegistrations()
              .then(function(registrations) {
                for(let registration of registrations) {
                  registration.unregister();
                }
              });
          }`,
        }}
      />
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <NextUIProvider navigate={router.push}>
        <ThemeProvider
          themes={['dark', 'light']}
          attribute="class"
          defaultTheme="dark"
        >
          <PlausibleProvider
            domain="kir-dev.hu"
            selfHosted
            customDomain={process.env.NEXT_PUBLIC_PLAUSIBLE_URL}
          >
            <NextIntlClientProvider
              locale={router.locale}
              timeZone="Europe/Budapest"
              messages={pageProps.messages}
            >
              <main>
                {draftMode ? (
                  <PreviewProvider token={token}>
                    <Component {...pageProps} />
                  </PreviewProvider>
                ) : (
                  <Component className="flex-1 pb-10" {...pageProps} />
                )}
              </main>
            </NextIntlClientProvider>
          </PlausibleProvider>
        </ThemeProvider>
      </NextUIProvider>
    </>
  )
}
