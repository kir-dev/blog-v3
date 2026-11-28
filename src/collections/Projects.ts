import type { CollectionConfig } from 'payload'
import slugify from 'slugify'
import { projectStatusMapping } from '~/utils/project-status'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'priority', 'isShownOnHomePage'],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.title) {
          data.slug = slugify(String(data.title), {
            lower: true,
            strict: true,
            locale: 'hu',
          }).slice(0, 200)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Project name',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL slug (e.g. "pek-next").',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: projectStatusMapping.map(({ title, value }) => ({
        label: title,
        value,
      })),
    },
    {
      name: 'priority',
      type: 'number',
      label: 'Priority (highest on top)',
      defaultValue: 0,
    },
    {
      name: 'shortDesc',
      type: 'textarea',
      label: 'Short description',
    },
    {
      name: 'githubRepos',
      type: 'array',
      label: 'GitHub repos (e.g. "kir-dev/pek-next")',
      fields: [
        {
          name: 'repo',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'techStacks',
      type: 'array',
      label: 'Tech stacks',
      maxRows: 3,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'homePageUrls',
      type: 'array',
      label: 'Home page URLs',
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'mobileMainImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'isShownOnHomePage',
      type: 'checkbox',
      label: 'Show on home page',
      defaultValue: false,
    },
    {
      name: 'body',
      type: 'richText',
    },
  ],
}
