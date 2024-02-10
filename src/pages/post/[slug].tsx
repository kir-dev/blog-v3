import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import { NextSeo } from 'next-seo'
import config from 'next-seo.config'
import Image from 'next/image'
import Container from '~/components/Container'

import Layout from '~/components/Layout'
import { getPost, postBySlugQuery, postSlugsQuery } from '~/lib/queries'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import { Post } from '~/lib/sanity.types'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils/date-utils'
import { postPageComponents } from '~/utils/portable-text-comps'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    post: Post
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const post = await getPost(client, params.slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      post,
    },
  }
}

export default function PostSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    slug: props.post.slug.current,
  })

  return (
    <Layout>
      <NextSeo
        title={post.title}
        description={post.excerpt ?? config.description}
        openGraph={{
          images: [
            {
              url:
                urlForImage(post.mainImage)?.url() ??
                config.openGraph.images[0].url,
            },
          ],
          type: 'article',
          title: post.title,
          description: post.excerpt ?? config.openGraph.description,
          article: {
            publishedTime: post._createdAt,
            modifiedTime: post._updatedAt,
            authors: [`https://pek.sch.bme.hu/photos/${post.author}`],
            tags: ['közélet'],
          },
        }}
      />
      <Container
        useCustom
        className="mb-16"
        style={{ wordBreak: 'break-word' }}
      >
        {post.mainImage ? (
          <Image
            src={urlForImage(post.mainImage)?.url()}
            height={500}
            width={1000}
            className="object-cover rounded-md w-full h-[50vh]"
            alt=""
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
              <p>{formatDate(post._createdAt)}</p>
              <p>by {post.author ?? 'anonymous'}</p>
              {post.hashTag && <p>#{post.hashTag}</p>}
            </div>
          </div>
        </div>
        <div className="mt-16 break-words">
          <PortableText value={post.body} components={postPageComponents} />
        </div>
      </Container>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(postSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/post/${slug}`) || [],
    fallback: 'blocking',
  }
}
