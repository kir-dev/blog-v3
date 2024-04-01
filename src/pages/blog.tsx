import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import ActionButton from '~/components/ActionButton'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import PostPreview from '~/components/post-components/PostPreview'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'

import { NextSeo } from 'next-seo'
import { getPosts, postsQuery } from '~/lib/queries'
import { PostWithAuthor } from '~/lib/sanity.types'
import { SharedPageProps } from './_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: PostWithAuthor[]
  }
> = async ({ draftMode = false, locale }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  }
}

export default function BlogPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [posts] = useLiveQuery<PostWithAuthor[]>(props.posts, postsQuery)
  return (
    <Layout>
      <NextSeo title="Blog" />
      <Container>
        <h1 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
          Blog
        </h1>
        <hr className="my-8" />
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {posts.map(({ post, author }) => (
            <PostPreview
              key={post._id}
              post={post}
              author={author}
              className="lg:last:hidden"
            />
          ))}
        </section>
        <div className="text-end my-12">
          <ActionButton href="/archive">Archívum megtekintése</ActionButton>
        </div>
      </Container>
    </Layout>
  )
}
