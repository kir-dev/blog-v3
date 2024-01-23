import { SanityClient, groq } from 'next-sanity'
import { Course } from '../sanity.types'

export const coursesQuery = groq`*[_type == "course"]`

export async function getCourses(client: SanityClient): Promise<Course[]> {
  return await client.fetch(coursesQuery)
}
