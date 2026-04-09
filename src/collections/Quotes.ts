import type { CollectionConfig } from 'payload'

import { isAdmin } from '@/access/isAdmin'
import { isAdminOrPublished } from '@/access/isAdminOrPublished'
import { slugField } from '@/fields/slug'

export const Quotes: CollectionConfig = {
  slug: 'quotes',
  admin: {
    useAsTitle: 'text',
    defaultColumns: ['text', 'author', 'status', 'publishedAt']
  },
  access: {
    read: isAdminOrPublished,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true
    },
    slugField({ from: 'text' }),
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true
    },
    {
      name: 'sourceTitle',
      type: 'text'
    },
    {
      name: 'sourceYear',
      type: 'number'
    },
    {
      name: 'language',
      type: 'text',
      defaultValue: 'ru'
    },
    {
      name: 'topics',
      type: 'relationship',
      relationTo: 'topics',
      hasMany: true
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' }
      ]
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime'
        }
      }
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false
    },
    {
      name: 'quoteContextInfo',
      type: 'textarea'
    }
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.status === 'published' && !data.publishedAt) {
          return {
            ...data,
            publishedAt: new Date().toISOString()
          }
        }

        return data
      }
    ]
  }
}
