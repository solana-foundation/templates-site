import { TemplatesUiFilterHeader } from './templates-ui-filter-header'
import { TemplatesUiFilterKeywords } from './templates-ui-filter-keywords'
import { TemplatesUiFilterSearch } from './templates-ui-filter-search'

export function TemplatesUiFilter() {
  return (
    <div className="flex flex-col gap-4">
      <TemplatesUiFilterHeader />
      <TemplatesUiFilterSearch />
      <TemplatesUiFilterKeywords />
    </div>
  )
}
