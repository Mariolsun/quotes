import type { CollectionConfig } from 'payload'

import { isAdmin } from '@/access/isAdmin'
import { slugField } from '@/fields/slug'

export const Topics: CollectionConfig = {
  slug: 'topics',
  admin: {
    useAsTitle: 'name'
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
      name: 'description',
      type: 'textarea'
    }
  ]
}
