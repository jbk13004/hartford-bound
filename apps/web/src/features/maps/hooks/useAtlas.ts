import { useMemo } from 'react'
import { useGetAtlasItemsQuery, useGetMapCollectionsQuery } from '../api/mapsApi'

export type AtlasSort = 'chronological' | 'alphabetical' | 'recent'

export interface AtlasOptions {
  collectionId?: string
  query: string
  sort: AtlasSort
}

/**
 * Controller for the atlas grid. Resolves the heading from the collection id,
 * and returns the search-filtered, sorted items. (Items aren't scoped to a
 * collection — the collection id only sets the heading, as in the original.)
 */
export function useAtlas({ collectionId, query, sort }: AtlasOptions) {
  const { data: items = [], isLoading, isError } = useGetAtlasItemsQuery()
  const { data: collections = [] } = useGetMapCollectionsQuery()

  const title = collectionId
    ? `${collections.find((c) => c.id === collectionId)?.title ?? 'Map'} Collection`
    : 'Complete Map Collection'

  const q = query.trim().toLowerCase()
  const visible = useMemo(() => {
    const filtered = q ? items.filter((item) => item.title.toLowerCase().includes(q)) : items.slice()
    if (sort === 'alphabetical') return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'chronological') return [...filtered].sort((a, b) => a.decade.localeCompare(b.decade))
    return filtered
  }, [items, q, sort])

  return { items: visible, title, total: items.length, isLoading, isError }
}
