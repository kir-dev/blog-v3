import { defineField, defineType } from 'sanity'
import { memberRankMapping } from '~/utils/member-rank'

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
      name: 'lastName',
      title: 'Last name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'firstName',
      title: 'First name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rank',
      title: 'Rank',
      type: 'string',
      options: {
        list: memberRankMapping,
      },
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
    defineField({
      name: 'darkImage',
      title: 'Dark mode image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'darkHoverImage',
      title: 'Dark mode hover image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      media: 'mainImage',
    },
    prepare(selection) {
      return {
        ...selection,
        title: `${selection.lastName} ${selection.firstName}`,
      }
    },
  },
})
