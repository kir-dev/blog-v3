import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ActionButton from '~/components/ActionButton'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { RichText } from '~/components/RichText'
import { getSiteSection } from '~/lib/payload'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Contact' })
  return { title: t('title') }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const sectionContact = await getSiteSection('contact', locale)

  return (
    <Layout>
      <Container>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-6xl mt-16 p-1 font-extrabold tracking-tight">
            {t('Index.ourName')}
          </h1>
          <h2 className="text-3xl mb-8 p-1 text-center w-fit text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-400 font-bold tracking-tight">
            {t('Index.mainTitle')}
          </h2>
          <RichText data={sectionContact?.body} variant="common" />
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
