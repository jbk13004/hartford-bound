import { describe, it, expect } from 'vitest'
import { makeStore } from '@/app/store'
import { exhibitsApi } from '../api/exhibitsApi'
import { exhibitToAsset } from '../types/exhibit'

describe('exhibitsApi', () => {
  it('maps rows to Exhibit domain objects (multi-value ids/tags + boolean active)', async () => {
    const store = makeStore()
    const result = await store.dispatch(exhibitsApi.endpoints.getExhibits.initiate())

    const exhibits = result.data ?? []
    expect(exhibits).toHaveLength(2)
    expect(exhibits[0]).toMatchObject({
      id: 'the-great-migration',
      title: 'The Great Migration',
      year_start: 1915,
      year_end: 1940,
      active: true,
      tags: ['migration', 'race'],
      story_ids: ['addie-brown', 'james-mars'],
      map_ids: ['holc-redlining', 'ward-map-1910'],
    })
    expect(exhibits[1].active).toBe(false)
  })

  it('projects an exhibit onto the generic Asset shape', async () => {
    const store = makeStore()
    const result = await store.dispatch(exhibitsApi.endpoints.getExhibits.initiate())
    const asset = exhibitToAsset((result.data ?? [])[0])

    expect(asset).toMatchObject({
      id: 'the-great-migration',
      type: 'exhibit',
      href: '/exhibits/the-great-migration',
      lat: 41.78,
      primaryTag: 'migration',
    })
  })
})
