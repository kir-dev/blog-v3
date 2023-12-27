import '~/styles/global.css'
import '~/styles/prism-okaidia.css'

import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
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

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}
