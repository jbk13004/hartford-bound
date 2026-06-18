import { useMemo } from 'react'
import { useGetArchiveItemsQuery } from '../api/archiveApi'

export interface ArchiveFilters {
  query: string
  category: string
}

/**
 * Controller for the archive grid: returns the category-and-search-filtered
 * items plus the list of categories present (with an 'all' pseudo-category).
 */
export function useArchive({ query, category }: ArchiveFilters) {
  const { data: items = [], isLoading, isError } = useGetArchiveItemsQuery()

  const categories = useMemo(
    () => ['all', ...new Set(items.map((item) => item.category))],
    [items],
  )

  const q = query.trim().toLowerCase()
  const filtered = useMemo(
    () =>
      items.filter((item) => {
        const matchesCategory = category === 'all' || item.category === category
        const matchesSearch = item.title.toLowerCase().includes(q)
        return matchesCategory && matchesSearch
      }),
    [items, q, category],
  )

  return { items: filtered, categories, isLoading, isError }
}
