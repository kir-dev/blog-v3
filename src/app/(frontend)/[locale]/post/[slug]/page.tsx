import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { RichText } from '~/components/RichText'
import { TableOfContents } from '~/components/TableOfContents'
import { getMediaUrl } from '~/lib/media'
import { getPostBySlug } from '~/lib/payload'
import { siteConfig } from '~/lib/site-config'
import { formatDate } from '~/utils/date-utils'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(decodeURIComponent(slug))
  if (!post) return {}

  const imageUrl = getMediaUrl(post.mainImage) ?? siteConfig.defaultOgImage
  const authorHandle =
    typeof post.author === 'object' && post.author
      ? post.author.pekUsername
      : post.authorUsername

  return {
    title: post.title,
    description: post.excerpt ?? siteConfig.description,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt ?? siteConfig.shortDescription,
      images: [{ url: imageUrl }],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: authorHandle
        ? [`https://pek.sch.bme.hu/photos/${authorHandle}`]
        : undefined,
      tags: ['közélet'],
    },
  }
}

export default async function PostSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const post = await getPostBySlug(decodeURIComponent(slug))
  if (!post) notFound()

  const t = await getTranslations('Post')
  const mainImageUrl = getMediaUrl(post.mainImage)
  const authorDisplay =
    typeof post.author === 'object' && post.author
      ? post.author.pekUsername
      : post.authorUsername ?? 'anonymous'

  return (
    <Layout>
      <Container
        useCustom
        className="mb-16"
        style={{ wordBreak: 'break-word' }}
      >
        {mainImageUrl ? (
          <Image
            src={mainImageUrl}
            height={500}
            width={1000}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover rounded-md w-full h-[50vh] mt-4"
            alt={post.title}
          />
        ) : (
          <div className="mt-16" />
        )}
        <div className="flex flex-row flex-wrap justify-between gap-4 mt-8 mb-4">
          <div>
            <h1 className="text-4xl tracking-tighter font-extrabold">
              {post.title}
            </h1>
          </div>
          <div className="flex-1 flex flex-row justify-end whitespace-nowrap">
            <div className="text-small text-foreground-500 text-end flex flex-col gap-1">
              <p>{formatDate(post.publishedAt)}</p>
              <p>by {authorDisplay}</p>
              {post.hashTag && <p>#{post.hashTag}</p>}
            </div>
          </div>
        </div>
        <div className="mt-16 break-words">
          {post.hasToc && (
            <>
              <h2 className="text-4xl font-extrabold leading-none tracking-tight py-4 mt-8">
                {t('toc')}
              </h2>
              <TableOfContents data={post.body} />
            </>
          )}
          <RichText data={post.body} variant="post" />
        </div>
      </Container>
    </Layout>
  )
}
