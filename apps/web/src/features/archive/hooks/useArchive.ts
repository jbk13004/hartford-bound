import { useMemo } from 'react'
import { useGetArchiveItemsQuery } from '../api/archiveApi'

export interface ArchiveFilters {
  /** Category id, or `'all'`. */
  category: string
  /** Tag id, or `'all'`. */
  tag: string
  /** `year_start` exact match, or `'all'`. */
  year: string
}

/**
 * Controller for the archive grid. Returns the items filtered by category, tag,
 * and start year, plus the option lists present in the data (each with an
 * `'all'` pseudo-option). Years are the distinct `year_start` values, sorted.
 */
export function useArchive({ category, tag, year }: ArchiveFilters) {
  const { data: items = [], isLoading, isError } = useGetArchiveItemsQuery()

  const categories = useMemo(
    () => ['all', ...new Set(items.map((item) => item.category).filter(Boolean))],
    [items],
  )

  const tags = useMemo(
    () => ['all', ...new Set(items.flatMap((item) => item.tags))],
    [items],
  )

  const years = useMemo(
    () => [
      'all',
      ...[
        ...new Set(
          items.map((item) => item.year_start).filter((y): y is number => y !== undefined),
        ),
      ]
        .sort((a, b) => a - b)
        .map(String),
    ],
    [items],
  )

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        const matchesCategory = category === 'all' || item.category === category
        const matchesTag = tag === 'all' || item.tags.includes(tag)
        const matchesYear = year === 'all' || String(item.year_start) === year
        return matchesCategory && matchesTag && matchesYear
      }),
    [items, category, tag, year],
  )

  return { items: filtered, categories, tags, years, isLoading, isError }
}
