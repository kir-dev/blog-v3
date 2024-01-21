import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'isShown',
      title: 'Should it be displayed?',
      type: 'boolean',
    }),
    defineField({
      name: 'priority',
      title: 'Priority (highest on top)',
      type: 'number',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'lecturers',
      title: 'Full name of lecturers',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'lectures',
      title: 'Lectures',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'dateTimeInterval',
              title: 'Date and time interval',
              type: 'string',
            },
            {
              name: 'place',
              title: 'Place',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return { ...selection }
    },
  },
})
