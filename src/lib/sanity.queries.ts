import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc){
  "estimatedReadingTime": round(length(pt::text(body)) / 6 / 200 + 1),
  ...
}`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export const siteSectionsQuery = groq`*[_type == "siteSection" && defined(key)]`

export async function getSiteSections(
  client: SanityClient,
): Promise<SiteSection[]> {
  return await client.fetch(siteSectionsQuery)
}

export async function getLatestPost(client: SanityClient): Promise<Post> {
  return await client.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)[0]{
      "estimatedReadingTime": round(length(pt::text(body)) / 6 / 200 + 1),
      ...
    }`,
  )
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

export const siteSectionByKeyQuery = groq`*[_type == "siteSection" && key == $key][0]`

export async function getSiteSection(
  client: SanityClient,
  key: string,
): Promise<SiteSection | undefined> {
  return await client.fetch(siteSectionByKeyQuery, {
    key,
  })
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  author?: string
  excerpt?: string
  mainImage?: ImageAsset
  estimatedReadingTime?: number
  body: PortableTextBlock[]
}

export interface SiteSection {
  _type: 'siteSection'
  _id: string
  _createdAt: string
  key: string
  body: PortableTextBlock[]
}
