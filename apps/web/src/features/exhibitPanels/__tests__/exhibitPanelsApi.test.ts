import { describe, it, expect } from 'vitest'
import { makeStore } from '@/app/store'
import { exhibitPanelsApi } from '../api/exhibitPanelsApi'

describe('exhibitPanelsApi', () => {
  it('maps rows to ExhibitPanel domain objects', async () => {
    const store = makeStore()
    const result = await store.dispatch(exhibitPanelsApi.endpoints.getExhibitPanels.initiate())

    const panels = result.data ?? []
    expect(panels).toHaveLength(3)
    expect(panels[0]).toMatchObject({
      exhibit_id: 'the-great-migration',
      sort_order: 20,
      label: 'Part 2',
      title: 'Building Community',
    })
  })

  it('a consumer can filter to one exhibit, order by sort_order, and derive the count', async () => {
    const store = makeStore()
    const result = await store.dispatch(exhibitPanelsApi.endpoints.getExhibitPanels.initiate())
    const panels = result.data ?? []

    const forExhibit = panels
      .filter((p) => p.exhibit_id === 'the-great-migration')
      .sort((a, b) => a.sort_order - b.sort_order)

    // Count is DERIVED from the rows, never typed.
    expect(forExhibit).toHaveLength(2)
    expect(forExhibit.map((p) => p.title)).toEqual(['North End Arrivals', 'Building Community'])
  })
})
