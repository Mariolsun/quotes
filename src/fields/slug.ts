import type { TextField } from 'payload'

import { slugify } from '@/lib/slugify'

type SlugFieldOptions = {
  from?: string
  overrides?: Partial<TextField>
}

export const slugField = ({ from = 'name', overrides = {} }: SlugFieldOptions = {}): TextField => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    ...overrides.admin
  },
  hooks: {
    beforeValidate: [
      ({ data, value }) => {
        if (typeof value === 'string' && value.length > 0) {
          return slugify(value)
        }

        const sourceValue = data?.[from]
        if (typeof sourceValue === 'string' && sourceValue.length > 0) {
          return slugify(sourceValue)
        }

        return value
      }
    ],
    ...overrides.hooks
  },
  ...overrides
})
