import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Container from '~/components/Container'

import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getPost,
  postBySlugQuery,
  postSlugsQuery,
  type Post,
} from '~/lib/sanity.queries'
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
      <NextSeo title={post.title} /* TODO: better SEO */ />
      <Container useCustom className="post my-16">
        {post.mainImage ? (
          <Image
            className="post__cover"
            src={urlForImage(post.mainImage).url()}
            height={231}
            width={367}
            alt=""
          />
        ) : (
          <div className="post__cover--none" />
        )}
        <div className="post__container">
          <h1 className="text-4xl tracking-tighter font-extrabold my-8">
            {post.title}
          </h1>
          <p className="post__excerpt">{post.excerpt}</p>
          <p className="post__date">{formatDate(post._createdAt)}</p>
          <div className="post__content mt-16">
            <PortableText value={post.body} components={postPageComponents} />
          </div>
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
