import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/Toaster'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Threadspace | Find your community',
  description: 'Discover communities, share ideas, and join thoughtful conversations on Threadspace.',
}

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={cn(
        'bg-white text-slate-900 antialiased light',
        inter.className
      )}>
      <body className='min-h-screen pt-16 bg-indigo-50/40 antialiased'>
        <Providers>
          <Navbar />
          {authModal}

          <main className='container max-w-7xl mx-auto h-full py-8'>
            {children}
          </main>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
