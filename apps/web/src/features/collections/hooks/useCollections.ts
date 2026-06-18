import { useGetCollectionsQuery } from '../api/collectionsApi'

/** Controller for the Maps landing page: the curated collection cards. */
export function useCollections() {
  const { data: collections = [], isLoading, isError, error } = useGetCollectionsQuery()
  return { collections, isLoading, isError, error }
}
