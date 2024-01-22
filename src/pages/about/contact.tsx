import { PortableText } from '@portabletext/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

import ActionButton from '~/components/ActionButton'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getSiteSection, SiteSection } from '~/lib/sanity.queries'
import { aboutPageComponents } from '~/utils/portable-text-comps'

import { NextSeo } from 'next-seo'
import { SharedPageProps } from '../_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    sectionContact?: SiteSection
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const sectionContact = await getSiteSection(client, 'contact')

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      sectionContact,
    },
  }
}

export default function ContactPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { sectionContact } = props
  return (
    <Layout>
      <NextSeo title="Kapcsolat" />
      <Container>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-6xl mt-16 p-1 font-extrabold tracking-tight">
            Kir-Dev
          </h1>
          <h2 className="text-3xl mb-8 p-1 text-center w-fit text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-400 font-bold tracking-tight">
            A kollégium webfejlesztő köre
          </h2>
          <PortableText
            value={sectionContact?.body}
            components={aboutPageComponents}
          />
          <ActionButton href="/about/members" className="mt-12">
            Ismerd meg tagjaink
          </ActionButton>
          <ActionButton href="/about/projects">
            Ismerd meg munkáink
          </ActionButton>
        </div>
      </Container>
    </Layout>
  )
}
