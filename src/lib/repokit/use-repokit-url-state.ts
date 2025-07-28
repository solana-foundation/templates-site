import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'

export interface RepokitUrlState {
  clear: () => Promise<void>
  isFiltered: boolean
  search: string
  selectedKeywords: string[]
  selectedSources: string[]
  setSearch: (value: string) => Promise<URLSearchParams>
  toggleKeyword: (keyword: string) => Promise<URLSearchParams>
  toggleSource: (source: string) => Promise<URLSearchParams>
}

export function useRepokitUrlState(): RepokitUrlState {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''))
  const [selectedKeywords, setSelectedKeywords] = useQueryState(
    'keywords',
    parseAsArrayOf(parseAsString).withDefault([]),
  )
  const [selectedSources, setSelectedSources] = useQueryState('sources', parseAsArrayOf(parseAsString).withDefault([]))

  function toggleItem(items: string[], item: string) {
    return items.includes(item) ? items.filter((i) => i !== item) : [...items, item]
  }

  return {
    clear: async () => {
      await Promise.all([setSearch(''), setSelectedKeywords([]), setSelectedSources([])])
    },
    isFiltered: selectedKeywords.length > 0 || selectedSources.length > 0 || search.length > 0,
    search,
    selectedKeywords,
    selectedSources,
    setSearch,
    toggleKeyword: async (input: string) => await setSelectedKeywords(toggleItem(selectedKeywords, input)),
    toggleSource: async (input: string) => await setSelectedSources(toggleItem(selectedSources, input)),
  }
}
