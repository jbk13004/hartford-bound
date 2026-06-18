import { useMemo } from 'react'
import { useGetTimelineEventsQuery } from '../api/timelineApi'
import type { TimelineEventType } from '../types/timelineEvent'

export interface TimelineFilters {
  type: TimelineEventType | 'all'
  century: number | 'all'
}

const centuryOf = (year: number): number => Math.floor(year / 100) * 100

/**
 * Controller for the timeline: returns the filtered events plus the set of
 * centuries present in the data (for the century filter buttons).
 */
export function useTimeline({ type, century }: TimelineFilters) {
  const { data: events = [], isLoading, isError } = useGetTimelineEventsQuery()

  const centuries = useMemo(
    () => [...new Set(events.map((event) => centuryOf(event.year)))].sort((a, b) => a - b),
    [events],
  )

  const filtered = useMemo(
    () =>
      events.filter((event) => {
        const matchesType = type === 'all' || event.type === type
        const matchesCentury = century === 'all' || centuryOf(event.year) === century
        return matchesType && matchesCentury
      }),
    [events, type, century],
  )

  return { events: filtered, centuries, isLoading, isError }
}
