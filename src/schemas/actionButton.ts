import { defineType } from 'sanity'

export default defineType({
  name: 'actionButton',
  title: 'Action button',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'string',
    },
    {
      name: 'href',
      title: 'Href',
      type: 'string',
    },
  ],
})
