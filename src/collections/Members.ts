import type { CollectionConfig } from 'payload'
import { memberRankMapping } from '~/utils/member-rank'

export const Members: CollectionConfig = {
  slug: 'members',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'pekUsername', 'rank', 'isActive'],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data && (data.lastName || data.firstName)) {
          data.fullName = `${data.lastName ?? ''} ${data.firstName ?? ''}`.trim()
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'pekUsername',
      type: 'text',
      label: 'PéK username',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'rank',
      type: 'select',
      options: memberRankMapping.map(({ title, value }) => ({
        label: title,
        value,
      })),
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Is active member?',
      defaultValue: true,
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'hoverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'darkImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Dark mode image',
    },
    {
      name: 'darkHoverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Dark mode hover image',
    },
  ],
}
