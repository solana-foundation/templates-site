import { useMemo } from 'react'
import { RepokitFilter, RepokitSource, RepokitTemplate } from '@/lib/generated/repokit'
import { RepokitUrlState, useRepokitUrlState } from './use-repokit-url-state'
import { filterTemplates } from './filter-templates'
import { useRepokitFilters } from './use-repokit-filters'
import { useRepokitSources } from './use-repokit-source'
import { useRepokitTemplates } from './use-repokit-templates'

export function useRepokitFilterState(): RepokitUrlState & {
  filters: RepokitFilter[]
  sources: RepokitSource[]
  templates: RepokitTemplate[]
} {
  const filters = useRepokitFilters()
  const sources = useRepokitSources()
  const templates = useRepokitTemplates()

  const state = useRepokitUrlState()

  return {
    ...state,
    filters,
    sources,
    templates: useMemo(() => filterTemplates({ ...state, templates }), [state, templates]),
  }
}
