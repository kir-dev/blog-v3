import { SanityClient, groq } from 'next-sanity'
import { Post, PostWithAuthor, ReducedPost } from '../sanity.types'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc){
  "estimatedReadingTime": round(length(pt::text(body)) / 6 / 200 + 1),
  "member": *[_type == 'member' && pekUsername == ^.author][0],
  ...
}[0..3]`

export const archiveQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc){
  _id,
  _createdAt,
  title,
  slug
}`

export const getPosts = async (
  client: SanityClient,
): Promise<PostWithAuthor[]> => {
  const posts = await client.fetch(postsQuery)
  return posts.map((post) => {
    return {
      post: post,
      author: post.member,
    }
  })
}

export const getArchive = async (
  client: SanityClient,
): Promise<ReducedPost[]> => client.fetch(archiveQuery)

export const latestPostQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc){
  "estimatedReadingTime": round(length(pt::text(body)) / 6 / 200 + 1),
  "member": *[_type == 'member' && pekUsername == ^.author][0],
  ...
}[0]`

export async function getLatestPost(
  client: SanityClient,
): Promise<PostWithAuthor> {
  const post = await client.fetch(latestPostQuery)
  return {
    post: post,
    author: post.member,
  }
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`

export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`
