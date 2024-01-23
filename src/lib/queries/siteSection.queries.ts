import { SanityClient, groq } from 'next-sanity'
import { SiteSection, TechStack } from '../sanity.types'

export const siteSectionsQuery = groq`*[_type == "siteSection" && defined(key)]`

export async function getSiteSections(
  client: SanityClient,
): Promise<SiteSection[]> {
  return await client.fetch(siteSectionsQuery)
}

export const techStacksQuery = groq`*[_type == "techStack" && defined(key)]`

export async function getTechStacks(
  client: SanityClient,
): Promise<TechStack[]> {
  return await client.fetch(techStacksQuery)
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
