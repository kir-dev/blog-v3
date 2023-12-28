import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import Layout from '~/components/Layout'
import PostPreview from '~/components/PostPreview'
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
      <h1 className="text-4xl font-bold my-16">Legújabb posztjaink</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostPreview key={post._id} post={post} />
        ))}
      </section>
      <div className="flex text-xl justify-end mt-6">
        <Link href="/archive">Még több...</Link>
      </div>
    </Layout>
  )
}
