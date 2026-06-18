import { useMemo } from 'react'
import { relatedByTags, resolveIds, type Asset } from '@/shared/relationships'
import { useGetMapsQuery } from '@/features/maps'
import type { HartMap } from '@/features/maps'
import {
  useGetStoriesQuery,
  useGetStoryBlocksQuery,
  useGetStoryByIdQuery,
} from '../api/storiesApi'
import { storyToAsset } from '../types/story'

/**
 * Controller for the story detail page. Returns the story itself, its body
 * blocks (ordered by `sort_order`), the maps it links to (`map_ids` resolved
 * against the maps sheet), and real related stories (shared-tag overlap, not a
 * `.slice(0, 2)` placeholder).
 */
export function useStory(id: string) {
  const { data: story, isLoading, isError, error } = useGetStoryByIdQuery(id)
  const { data: all = [] } = useGetStoriesQuery()
  const { data: blocks = [] } = useGetStoryBlocksQuery()
  const { data: maps = [] } = useGetMapsQuery()

  const storyBlocks = useMemo(
    () =>
      blocks
        .filter((block) => block.story_id === id)
        .slice()
        .sort((a, b) => a.sort_order - b.sort_order),
    [blocks, id],
  )

  const related = useMemo(() => {
    if (!story) return []
    const assets: Asset[] = all.map(storyToAsset)
    const self = storyToAsset(story)
    return relatedByTags(self, assets, 3)
  }, [story, all])

  const linkedMaps = useMemo<HartMap[]>(() => {
    if (!story) return []
    const byId = Object.fromEntries(maps.map((m) => [m.id, m]))
    return resolveIds(story.map_ids, byId)
  }, [story, maps])

  return { story, blocks: storyBlocks, related, linkedMaps, isLoading, isError, error }
}
