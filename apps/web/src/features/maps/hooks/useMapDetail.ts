import { useMemo } from 'react'
import { relatedByTags, type Asset } from '@/shared/relationships'
import { useGetMapByIdQuery, useGetMapsQuery } from '../api/mapsApi'
import { mapToAsset, type HartMap } from '../types/map'

/**
 * Controller for a single map scan (by id). Returns real related maps:
 * shared-tag overlap unioned with collection siblings (maps sharing any
 * `collection_ids`), not a `.slice(0, 2)` placeholder.
 */
export function useMapDetail(id: string) {
  const { data: map, isLoading, isError } = useGetMapByIdQuery(id)
  const { data: all = [] } = useGetMapsQuery()

  const related = useMemo<HartMap[]>(() => {
    if (!map) return []
    const byId = new Map(all.map((m) => [m.id, m]))
    const assets: Asset[] = all.map(mapToAsset)
    const self = mapToAsset(map)

    const ordered: HartMap[] = []
    const seen = new Set<string>([map.id])
    const push = (candidate?: HartMap) => {
      if (candidate && !seen.has(candidate.id)) {
        seen.add(candidate.id)
        ordered.push(candidate)
      }
    }

    // Collection siblings first (strongest signal), then shared-tag overlap.
    const collections = new Set(map.collection_ids)
    for (const candidate of all) {
      if (candidate.collection_ids.some((c) => collections.has(c))) push(candidate)
    }
    for (const asset of relatedByTags(self, assets)) push(byId.get(asset.id))

    return ordered.slice(0, 4)
  }, [map, all])

  return { map, related, isLoading, isError }
}
