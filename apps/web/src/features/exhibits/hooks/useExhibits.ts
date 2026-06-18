import { useMemo } from 'react'
import { resolveIds } from '@/shared/relationships'
import { useGetStoriesQuery, type Story } from '@/features/stories'
import { useGetMapsQuery, type HartMap } from '@/features/maps'
import { useGetExhibitPanelsQuery, type ExhibitPanel } from '@/features/exhibitPanels'
import { useGetExhibitsQuery } from '../api/exhibitsApi'
import type { Exhibit } from '../types/exhibit'

export interface UseExhibitsResult {
  /** All exhibits, in sheet order. */
  exhibits: Exhibit[]
  /** The currently selected exhibit (the `selectedId` arg, else the default). */
  selected?: Exhibit
  /** The selected exhibit's panels, ordered by `sort_order`. */
  panels: ExhibitPanel[]
  /** Stories linked from the selected exhibit's `story_ids`, in author order. */
  linkedStories: Story[]
  /** Maps linked from the selected exhibit's `map_ids`, in author order. */
  linkedMaps: HartMap[]
  isLoading: boolean
  isError: boolean
}

/**
 * Controller for the exhibits view. Resolves the selected exhibit's panels
 * (filtered to it, ordered by `sort_order`) and its explicitly linked stories
 * and maps (`story_ids`/`map_ids` resolved against the stories/maps queries via
 * `resolveIds`). When `selectedId` is omitted/unknown, defaults to the first
 * active exhibit, falling back to the first exhibit.
 */
export function useExhibits(selectedId?: string): UseExhibitsResult {
  const { data: exhibits = [], isLoading, isError } = useGetExhibitsQuery()
  const { data: panels = [] } = useGetExhibitPanelsQuery()
  const { data: stories = [] } = useGetStoriesQuery()
  const { data: maps = [] } = useGetMapsQuery()

  const selected = useMemo(() => {
    if (selectedId) {
      const match = exhibits.find((e) => e.id === selectedId)
      if (match) return match
    }
    return exhibits.find((e) => e.active) ?? exhibits[0]
  }, [exhibits, selectedId])

  const selectedPanels = useMemo(
    () =>
      panels
        .filter((p) => p.exhibit_id === selected?.id)
        .sort((a, b) => a.sort_order - b.sort_order),
    [panels, selected],
  )

  const linkedStories = useMemo(() => {
    if (!selected) return []
    const byId = Object.fromEntries(stories.map((s) => [s.id, s]))
    return resolveIds(selected.story_ids, byId)
  }, [selected, stories])

  const linkedMaps = useMemo(() => {
    if (!selected) return []
    const byId = Object.fromEntries(maps.map((m) => [m.id, m]))
    return resolveIds(selected.map_ids, byId)
  }, [selected, maps])

  return {
    exhibits,
    selected,
    panels: selectedPanels,
    linkedStories,
    linkedMaps,
    isLoading,
    isError,
  }
}
