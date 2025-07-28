import { RepokitTemplate } from '../generated/repokit'
import { RepokitUrlState } from './use-repokit-url-state'

export function filterTemplates({
  search,
  selectedKeywords,
  selectedSources,
  templates,
}: RepokitUrlState & { templates: RepokitTemplate[] }) {
  return templates
    .filter((l) => {
      if (search.trim() === '') {
        return true
      }
      const inName = l.name.toLowerCase().includes(search)
      const inDescription = l.description.toLowerCase().includes(search)
      const inKeywords = l.keywords.some((k) => k.toLowerCase().includes(search))

      return inName || inDescription || inKeywords
    })
    .filter((l) => (selectedSources.length ? selectedSources.some((s) => l.source.id === s) : true))
    .filter((l) => selectedKeywords.every((k) => l.keywords.includes(k)))
}
