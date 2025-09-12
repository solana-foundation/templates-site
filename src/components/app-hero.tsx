import React from 'react'
import { SearchBar } from './search'
import { useRepokitTemplates } from '@/lib/repokit/use-repokit-templates'

export function AppHero({
  children,
  subtitle,
  title,
}: {
  children?: React.ReactNode
  subtitle?: React.ReactNode
  title?: React.ReactNode
}) {
  const templates = useRepokitTemplates()

  return (
    <div className="flex flex-col items-center justify-center py-[16px] md:py-[64px]">
      <div className="text-center">
        <div className="max-w-2xl">
          {typeof title === 'string' ? <h1 className="text-5xl font-bold">{title}</h1> : title}
          {typeof subtitle === 'string' ? <p className="pt-4 md:py-6">{subtitle}</p> : subtitle}
          {children}
        </div>
      </div>
      <SearchBar templates={templates} />
    </div>
  )
}
