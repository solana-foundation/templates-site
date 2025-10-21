'use client'

import { Input } from '@/components/ui/input'
import { useTemplateFilterState } from '@/lib/templates'
import { useEffect, useState } from 'react'

export function TemplatesUiFilterSearch() {
  const { filter, setFilter } = useTemplateFilterState()
  const [localValue, setLocalValue] = useState(filter)

  // Sync local value with URL state
  useEffect(() => {
    setLocalValue(filter)
  }, [filter])

  // Update URL state when local value changes (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== filter) {
        console.log('Updating filter to:', localValue)
        setFilter(localValue)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [localValue, filter, setFilter])

  return (
    <Input
      value={localValue}
      onChange={(e) => {
        console.log('Search input changed:', e.target.value)
        setLocalValue(e.target.value)
      }}
      placeholder="Search templates..."
    />
  )
}
