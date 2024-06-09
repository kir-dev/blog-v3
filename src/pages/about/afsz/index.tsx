import { PortableText } from '@portabletext/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { afszSerializer } from '~/utils/serializers/afsz.serializer'

import { useTranslations } from 'next-intl'
import { NextSeo } from 'next-seo'
import { getSiteSection } from '~/lib/queries'
import { SiteSection } from '~/lib/sanity.types'
import { SharedPageProps } from '../../_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    sectionAFSZ?: SiteSection
  }
> = async ({ draftMode = false, locale }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const sectionAFSZ = await getSiteSection(client, 'afsz', 'hu')

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      sectionAFSZ,
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  }
}

export default function AFSZPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { sectionAFSZ } = props
  const t = useTranslations('History')
  const DatesectionAFSZ = new Date(
    sectionAFSZ?._updatedAt || '',
  ).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return (
    <Layout>
      <NextSeo title="AFSZ" />
      <Container useCustom>
        <section className="my-8">
          <h2 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
            Általános Felkérési Szabályzat
          </h2>
          <h3 className="text-2xl font-semibold leading-none tracking-tight mt-16">
            Érvényes: 2024. májustól
          </h3>
          <h3 className="text-2xl font-semibold leading-none tracking-tight mt-2">
            Utolsó módosítás: {DatesectionAFSZ}
          </h3>
          <hr className="mb-8 mt-3" />
          <PortableText
            value={sectionAFSZ?.body ?? []}
            components={afszSerializer}
          />
        </section>
        <div></div>
      </Container>
    </Layout>
  )
}
