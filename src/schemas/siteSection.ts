import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSection',
  title: 'Site Section',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isHidden',
      title: 'Should it be hidden?',
      type: 'boolean',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'key',
    },
    prepare(selection) {
      return { ...selection }
    },
  },
})
