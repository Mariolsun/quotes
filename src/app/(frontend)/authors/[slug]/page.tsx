import { notFound } from 'next/navigation'

import { QuoteCard } from '@/components/quotes/quote-card'
import { getAuthorBySlug, getQuotesByCondition } from '@/lib/queries'

type AuthorPageProps = {
  params: Promise<{ slug: string }>
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const quotes = await getQuotesByCondition({
    author: {
      equals: author.id
    }
  })

  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">{author.name}</h1>
      <p className="text-sm text-muted-foreground">
        {author.country ? `${author.country} · ` : ''}
        {author.birthYear ? `${author.birthYear}` : 'Год рождения неизвестен'}
        {author.deathYear ? ` — ${author.deathYear}` : ''}
      </p>
      {author.shortBio ? <p className="rounded-lg bg-muted p-4 text-sm">{author.shortBio}</p> : null}

      {quotes.docs.map((quote) => (
        <QuoteCard key={quote.id} quote={quote} />
      ))}
    </section>
  )
}
