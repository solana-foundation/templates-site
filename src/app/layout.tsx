import type { Metadata } from 'next'
import { AppProviders } from '@/components/app-providers'
import './globals.css'
import { AppSolanaLayout } from '@/components/app-solana-layout'

export const metadata: Metadata = {
  title: 'Solana Templates',
  description: 'Templates for create-solana-dapp',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-purple-500/5 via-background via-50% to-emerald-400/8">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-400/3 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-pink-400/3 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <AppProviders>
              <AppSolanaLayout>{children}</AppSolanaLayout>
            </AppProviders>
          </div>
        </div>
      </body>
    </html>
  )
}
