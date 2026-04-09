import type { CollectionConfig } from 'payload'

import { isAdmin } from '@/access/isAdmin'
import { slugField } from '@/fields/slug'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'country', 'birthYear']
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    },
    slugField(),
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'shortBio',
      type: 'textarea'
    },
    {
      name: 'birthYear',
      type: 'number'
    },
    {
      name: 'deathYear',
      type: 'number'
    },
    {
      name: 'country',
      type: 'text'
    }
  ]
}
