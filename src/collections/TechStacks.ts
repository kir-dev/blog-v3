import type { CollectionConfig } from 'payload'

export const TechStacks: CollectionConfig = {
  slug: 'tech-stacks',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'key',
    defaultColumns: ['key', 'name', 'priority'],
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
      name: 'name',
      type: 'text',
      localized: true,
    },
    {
      name: 'priority',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'body',
      type: 'textarea',
      localized: true,
    },
  ],
}
