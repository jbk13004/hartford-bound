import { useGetExhibitCollectionsQuery } from '../api/exhibitsApi'

export function useExhibits() {
  const { data: collections = [], isLoading, isError } = useGetExhibitCollectionsQuery()
  return { collections, isLoading, isError }
}
