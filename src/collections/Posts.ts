import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'author', 'hashTag'],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.title) {
          const datePrefix = (
            data.publishedAt
              ? new Date(data.publishedAt).toISOString()
              : new Date().toISOString()
          ).slice(0, 10)
          data.slug =
            datePrefix +
            '-' +
            slugify(String(data.title), {
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
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'Auto-generated as YYYY-MM-DD-<title> when left blank on creation.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      index: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'members',
      admin: {
        description: 'Linked Kir-Dev member profile.',
      },
    },
    {
      name: 'authorUsername',
      type: 'text',
      label: 'Author (PéK username fallback)',
      admin: {
        description:
          'Used when the author does not have a matching Member record.',
      },
    },
    {
      name: 'hashTag',
      type: 'text',
      label: 'Hashtag (without #)',
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'hasToc',
      type: 'checkbox',
      label: 'Show table of contents before body?',
      defaultValue: false,
    },
    {
      name: 'body',
      type: 'richText',
    },
    {
      name: 'sanityId',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
  ],
}
