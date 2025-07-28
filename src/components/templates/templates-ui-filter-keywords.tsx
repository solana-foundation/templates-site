import { Button } from '@/components/ui/button'
import { useRepokitFilterState } from '@/lib/repokit'

export function TemplatesUiFilterKeywords() {
  const { filters, selectedKeywords, toggleKeyword } = useRepokitFilterState()
  return filters.map((filter) => (
    <div className="flex flex-col gap-2" key={filter.id}>
      <div className={'text-md font-bold py-1.5'}>{filter.name}</div>
      <div className="flex flex-col gap-2">
        {filter.keywords.map((keyword) => (
          <Button
            onClick={() => toggleKeyword(keyword.id)}
            variant={selectedKeywords.includes(keyword.id) ? 'default' : 'outline'}
            key={keyword.id}
          >
            {keyword.name}
          </Button>
        ))}
      </div>
    </div>
  ))
}
