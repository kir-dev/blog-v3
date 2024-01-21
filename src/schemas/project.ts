import { defineField, defineType } from 'sanity'
import slugify from 'slugify'
import { projectStatusMapping } from '~/utils/project-status'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (e.g. "pek-next")',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: 'title',
        slugify: (input) =>
          slugify(input, {
            lower: true,
            strict: true,
            locale: 'hu',
          }).slice(0, 200),
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: projectStatusMapping,
      },
    }),
    defineField({
      name: 'priority',
      title: 'Priority (highest on top)',
      type: 'number',
    }),
    defineField({
      name: 'shortDesc',
      title: 'Short description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'githubRepos',
      title: 'GitHub repos (github.com/<insert>, e.g. "kir-dev/pek-next")',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'techStacks',
      title: 'Tech stacks',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.max(3).unique(),
    }),
    defineField({
      name: 'homePageUrls',
      title: 'Home page URLs',
      type: 'array',
      of: [{ type: 'url' }],
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
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
    prepare(selection) {
      return { ...selection }
    },
  },
})
