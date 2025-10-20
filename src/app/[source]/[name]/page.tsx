import { TemplatesUiLayoutDetail } from '@/components/templates/templates-ui-layout-detail'
import { fetchTemplatesFromGitHub } from '@/lib/fetch-templates'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string; source: string }>
}): Promise<Metadata> {
  const { name, source } = await params
  const templates = await fetchTemplatesFromGitHub()
  const template = templates.find((t) => t.name === name && t.source.id === source)

  if (!template) {
    return {
      title: 'Template Not Found',
      description: 'The requested template could not be found.',
    }
  }

  const displayName = template.displayName || template.name

  return {
    title: `${displayName} - Solana Template`,
    description: template.description,
    openGraph: {
      title: `${displayName} - Solana Template`,
      description: template.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${displayName} - Solana Template`,
      description: template.description,
    },
  }
}

export default async function TemplateDetailPage({ params }: { params: Promise<{ name: string; source: string }> }) {
  const { name, source } = await params
  const templates = await fetchTemplatesFromGitHub()

  return <TemplatesUiLayoutDetail name={name} source={source} templates={templates} />
}
