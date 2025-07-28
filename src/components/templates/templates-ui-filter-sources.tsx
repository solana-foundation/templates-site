import { Button } from '@/components/ui/button'
import { useRepokitFilterState } from '@/lib/repokit'

export function TemplatesUiFilterSources() {
  const { sources, selectedSources, toggleSource } = useRepokitFilterState()

  return (
    <div className="flex flex-col gap-2">
      <div className={'text-md font-bold py-1.5'}>Sources</div>
      <div className="flex flex-col gap-2">
        {sources.map((source) => (
          <Button
            key={source.id}
            variant={selectedSources.includes(source.id) ? 'default' : 'outline'}
            onClick={() => toggleSource(source.id)}
          >
            {source.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
