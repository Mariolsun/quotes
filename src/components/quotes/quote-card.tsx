import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

type BaseEntity = {
  id: number | string
  slug: string
  name: string
}

type QuoteCardProps = {
  quote: {
    slug: string
    text: string
    sourceTitle?: string | null
    sourceYear?: number | null
    language?: string | null
    author: BaseEntity | number | string
    topics?: (BaseEntity | number | string)[] | null
  }
}

const isObjectEntity = (value: unknown): value is BaseEntity => {
  return Boolean(value && typeof value === 'object' && 'slug' in value && 'name' in value)
}

export const QuoteCard = ({ quote }: QuoteCardProps) => {
  const author = isObjectEntity(quote.author) ? quote.author : null
  const topics = (quote.topics || []).filter(isObjectEntity)

  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          {author ? (
            <Link href={`/authors/${author.slug}`} className="font-semibold text-foreground hover:underline">
              {author.name}
            </Link>
          ) : (
            <span className="font-semibold text-foreground">Неизвестный автор</span>
          )}
          {quote.language ? <span className="text-muted-foreground">· {quote.language.toUpperCase()}</span> : null}
        </div>

        <blockquote className="text-lg leading-relaxed text-foreground">“{quote.text}”</blockquote>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {quote.sourceTitle ? <span>{quote.sourceTitle}</span> : null}
          {quote.sourceYear ? <span>({quote.sourceYear})</span> : null}
        </div>

        {topics.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Link key={topic.id} href={`/topics/${topic.slug}`}>
                <Badge>#{topic.name}</Badge>
              </Link>
            ))}
          </div>
        ) : null}

        <div>
          <Link href={`/quotes/${quote.slug}`} className="text-sm text-primary hover:underline">
            Открыть страницу цитаты
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
