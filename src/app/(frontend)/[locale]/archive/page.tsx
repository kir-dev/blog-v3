import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ActionButton from '~/components/ActionButton'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { getArchive } from '~/lib/payload'
import { formatDateEasy } from '~/utils/date-utils'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Blog' })
  return { title: t('archiveTitle') }
}

export default async function ArchivePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Blog')
  const posts = await getArchive()

  return (
    <Layout>
      <Container>
        <h1 className="text-4xl font-bold my-16">{t('archiveTitle')}</h1>
        <ul className="flex flex-col gap-2">
          {posts.map((post) => (
            <li key={post.id} className="flex flex-wrap items-center gap-x-4">
              <div>{formatDateEasy(post.publishedAt)}</div>
              <ActionButton href={`/post/${post.slug}`}>
                {post.title}
              </ActionButton>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  )
}
