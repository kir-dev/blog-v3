import { SchemaTypeDefinition } from 'sanity'

import actionButton from './actionButton'
import blockContent from './blockContent'
import course from './course'
import member from './member'
import post from './post'
import project from './project'
import siteSection from './siteSection'
import techStack from './techStack'
import youtubeEmbed from './youtubeEmbed'

export const schemaTypes = [
  post,
  blockContent,
  siteSection,
  member,
  techStack,
  project,
  course,
]

/**
 * These can be used as building blocks in general.
 * When you define a new schemaType, export it here too.
 * Always check sanity.config.ts in the root and include schemaTypes
 * in the i18n plugin that you want to be able to translate.
 *
 * Any schemaType that is document, will be available as high level building
 * blocks in the studio "Contents" pane.
 */
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
    youtubeEmbed,
  ],
}
