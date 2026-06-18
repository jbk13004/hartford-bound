import { createApi } from '@reduxjs/toolkit/query/react'
import { csvBaseQuery, type CsvRow } from '@/shared/api/csvBaseQuery'
import { SHEET_URLS } from '@/shared/config/sheets'
import { toCollection, type Collection, type CollectionRow } from '../types/collection'

/**
 * Curated thematic groupings of maps — the Maps landing-page cards. Near-static
 * caching like every other sheet.
 */
export const collectionsApi = createApi({
  reducerPath: 'collectionsApi',
  baseQuery: csvBaseQuery,
  keepUnusedDataFor: 3600,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: false,
  endpoints: (build) => ({
    getCollections: build.query<Collection[], void>({
      query: () => SHEET_URLS.collections,
      transformResponse: (rows: CsvRow[]) =>
        (rows as unknown as CollectionRow[]).map(toCollection),
    }),
    getCollectionById: build.query<Collection | undefined, string>({
      query: () => SHEET_URLS.collections,
      transformResponse: (rows: CsvRow[], _meta, id) =>
        (rows as unknown as CollectionRow[]).map(toCollection).find((c) => c.id === id),
    }),
  }),
})

export const { useGetCollectionsQuery, useGetCollectionByIdQuery } = collectionsApi
