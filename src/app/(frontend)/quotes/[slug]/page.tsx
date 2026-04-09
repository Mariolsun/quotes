import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { getQuoteBySlug } from '@/lib/queries'

export default async function QuotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const quote = await getQuoteBySlug(slug)

  if (!quote || quote.status !== 'published') {
    notFound()
  }

  const author = typeof quote.author === 'object' ? quote.author : null
  const topics = (quote.topics || []).filter((topic) => typeof topic === 'object')

  return (
    <article className="mx-auto max-w-2xl space-y-4 rounded-xl border border-border bg-card p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Цитата</h1>
        {author ? (
          <Link href={`/authors/${author.slug}`} className="text-sm text-muted-foreground hover:underline">
            Автор: {author.name}
          </Link>
        ) : null}
      </header>

      <blockquote className="text-xl leading-relaxed">“{quote.text}”</blockquote>

      {(quote.sourceTitle || quote.sourceYear || quote.quoteContextInfo) && (
        <section className="space-y-2 text-sm text-muted-foreground">
          {quote.sourceTitle ? <p>Источник: {quote.sourceTitle}</p> : null}
          {quote.sourceYear ? <p>Год источника: {quote.sourceYear}</p> : null}
          {quote.quoteContextInfo ? <p>Контекст: {quote.quoteContextInfo}</p> : null}
        </section>
      )}

      {topics.length > 0 ? (
        <section className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Link key={topic.id} href={`/topics/${topic.slug}`}>
              <Badge>#{topic.name}</Badge>
            </Link>
          ))}
        </section>
      ) : null}
    </article>
  )
}
