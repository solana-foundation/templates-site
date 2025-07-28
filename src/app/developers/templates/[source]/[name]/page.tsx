import { TemplatesUiLayoutDetail } from '@/components/templates/templates-ui-layout-detail'

export default async function TemplateDetailPage({ params }: { params: Promise<{ name: string; source: string }> }) {
  const { name, source } = await params

  return <TemplatesUiLayoutDetail name={name} source={source} />
}
