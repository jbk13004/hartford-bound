import { createApi } from '@reduxjs/toolkit/query/react'
import { csvBaseQuery, type CsvRow } from '@/shared/api/csvBaseQuery'
import { SHEET_URLS } from '@/shared/config/sheets'
import {
  toExhibitPanel,
  type ExhibitPanel,
  type ExhibitPanelRow,
} from '../types/exhibitPanel'

/**
 * Near-static caching matches the other sheet APIs. Panels are filtered by
 * `exhibit_id` and ordered by `sort_order` in the consuming hook; the total
 * panel count (`/ N`) is derived by counting rows, never typed.
 */
export const exhibitPanelsApi = createApi({
  reducerPath: 'exhibitPanelsApi',
  baseQuery: csvBaseQuery,
  keepUnusedDataFor: 3600,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: false,
  endpoints: (build) => ({
    getExhibitPanels: build.query<ExhibitPanel[], void>({
      query: () => SHEET_URLS.exhibitPanels,
      transformResponse: (rows: CsvRow[]) =>
        (rows as unknown as ExhibitPanelRow[]).map(toExhibitPanel),
    }),
  }),
})

export const { useGetExhibitPanelsQuery } = exhibitPanelsApi
