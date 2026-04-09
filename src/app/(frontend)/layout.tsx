import type { ReactNode } from 'react'

import { Header } from '@/components/layout/header'

type FrontLayoutProps = {
  children: ReactNode
}

export default function FrontLayout({ children }: FrontLayoutProps) {
  return (
    <>
      <Header />
      <main className="container py-6">{children}</main>
    </>
  )
}
