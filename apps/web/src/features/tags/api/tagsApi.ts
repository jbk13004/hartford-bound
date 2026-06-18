import { createApi } from '@reduxjs/toolkit/query/react'
import { csvBaseQuery, type CsvRow } from '@/shared/api/csvBaseQuery'
import { SHEET_URLS } from '@/shared/config/sheets'
import { toTag, type Tag, type TagRow } from '../types/tag'

/**
 * The controlled tag vocabulary. Near-static caching like every other sheet
 * (long keepUnusedDataFor, all refetch triggers off) — the vocabulary is read
 * once and reused to resolve asset colors/themes across the app.
 */
export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  baseQuery: csvBaseQuery,
  keepUnusedDataFor: 3600,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: false,
  endpoints: (build) => ({
    getTags: build.query<Tag[], void>({
      query: () => SHEET_URLS.tags,
      transformResponse: (rows: CsvRow[]) => (rows as unknown as TagRow[]).map(toTag),
    }),
    getTagById: build.query<Tag | undefined, string>({
      query: () => SHEET_URLS.tags,
      transformResponse: (rows: CsvRow[], _meta, id) =>
        (rows as unknown as TagRow[]).map(toTag).find((tag) => tag.id === id),
    }),
  }),
})

export const { useGetTagsQuery, useGetTagByIdQuery } = tagsApi
