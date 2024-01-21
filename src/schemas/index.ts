import { SchemaTypeDefinition } from 'sanity'

import actionButton from './actionButton'
import blockContent from './blockContent'
import course from './course'
import member from './member'
import post from './post'
import project from './project'
import siteSection from './siteSection'
import techStack from './techStack'

export const schemaTypes = [
  post,
  blockContent,
  siteSection,
  member,
  techStack,
  project,
  course,
]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    blockContent,
    siteSection,
    member,
    techStack,
    project,
    course,
    actionButton,
  ],
}
