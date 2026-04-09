import type { Where } from 'payload'

import { getPayloadClient } from '@/lib/payload'

export const getFeedQuotes = async () => {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'quotes',
    where: {
      status: {
        equals: 'published'
      }
    },
    sort: '-publishedAt',
    depth: 2,
    limit: 24
  })
}

export const getQuoteBySlug = async (slug: string) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'quotes',
    where: {
      slug: {
        equals: slug
      }
    },
    depth: 2,
    limit: 1
  })

  return result.docs[0] || null
}

export const getAuthorBySlug = async (slug: string) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'authors',
    where: {
      slug: {
        equals: slug
      }
    },
    depth: 1,
    limit: 1
  })

  return result.docs[0] || null
}

export const getTopicBySlug = async (slug: string) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'topics',
    where: {
      slug: {
        equals: slug
      }
    },
    depth: 1,
    limit: 1
  })

  return result.docs[0] || null
}

export const getQuotesByCondition = async (where: Where) => {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'quotes',
    where: {
      and: [
        where,
        {
          status: {
            equals: 'published'
          }
        }
      ]
    },
    sort: '-publishedAt',
    depth: 2,
    limit: 24
  })
}
