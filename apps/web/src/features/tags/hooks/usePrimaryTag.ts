import { useMemo } from 'react'
import type { Tag } from '../types/tag'
import { useGetTagsQuery } from '../api/tagsApi'

/** Default accent when an asset has no tags or its primary tag is unknown. */
export const FALLBACK_TAG_COLOR = '#72B591'

/** A lookup of tag id → tag, for resolving primary tags cheaply. */
export type TagsById = Readonly<Record<string, Tag>>

/**
 * Resolve an asset's display color from its primary (first) tag.
 * `tagIds[0]` is the primary; falls back to {@link FALLBACK_TAG_COLOR} when the
 * asset is untagged or the tag isn't in the vocabulary.
 */
export function tagColor(tagIds: readonly string[], tagsById: TagsById): string {
  const primary = tagIds[0]
  return (primary && tagsById[primary]?.color) || FALLBACK_TAG_COLOR
}

/** Build a `{ [id]: Tag }` lookup from the tag list. */
export function indexTags(tags: readonly Tag[]): TagsById {
  return Object.fromEntries(tags.map((tag) => [tag.id, tag]))
}

/**
 * Hook: returns the loaded tag vocabulary plus a memoized `tagsById` lookup and
 * a bound `colorFor(tagIds)` resolver, so any view can color assets by their
 * primary tag without re-fetching the vocabulary.
 */
export function usePrimaryTag() {
  const { data: tags = [], isLoading, isError } = useGetTagsQuery()
  const tagsById = useMemo(() => indexTags(tags), [tags])
  const colorFor = useMemo(
    () => (tagIds: readonly string[]) => tagColor(tagIds, tagsById),
    [tagsById],
  )
  return { tags, tagsById, colorFor, isLoading, isError }
}
