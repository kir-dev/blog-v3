import { PortableText } from '@portabletext/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

import ActionButton from '~/components/ActionButton'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { commonSerializer } from '~/utils/serializers/common.serializer'

import { useTranslations } from 'next-intl'
import { NextSeo } from 'next-seo'
import { getSiteSection } from '~/lib/queries'
import { SiteSection } from '~/lib/sanity.types'
import { SharedPageProps } from '../_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    sectionContact?: SiteSection
  }
> = async ({ draftMode = false, locale }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const sectionContact = await getSiteSection(client, 'contact', locale)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      sectionContact,
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  }
}

export default function ContactPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { sectionContact } = props
  const t = useTranslations()
  return (
    <Layout>
      <NextSeo title={t('Contact.title')} />
      <Container>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-6xl mt-16 p-1 font-extrabold tracking-tight">
            {t('Index.ourName')}
          </h1>
          <h2 className="text-3xl mb-8 p-1 text-center w-fit text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-400 font-bold tracking-tight">
            {t('Index.mainTitle')}
          </h2>
          <PortableText
            value={sectionContact?.body ?? []}
            components={commonSerializer}
          />
          <ActionButton href="/about/members" className="mt-12">
            {t('Contact.action.members')}
          </ActionButton>
          <ActionButton href="/about/projects">
            {t('Contact.action.projects')}
          </ActionButton>
        </div>
      </Container>
    </Layout>
  )
}
