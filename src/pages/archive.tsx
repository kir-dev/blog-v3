import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import ActionButton from '~/components/ActionButton'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { getArchive } from '~/lib/queries'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { Post } from '~/lib/sanity.types'
import { formatDateEasy } from '~/utils/date-utils'
import { SharedPageProps } from './_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getArchive(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
    },
  }
}

export default function ArchivePage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { posts } = props

  return (
    <Layout>
      <NextSeo title="Blog archívum" />
      <Container>
        <h1 className="text-4xl font-bold my-16">Archívum</h1>
        <ul className="flex flex-col gap-2">
          {posts?.map((post) => (
            <li key={post._id} className="flex flex-wrap items-center gap-x-4">
              <div>{formatDateEasy(post._createdAt)}</div>
              <ActionButton href={`/post/${post.slug.current}`}>
                {post.title}
              </ActionButton>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  )
}
