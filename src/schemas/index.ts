import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import siteSection from './siteSection'

export const schemaTypes = [post, blockContent, siteSection]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, siteSection],
}
