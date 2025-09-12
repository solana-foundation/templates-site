'use client'

import type React from 'react'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { SearchCard } from './search-card'
import { RepokitTemplate } from '@/lib/generated/repokit'
import { Tech } from '@/types'

function inferTechFromKeywords(keywords: string[]): Tech {
  if (keywords.includes('nextjs')) return 'next'
  if (keywords.includes('vite')) return 'vite'
  if (keywords.includes('react')) return 'react'
  if (keywords.includes('node') || keywords.includes('express')) return 'node'
  if (keywords.includes('expo')) return 'expo'
  return 'other'
}

interface SearchBarProps {
  templates: RepokitTemplate[]
}

export function SearchBar({ templates }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [debouncedQuery, setDebouncedQuery] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Debounce the query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 250)

    return () => clearTimeout(timer)
  }, [query])

  const featuredTemplates = useMemo(() => {
    const techGroups: Record<Tech, RepokitTemplate[]> = {
      next: [],
      vite: [],
      react: [],
      node: [],
      expo: [],
      other: [],
    }

    templates.forEach((template) => {
      const tech = inferTechFromKeywords(template.keywords)
      techGroups[tech].push(template)
    })

    const featured: RepokitTemplate[] = []

    Object.values(techGroups).forEach((group) => {
      if (group.length === 0) return

      const selectedItem = group[0]
      featured.push(selectedItem)
    })

    return featured.slice(0, 3) // Max 3 items
  }, [templates])

  const filteredTemplates = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      return isFocused ? featuredTemplates : []
    }

    const searchTerm = debouncedQuery.toLowerCase()

    return templates.filter((template) => {
      const tech = inferTechFromKeywords(template.keywords)
      const searchableText = [
        template.name,
        template.description,
        tech,
        // Tech aliases
        tech === 'next' ? 'next.js nextjs' : '',
        tech === 'vite' ? 'vite' : '',
      ]
        .join(' ')
        .toLowerCase()

      return searchableText.includes(searchTerm)
    })
  }, [debouncedQuery, templates, featuredTemplates, isFocused])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setActiveIndex(-1)
  }, [])

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleBlur = useCallback(() => {
    // Delay blur to allow clicks on results
    setTimeout(() => {
      setIsFocused(false)
      setActiveIndex(-1)
    }, 150)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isFocused || filteredTemplates.length === 0) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setActiveIndex((prev) => (prev < filteredTemplates.length - 1 ? prev + 1 : 0))
          break
        case 'ArrowUp':
          e.preventDefault()
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredTemplates.length - 1))
          break
        case 'Enter':
          e.preventDefault()
          if (activeIndex >= 0 && filteredTemplates[activeIndex]?.repoUrl) {
            window.open(filteredTemplates[activeIndex].repoUrl, '_blank', 'noreferrer')
          }
          break
        case 'Escape':
          e.preventDefault()
          if (query) {
            setQuery('')
            setDebouncedQuery('')
          } else {
            inputRef.current?.blur()
          }
          setActiveIndex(-1)
          break
      }
    },
    [isFocused, filteredTemplates, activeIndex, query],
  )

  const showResults = isFocused && filteredTemplates.length > 0
  const showEmptyState = isFocused && debouncedQuery.length >= 2 && filteredTemplates.length === 0
  const isShowingFeatured = isFocused && (!debouncedQuery || debouncedQuery.length < 2) && filteredTemplates.length > 0

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={showResults}
          aria-controls={showResults ? 'search-results' : undefined}
          aria-autocomplete="list"
          placeholder="Search templates..."
          className="
            w-full pl-10 pr-4 py-3 
            bg-neutral-900 border border-neutral-700 rounded-2xl
            text-neutral-100 placeholder-neutral-400
            focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent
            transition-colors duration-200
          "
        />
      </div>

      {(showResults || showEmptyState) && (
        <div
          ref={resultsRef}
          id="search-results"
          role="listbox"
          className="
            absolute top-full left-0 right-0 mt-2 px-2 py-3
            bg-neutral-900 border border-neutral-700 rounded-2xl shadow-xl
            max-h-96 overflow-y-auto z-50 custom-scrollbar
          "
        >
          {showEmptyState ? (
            <div className="p-4 text-center text-neutral-400 text-sm">No templates found.</div>
          ) : (
            <div className="space-y-3">
              {isShowingFeatured && (
                <div className="px-3">
                  <h3 className="text-neutral-300 text-sm font-medium">Featured Templates</h3>
                </div>
              )}
              <div className="p-2 space-y-3">
                {filteredTemplates.map((template, index) => (
                  <SearchCard
                    key={template.id}
                    template={{
                      ...template,
                      tech: inferTechFromKeywords(template.keywords),
                      keywords: template.keywords as any,
                    }}
                    isActive={index === activeIndex}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
