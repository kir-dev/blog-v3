import { groq, SanityClient } from 'next-sanity'
import { Member } from '../sanity.types'

export const membersQuery = groq`*[_type == "member" && defined(pekUsername)]`

export async function getMembers(client: SanityClient): Promise<Member[]> {
  return await client.fetch(membersQuery)
}
