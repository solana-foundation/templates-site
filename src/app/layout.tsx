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
        <AppProviders>
          <AppSolanaLayout>{children}</AppSolanaLayout>
        </AppProviders>
      </body>
    </html>
  )
}
