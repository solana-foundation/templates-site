export default async function DevelopersTemplatesDetailPage({
  params,
}: {
  params: Promise<{ source: string; name: string }>
}) {
  const { name, source } = await params

  return (
    <div>
      <h1>Template {name}</h1>
      <p>Source: {source}</p>
    </div>
  )
}
