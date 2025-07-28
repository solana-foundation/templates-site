import { Input } from '@/components/ui/input'
import { useRepokitFilterState } from '@/lib/repokit'

export function TemplatesUiFilterSearch() {
  const { search, setSearch } = useRepokitFilterState()

  return <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..." />
}
