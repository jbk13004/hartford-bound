import { createApi } from '@reduxjs/toolkit/query/react'
import { csvBaseQuery, type CsvRow } from '@/shared/api/csvBaseQuery'
import { SHEET_URLS } from '@/shared/config/sheets'
import { toArchiveItem, type ArchiveItem, type ArchiveItemRow } from '../types/archiveItem'

export const archiveApi = createApi({
  reducerPath: 'archiveApi',
  baseQuery: csvBaseQuery,
  keepUnusedDataFor: 3600,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: false,
  endpoints: (build) => ({
    getArchiveItems: build.query<ArchiveItem[], void>({
      query: () => SHEET_URLS.archive,
      transformResponse: (rows: CsvRow[]) =>
        (rows as unknown as ArchiveItemRow[]).map(toArchiveItem),
    }),
  }),
})

export const { useGetArchiveItemsQuery } = archiveApi
