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
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  preview: {
    prepare(selection) {
      return { ...selection }
    },
  },
})
