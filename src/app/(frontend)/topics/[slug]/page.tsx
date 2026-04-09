import { notFound } from 'next/navigation'

import { QuoteCard } from '@/components/quotes/quote-card'
import { getQuotesByCondition, getTopicBySlug } from '@/lib/queries'

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const topic = await getTopicBySlug(slug)

  if (!topic) {
    notFound()
  }

  const quotes = await getQuotesByCondition({
    topics: {
      contains: topic.id
    }
  })

  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Тема: {topic.name}</h1>
      {topic.description ? <p className="text-sm text-muted-foreground">{topic.description}</p> : null}

      {quotes.docs.map((quote) => (
        <QuoteCard key={quote.id} quote={quote} />
      ))}
    </section>
  )
}
