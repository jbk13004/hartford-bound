import { createApi } from '@reduxjs/toolkit/query/react'
import { csvBaseQuery, type CsvRow } from '@/shared/api/csvBaseQuery'
import { SHEET_URLS } from '@/shared/config/sheets'
import { toStory, type Story, type StoryRow } from '../types/story'
import {
  toStoryBlock,
  type StoryBlock,
  type StoryBlockRow,
} from '../types/storyBlock'

/**
 * Near-static caching: a sheet is fetched ~once per session (long
 * keepUnusedDataFor, all refetch triggers off), so the detail page's lookup is
 * cheap even though it re-reads the same CSV. Story rows hold card/detail
 * metadata; the rich body lives in the separate `story_blocks` sheet.
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
    getStoryBlocks: build.query<StoryBlock[], void>({
      query: () => SHEET_URLS.storyBlocks,
      transformResponse: (rows: CsvRow[]) =>
        (rows as unknown as StoryBlockRow[]).map(toStoryBlock),
    }),
  }),
})

export const { useGetStoriesQuery, useGetStoryByIdQuery, useGetStoryBlocksQuery } =
  storiesApi
