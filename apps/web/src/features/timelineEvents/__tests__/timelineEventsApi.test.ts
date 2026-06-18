import { describe, it, expect } from 'vitest'
import { makeStore } from '@/app/store'
import { timelineEventsApi } from '../api/timelineEventsApi'

describe('timelineEventsApi', () => {
  it('fetches CSV (via MSW) and maps rows to TimelineEvent objects', async () => {
    const store = makeStore()
    const result = await store.dispatch(
      timelineEventsApi.endpoints.getTimelineEvents.initiate(),
    )

    expect(result.isSuccess).toBe(true)
    const events = result.data ?? []
    expect(events).toHaveLength(2)

    expect(events[0]).toMatchObject({
      id: 'hartford-founded',
      year: 1635,
      title: 'Hartford Founded',
    })
    expect(events[0].description).toContain('Connecticut River')
    // `year` is parsed to a number.
    expect(typeof events[0].year).toBe('number')
  })
})
