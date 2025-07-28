import { Suspense } from 'react'
import { AppHero } from '@/components/app-hero'
import { TemplatesUiLayoutList } from '@/components/templates/templates-ui-layout-list'

export default function Home() {
  return (
    <Suspense>
      <AppHero title="Templates" subtitle="Jumpstart your app development process with these pre-built solutions." />
      <TemplatesUiLayoutList />
    </Suspense>
  )
}
