import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ActionButton from '~/components/ActionButton'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { RichText } from '~/components/RichText'
import { getSiteSection, getTechStacks } from '~/lib/payload'
import { getStackSvg } from '~/utils/tech-stack'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'History' })
  return { title: t('title') }
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('History')

  const [sectionHistory, sectionTechStack, sectionTeamwork, techStacks] =
    await Promise.all([
      getSiteSection('history', locale),
      getSiteSection('techstack', locale),
      getSiteSection('teamwork', locale),
      getTechStacks(locale),
    ])

  return (
    <Layout>
      <Container useCustom>
        <section className="my-8">
          <h2 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
            {t('sectionHistory.title')}
          </h2>
          <hr className="my-8 border-foreground/20" />
          <RichText data={sectionHistory?.body} variant="common" />
        </section>

        <section className="my-8 mt-24">
          <h2 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
            {t('sectionTechStack.title')}
          </h2>
          <hr className="my-8 border-foreground/20" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStacks.map((item) => (
              <article
                key={item.key}
                className="flex flex-col gap-2 border-foreground-500 border-1 rounded-lg p-8"
              >
                <div>{getStackSvg(item.key)}</div>
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-foreground-500">{item.body}</p>
              </article>
            ))}
          </div>
          <ActionButton href="/about/projects" className="mt-8 mb-4">
            {t('sectionTechStack.action')}
          </ActionButton>
          <RichText data={sectionTechStack?.body} variant="common" />
        </section>

        <section className="my-8 mt-24">
          <h2 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
            {t('sectionTeamwork.title')}
          </h2>
          <hr className="my-8 border-foreground/20" />
          <RichText data={sectionTeamwork?.body} variant="common" />
        </section>
      </Container>
    </Layout>
  )
}
