import { createApi } from '@reduxjs/toolkit/query/react'
import { csvBaseQuery, type CsvRow } from '@/shared/api/csvBaseQuery'
import { SHEET_URLS } from '@/shared/config/sheets'
import { toMap, type HartMap, type MapRow } from '../types/map'

/**
 * The canonical map table: individual historical map scans, each its own
 * detail page. Near-static caching like every other sheet.
 */
export const mapsApi = createApi({
  reducerPath: 'mapsApi',
  baseQuery: csvBaseQuery,
  keepUnusedDataFor: 3600,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: false,
  endpoints: (build) => ({
    getMaps: build.query<HartMap[], void>({
      query: () => SHEET_URLS.maps,
      transformResponse: (rows: CsvRow[]) => (rows as unknown as MapRow[]).map(toMap),
    }),
    getMapById: build.query<HartMap | undefined, string>({
      query: () => SHEET_URLS.maps,
      transformResponse: (rows: CsvRow[], _meta, id) =>
        (rows as unknown as MapRow[]).map(toMap).find((map) => map.id === id),
    }),
  }),
})

export const { useGetMapsQuery, useGetMapByIdQuery } = mapsApi
