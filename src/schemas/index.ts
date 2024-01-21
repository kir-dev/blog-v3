import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import member from './member'
import post from './post'
import project from './project'
import siteSection from './siteSection'
import techStack from './techStack'

export const schemaTypes = [post, blockContent, siteSection, member, techStack, project]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, siteSection, member, techStack, project],
}
