import { SanityClient, groq } from 'next-sanity'
import { Project } from '../sanity.types'

export const projectsQuery = groq`*[_type == "project" && defined(slug.current)]`

export async function getProjects(client: SanityClient): Promise<Project[]> {
  return await client.fetch(projectsQuery)
}

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]`

export async function getProject(
  client: SanityClient,
  slug: string,
): Promise<Project> {
  return await client.fetch(projectBySlugQuery, {
    slug,
  })
}

export async function getHomescreenProjects(
  client: SanityClient,
): Promise<Project[]> {
  return await client.fetch(groq`
    *[_type == "project" && defined(slug.current) && isShownOnHomePage == true]
  `)
}
export const projectSlugsQuery = groq`
*[_type == "project" && defined(slug.current)][].slug.current
`
