import type { Access } from 'payload'

export const isAdminOrPublished: Access = ({ req }) => {
  if (req.user?.role === 'admin') {
    return true
  }

  return {
    status: {
      equals: 'published'
    }
  }
}
