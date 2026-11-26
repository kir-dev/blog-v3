import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isShown', 'priority'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'isShown',
      type: 'checkbox',
      label: 'Should it be displayed?',
      defaultValue: true,
    },
    {
      name: 'priority',
      type: 'number',
      label: 'Priority (highest on top)',
      defaultValue: 0,
    },
    {
      name: 'body',
      type: 'richText',
    },
    {
      name: 'lecturers',
      type: 'array',
      label: 'Full name of lecturers',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'lectures',
      type: 'array',
      fields: [
        {
          name: 'dateTimeInterval',
          type: 'text',
          label: 'Date and time interval',
        },
        {
          name: 'place',
          type: 'text',
        },
        {
          name: 'description',
          type: 'text',
          admin: {
            description: 'Can leave blank, will be displayed under.',
          },
        },
        {
          name: 'getIconName',
          type: 'text',
          label: 'Icon name',
          admin: {
            description:
              'https://github.com/get-icon/geticon/raw/master/icons/<Icon name>.svg - Can leave blank.',
          },
        },
      ],
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
