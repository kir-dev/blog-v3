import type { CollectionConfig } from 'payload'

export const SiteSections: CollectionConfig = {
  slug: 'site-sections',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'key',
    defaultColumns: ['key', 'isHidden', 'updatedAt'],
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'isHidden',
      type: 'checkbox',
      label: 'Should it be hidden?',
      defaultValue: false,
      localized: true,
    },
    {
      name: 'body',
      type: 'richText',
      localized: true,
    },
    {
      name: 'contentUpdatedAt',
      type: 'date',
      localized: true,
      admin: {
        description:
          'Last content modification date (displayed on AFSZ pages and used for frontAlert dismissal).',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
