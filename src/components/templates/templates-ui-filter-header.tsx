import { Button } from '@/components/ui/button'
import { useTemplateFilterState } from '@/lib/templates'
import { X } from 'lucide-react'

export function TemplatesUiFilterHeader() {
  const { clear, isFiltered } = useTemplateFilterState()
  return (
    <div className="flex justify-between items-center gap-2">
      <span className="text-sm font-bold py-1.5 whitespace-nowrap">Filter Templates</span>
      {isFiltered ? (
        <Button
          variant="ghost"
          onClick={() => clear()}
          className="cursor-pointer h-auto py-1 px-2 text-xs flex-shrink-0 gap-1"
        >
          <X className="h-1 w-2" />
          Clear
        </Button>
      ) : null}
    </div>
  )
}
