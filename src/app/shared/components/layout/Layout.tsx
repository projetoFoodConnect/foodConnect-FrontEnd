import { Header } from './Header'
import { Footer } from './Footer'
import { type ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 px-4 sm:px-8 py-6 max-w-screen-xl mx-auto w-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}
