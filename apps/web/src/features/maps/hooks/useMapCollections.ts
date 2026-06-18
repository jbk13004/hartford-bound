import { useGetMapCollectionsQuery } from '../api/mapsApi'

export function useMapCollections() {
  const { data: collections = [], isLoading, isError } = useGetMapCollectionsQuery()
  return { collections, isLoading, isError }
}
