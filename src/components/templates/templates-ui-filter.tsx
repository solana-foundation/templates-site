import { TemplatesUiFilterHeader } from './templates-ui-filter-header'
import { TemplatesUiFilterKeywords } from './templates-ui-filter-keywords'
import { TemplatesUiFilterSearch } from './templates-ui-filter-search'

export function TemplatesUiFilter() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl px-4 py-6 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800">
      <TemplatesUiFilterHeader />
      <TemplatesUiFilterSearch />
      <TemplatesUiFilterKeywords />
    </div>
  )
}
