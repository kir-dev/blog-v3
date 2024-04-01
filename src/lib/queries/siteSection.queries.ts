import { SanityClient, groq } from 'next-sanity'
import { SiteSection, TechStack } from '../sanity.types'

export const techStacksQuery = groq`*[_type == "techStack" && defined(key) && language == $language]`

export async function getTechStacks(
  client: SanityClient,
  language: string = 'hu',
): Promise<TechStack[]> {
  return await client.fetch(techStacksQuery, {
    language,
  })
}

export const siteSectionByKeyQuery = groq`*[_type == "siteSection" && key == $key && language == $language][0]`

export async function getSiteSection(
  client: SanityClient,
  key: string,
  language: string = 'hu',
): Promise<SiteSection | undefined> {
  return await client.fetch(siteSectionByKeyQuery, {
    key,
    language,
  })
}
