import { createApi } from '@reduxjs/toolkit/query/react'
import { csvBaseQuery, type CsvRow } from '@/shared/api/csvBaseQuery'
import { SHEET_URLS } from '@/shared/config/sheets'
import {
  toExhibitCollection,
  type ExhibitCollection,
  type ExhibitCollectionRow,
} from '../types/exhibit'

export const exhibitsApi = createApi({
  reducerPath: 'exhibitsApi',
  baseQuery: csvBaseQuery,
  keepUnusedDataFor: 3600,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: false,
  endpoints: (build) => ({
    getExhibitCollections: build.query<ExhibitCollection[], void>({
      query: () => SHEET_URLS.exhibits,
      transformResponse: (rows: CsvRow[]) =>
        (rows as unknown as ExhibitCollectionRow[]).map(toExhibitCollection),
    }),
  }),
})

export const { useGetExhibitCollectionsQuery } = exhibitsApi
