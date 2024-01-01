import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useLiveQuery } from 'next-sanity/preview'

import ActionButton from '~/components/ActionButton'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import PostPreview from '~/components/post-components/PostPreview'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, Post, postsQuery } from '~/lib/sanity.queries'

import { SharedPageProps } from './_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
    },
  }
}

export default function BlogPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
  return (
    <Layout>
      <Container>
        <h1 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
          Blog
        </h1>
        <hr className="my-8" />
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {posts.map((post) => (
            <PostPreview key={post._id} post={post} />
          ))}
        </section>
        <div className="text-end my-12">
          <ActionButton href="/archive">Archívum megtekintése</ActionButton>
        </div>
      </Container>
    </Layout>
  )
}
