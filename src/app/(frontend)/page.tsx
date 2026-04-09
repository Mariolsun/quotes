import { QuoteCard } from '@/components/quotes/quote-card'
import { getFeedQuotes } from '@/lib/queries'

export default async function HomePage() {
  const quotes = await getFeedQuotes()

  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Лента цитат</h1>
      <p className="text-sm text-muted-foreground">Публикуются только утверждённые цитаты из админки Payload.</p>

      {quotes.docs.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
          Пока нет опубликованных цитат. Добавьте первую цитату через /admin.
        </p>
      ) : (
        quotes.docs.map((quote) => <QuoteCard key={quote.id} quote={quote} />)
      )}
    </section>
  )
}
