import { useMemo } from 'react'
import { useGetStoriesQuery, storyToAsset } from '@/features/stories'
import { useGetMapsQuery, mapToAsset } from '@/features/maps'
import { useGetExhibitsQuery, exhibitToAsset } from '@/features/exhibits'
import { useGetArchiveItemsQuery, archiveToAsset } from '@/features/archive'
import { useGetTimelineEventsQuery } from '@/features/timelineEvents'
import { deriveTimeline, type Asset, type AssetType } from '@/shared/relationships'

export type TimelineTypeFilter = AssetType | 'event' | 'all'

export interface TimelineFilters {
  type: TimelineTypeFilter
  century: number | 'all'
}

const centuryOf = (year: number): number => Math.floor(year / 100) * 100

/**
 * Controller for the timeline: the timeline is a DERIVED union of every dated
 * asset (stories, maps, exhibits, archive — via their `Asset` projections) plus
 * the optional non-asset `timeline_events` context beats, sorted by year. Each
 * asset entry links back to its detail page; context events have no link.
 *
 * Returns the filtered entries plus the centuries present (for the filter bar).
 */
export function useDerivedTimeline({ type, century }: TimelineFilters) {
  const stories = useGetStoriesQuery()
  const maps = useGetMapsQuery()
  const exhibits = useGetExhibitsQuery()
  const archive = useGetArchiveItemsQuery()
  const events = useGetTimelineEventsQuery()

  const isLoading =
    stories.isLoading ||
    maps.isLoading ||
    exhibits.isLoading ||
    archive.isLoading ||
    events.isLoading
  const isError =
    stories.isError || maps.isError || exhibits.isError || archive.isError || events.isError

  const entries = useMemo(() => {
    const assets: Asset[] = [
      ...(stories.data ?? []).map(storyToAsset),
      ...(maps.data ?? []).map(mapToAsset),
      ...(exhibits.data ?? []).map(exhibitToAsset),
      ...(archive.data ?? []).map(archiveToAsset),
    ]
    return deriveTimeline(assets, events.data ?? [])
  }, [stories.data, maps.data, exhibits.data, archive.data, events.data])

  const centuries = useMemo(
    () => [...new Set(entries.map((entry) => centuryOf(entry.year)))].sort((a, b) => a - b),
    [entries],
  )

  const filtered = useMemo(
    () =>
      entries.filter((entry) => {
        // Context events have no `type`; the `event` filter matches them.
        const entryType = entry.type ?? 'event'
        const matchesType = type === 'all' || entryType === type
        const matchesCentury = century === 'all' || centuryOf(entry.year) === century
        return matchesType && matchesCentury
      }),
    [entries, type, century],
  )

  return { entries: filtered, centuries, isLoading, isError }
}
