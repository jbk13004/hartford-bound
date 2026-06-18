import { createApi } from '@reduxjs/toolkit/query/react'
import { csvBaseQuery, type CsvRow } from '@/shared/api/csvBaseQuery'
import { SHEET_URLS } from '@/shared/config/sheets'
import {
  toTimelineEvent,
  type TimelineEvent,
  type TimelineEventRow,
} from '../types/timelineEvent'

export const timelineApi = createApi({
  reducerPath: 'timelineApi',
  baseQuery: csvBaseQuery,
  keepUnusedDataFor: 3600,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: false,
  endpoints: (build) => ({
    getTimelineEvents: build.query<TimelineEvent[], void>({
      query: () => SHEET_URLS.timeline,
      transformResponse: (rows: CsvRow[]) =>
        (rows as unknown as TimelineEventRow[]).map(toTimelineEvent),
    }),
  }),
})

export const { useGetTimelineEventsQuery } = timelineApi
