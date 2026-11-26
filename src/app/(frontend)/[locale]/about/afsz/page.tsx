import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { RichText } from '~/components/RichText'
import { getSiteSection } from '~/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'AFSZ',
}

export default async function AFSZPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const sectionAFSZ = await getSiteSection('afsz', 'hu')
  const updatedRaw = sectionAFSZ?.contentUpdatedAt ?? sectionAFSZ?.updatedAt ?? ''
  const formattedDate = updatedRaw
    ? new Date(updatedRaw).toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <Layout>
      <Container useCustom>
        <section className="my-8">
          <h2 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
            Általános Felkérési Szabályzat
          </h2>
          <h3 className="text-2xl font-semibold leading-none tracking-tight mt-16">
            Érvényes: 2024. májustól
          </h3>
          <h3 className="text-2xl font-semibold leading-none tracking-tight mt-2">
            Utolsó módosítás: {formattedDate}
          </h3>
          <hr className="mb-8 mt-3 border-foreground/20" />
          <RichText data={sectionAFSZ?.body} variant="afsz" />
        </section>
      </Container>
    </Layout>
  )
}
