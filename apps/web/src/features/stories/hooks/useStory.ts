import { useGetStoriesQuery, useGetStoryByIdQuery } from '../api/storiesApi'

/**
 * Controller for the story detail page: the story itself (by id) plus a few
 * related stories derived from the full set (excludes the current story).
 */
export function useStory(id: string) {
  const { data: story, isLoading, isError, error } = useGetStoryByIdQuery(id)
  const { data: all = [] } = useGetStoriesQuery()

  const related = all.filter((other) => other.id !== id).slice(0, 2)

  return { story, related, isLoading, isError, error }
}
