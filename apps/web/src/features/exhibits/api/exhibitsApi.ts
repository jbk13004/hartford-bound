import { createApi } from '@reduxjs/toolkit/query/react'
import { csvBaseQuery, type CsvRow } from '@/shared/api/csvBaseQuery'
import { SHEET_URLS } from '@/shared/config/sheets'
import { toExhibit, type Exhibit, type ExhibitRow } from '../types/exhibit'

export const exhibitsApi = createApi({
  reducerPath: 'exhibitsApi',
  baseQuery: csvBaseQuery,
  keepUnusedDataFor: 3600,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: false,
  endpoints: (build) => ({
    getExhibits: build.query<Exhibit[], void>({
      query: () => SHEET_URLS.exhibits,
      transformResponse: (rows: CsvRow[]) =>
        (rows as unknown as ExhibitRow[]).map(toExhibit),
    }),
  }),
})

export const { useGetExhibitsQuery } = exhibitsApi
