import { useMemo } from 'react'
import { useGetCollectionsQuery } from '@/features/collections'
import { useGetMapsQuery } from '../api/mapsApi'

export type AtlasSort = 'chronological' | 'alphabetical' | 'recent'

export interface AtlasOptions {
  collectionId?: string
  query: string
  sort: AtlasSort
}

/**
 * Controller for the atlas grid (the individual map scans). When a
 * `collectionId` is present the grid is scoped to maps whose `collection_ids`
 * include it (membership authored on the map side); the heading reads from the
 * collection. Otherwise it shows every map.
 */
export function useAtlas({ collectionId, query, sort }: AtlasOptions) {
  const { data: maps = [], isLoading, isError } = useGetMapsQuery()
  const { data: collections = [] } = useGetCollectionsQuery()

  const title = collectionId
    ? `${collections.find((c) => c.id === collectionId)?.title ?? 'Map'} Collection`
    : 'Complete Map Collection'

  const q = query.trim().toLowerCase()
  const visible = useMemo(() => {
    const scoped = collectionId
      ? maps.filter((map) => map.collection_ids.includes(collectionId))
      : maps.slice()
    const filtered = q
      ? scoped.filter((map) => map.title.toLowerCase().includes(q))
      : scoped
    if (sort === 'alphabetical') {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
    }
    if (sort === 'chronological') {
      return [...filtered].sort(
        (a, b) => (a.year_start ?? 0) - (b.year_start ?? 0),
      )
    }
    return filtered
  }, [maps, collectionId, q, sort])

  return { maps: visible, title, total: maps.length, isLoading, isError }
}
