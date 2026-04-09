import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true
    }
  ],
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'avatar',
        width: 160,
        height: 160,
        position: 'centre'
      }
    ],
    mimeTypes: ['image/*']
  }
}
