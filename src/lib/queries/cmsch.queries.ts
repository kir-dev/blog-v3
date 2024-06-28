import { groq } from 'next-sanity'
import { SanityClient } from 'sanity'
import { CMSCHFeature } from '../sanity.types'

export const cmschFeatureByKeyQuery = groq`*[_type == "cmschFeat"]`

export async function getCMSCHFeatures(
  client: SanityClient,
): Promise<CMSCHFeature[] | undefined> {
  return await client.fetch(cmschFeatureByKeyQuery, {})
}
