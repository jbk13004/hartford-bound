import { createApi } from '@reduxjs/toolkit/query/react'
import { csvBaseQuery, type CsvRow } from '@/shared/api/csvBaseQuery'
import { SHEET_URLS } from '@/shared/config/sheets'
import { toStory, type Story, type StoryRow } from '../types/story'

/**
 * Near-static caching: a sheet is fetched ~once per session (long
 * keepUnusedDataFor, all refetch triggers off), so the detail page's lookup is
 * cheap even though it re-reads the same CSV.
 */
export const storiesApi = createApi({
  reducerPath: 'storiesApi',
  baseQuery: csvBaseQuery,
  keepUnusedDataFor: 3600,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: false,
  endpoints: (build) => ({
    getStories: build.query<Story[], void>({
      query: () => SHEET_URLS.stories,
      transformResponse: (rows: CsvRow[]) => (rows as unknown as StoryRow[]).map(toStory),
    }),
    getStoryById: build.query<Story | undefined, string>({
      query: () => SHEET_URLS.stories,
      transformResponse: (rows: CsvRow[], _meta, id) =>
        (rows as unknown as StoryRow[]).map(toStory).find((story) => story.id === id),
    }),
  }),
})

export const { useGetStoriesQuery, useGetStoryByIdQuery } = storiesApi
