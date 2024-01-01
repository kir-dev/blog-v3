import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import member from './member'
import post from './post'
import siteSection from './siteSection'

export const schemaTypes = [post, blockContent, siteSection, member]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, siteSection, member],
}
