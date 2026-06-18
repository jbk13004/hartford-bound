import { createApi } from '@reduxjs/toolkit/query/react'
import { csvBaseQuery, type CsvRow } from '@/shared/api/csvBaseQuery'
import { SHEET_URLS } from '@/shared/config/sheets'
import {
  toMapCollection,
  toAtlasItem,
  type MapCollection,
  type MapCollectionRow,
  type AtlasItem,
  type AtlasItemRow,
} from '../types/map'

export const mapsApi = createApi({
  reducerPath: 'mapsApi',
  baseQuery: csvBaseQuery,
  keepUnusedDataFor: 3600,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: false,
  endpoints: (build) => ({
    getMapCollections: build.query<MapCollection[], void>({
      query: () => SHEET_URLS.maps,
      transformResponse: (rows: CsvRow[]) =>
        (rows as unknown as MapCollectionRow[]).map(toMapCollection),
    }),
    getAtlasItems: build.query<AtlasItem[], void>({
      query: () => SHEET_URLS.atlas,
      transformResponse: (rows: CsvRow[]) =>
        (rows as unknown as AtlasItemRow[]).map(toAtlasItem),
    }),
    getAtlasItemById: build.query<AtlasItem | undefined, string>({
      query: () => SHEET_URLS.atlas,
      transformResponse: (rows: CsvRow[], _meta, id) =>
        (rows as unknown as AtlasItemRow[]).map(toAtlasItem).find((item) => item.id === id),
    }),
  }),
})

export const {
  useGetMapCollectionsQuery,
  useGetAtlasItemsQuery,
  useGetAtlasItemByIdQuery,
} = mapsApi
