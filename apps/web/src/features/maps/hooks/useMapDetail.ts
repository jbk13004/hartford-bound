import { useGetAtlasItemByIdQuery, useGetAtlasItemsQuery } from '../api/mapsApi'

/**
 * Controller for a single map layer (by id), plus a few related layers derived
 * from the rest of the atlas.
 */
export function useMapDetail(id: string) {
  const { data: map, isLoading, isError } = useGetAtlasItemByIdQuery(id)
  const { data: all = [] } = useGetAtlasItemsQuery()

  const related = all.filter((item) => item.id !== id).slice(0, 2)

  return { map, related, isLoading, isError }
}
