import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ActionButton from '~/components/ActionButton'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import PostPreview from '~/components/post-components/PostPreview'
import { getPosts } from '~/lib/payload'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Blog' })
  return { title: t('title') }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Blog')
  const posts = await getPosts(4)

  return (
    <Layout>
      <Container>
        <h1 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
          {t('title')}
        </h1>
        <hr className="my-8 border-foreground/20" />
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {posts.map(({ post, author }) => (
            <PostPreview
              key={post.id}
              post={post}
              author={author}
              className="lg:last:hidden"
            />
          ))}
        </section>
        <div className="text-end my-12">
          <ActionButton href="/archive">{t('action')}</ActionButton>
        </div>
      </Container>
    </Layout>
  )
}
