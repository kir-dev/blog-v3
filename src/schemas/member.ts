import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({
      name: 'pekUsername',
      title: 'PéK username',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rank',
      title: 'Rank',
      type: 'string',
    }),
    defineField({
      name: 'isActive',
      title: 'Is active member?',
      type: 'boolean',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'hoverImage',
      title: 'Hover image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainImage',
    },
    prepare(selection) {
      return { ...selection }
    },
  },
})
