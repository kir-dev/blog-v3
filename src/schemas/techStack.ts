import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'techStack',
  title: 'Tech Stack',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 2,
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
