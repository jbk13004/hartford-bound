import { useGetStoriesQuery } from '../api/storiesApi'

/**
 * Controller for the stories grid. Owns the derived (search-filtered) list so
 * the view stays presentational — it just passes the current query string in.
 */
export function useStoriesList(query = '') {
  const { data: stories = [], isLoading, isError, error } = useGetStoriesQuery()

  const q = query.trim().toLowerCase()
  const filtered = q
    ? stories.filter(
        (story) =>
          story.title.toLowerCase().includes(q) ||
          story.excerpt.toLowerCase().includes(q) ||
          story.tags.some((tag) => tag.toLowerCase().includes(q)),
      )
    : stories

  return { stories: filtered, total: stories.length, isLoading, isError, error }
}
