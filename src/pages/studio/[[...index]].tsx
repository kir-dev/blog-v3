import { NextStudio, metadata } from 'next-sanity/studio'
import Head from 'next/head'
import config from 'sanity.config'

export default function StudioPage() {
  return (
    <>
      <Head>
        {Object.entries(metadata).map(([key, value]) => (
          <meta key={key} name={key} content={value} />
        ))}
      </Head>
      <NextStudio config={config} unstable_globalStyles />
    </>
  )
}
