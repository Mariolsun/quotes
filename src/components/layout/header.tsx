import Link from 'next/link'

export const Header = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="text-lg font-semibold">
          QuoteFeed
        </Link>
        <nav className="text-sm text-muted-foreground">Каталог цитат известных людей</nav>
      </div>
    </header>
  )
}
