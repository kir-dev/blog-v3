import config from '@payload-config'
import { getPayload } from 'payload'
import type {
  Course,
  Member,
  Post,
  Project,
  SiteSection,
  TechStack,
} from '~/payload-types'
import { estimateReadingTime } from './rich-text'

export type SupportedLocale = 'hu' | 'en'

export interface EnrichedPost extends Post {
  estimatedReadingTime: number
}

export interface PostWithAuthor {
  post: EnrichedPost
  author?: Member | null
}

function normalizeLocale(locale?: string): SupportedLocale {
  return locale === 'en' ? 'en' : 'hu'
}

function resolveMember(author: Post['author']): Member | null {
  if (!author || typeof author === 'number') return null
  return author
}

export async function getPosts(limit = 4): Promise<PostWithAuthor[]> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit,
    depth: 2,
  })

  return res.docs.map((doc) => ({
    post: {
      ...doc,
      estimatedReadingTime: estimateReadingTime(doc.body),
    },
    author: resolveMember(doc.author),
  }))
}

export async function getArchive(): Promise<
  Pick<Post, 'id' | 'title' | 'slug' | 'publishedAt'>[]
> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: 1000,
    depth: 0,
    select: {
      title: true,
      slug: true,
      publishedAt: true,
    },
  })

  return res.docs
}

export async function getLatestPost(): Promise<PostWithAuthor | null> {
  const posts = await getPosts(1)
  return posts[0] ?? null
}

export async function getPostBySlug(slug: string): Promise<EnrichedPost | null> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    depth: 2,
  })

  const doc = res.docs[0]
  if (!doc) return null
  return {
    ...doc,
    estimatedReadingTime: estimateReadingTime(doc.body),
  }
}

export async function getProjects(): Promise<Project[]> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'projects',
    sort: '-priority',
    limit: 200,
    depth: 2,
  })

  return res.docs
}

export async function getHomescreenProjects(): Promise<Project[]> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'projects',
    where: {
      isShownOnHomePage: { equals: true },
    },
    sort: '-priority',
    limit: 100,
    depth: 2,
  })

  return res.docs
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'projects',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    depth: 2,
  })

  return res.docs[0] ?? null
}

export async function getMembers(): Promise<Member[]> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'members',
    limit: 500,
    depth: 1,
  })

  return [...res.docs].sort((a, b) => a.lastName.localeCompare(b.lastName, 'hu'))
}

export async function getCourses(): Promise<Course[]> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'courses',
    where: {
      isShown: { equals: true },
    },
    sort: '-priority',
    limit: 100,
    depth: 2,
  })

  return res.docs
}

export async function getSiteSection(
  key: string,
  locale?: string,
): Promise<SiteSection | null> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'site-sections',
    where: {
      key: { equals: key },
    },
    locale: normalizeLocale(locale),
    fallbackLocale: 'hu',
    limit: 1,
    depth: 2,
  })

  return res.docs[0] ?? null
}

export async function getTechStacks(locale?: string): Promise<TechStack[]> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'tech-stacks',
    sort: 'priority',
    locale: normalizeLocale(locale),
    fallbackLocale: 'hu',
    limit: 100,
    depth: 1,
  })

  return res.docs
}
