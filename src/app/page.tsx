import { Suspense } from 'react'
import { AppHero } from '@/components/app-hero'
import { TemplatesUiLayoutList } from '@/components/templates/templates-ui-layout-list'
import { fetchTemplatesFromGitHub } from '@/lib/fetch-templates'

export default async function Home() {
  const templates = await fetchTemplatesFromGitHub()

  return (
    <Suspense>
      <AppHero
        title="Solana Developer Templates"
        subtitle="Build faster with production-ready templates for dApps, DeFi protocols, NFT marketplaces, and more. Get started with battle-tested code patterns optimized for the Solana ecosystem."
      />
      <TemplatesUiLayoutList templates={templates} />
    </Suspense>
  )
}
