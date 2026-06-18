import { describe, it, expect } from 'vitest'
import { makeStore } from '@/app/store'
import { mapsApi } from '../api/mapsApi'
import { mapToAsset } from '../types/map'

describe('mapsApi', () => {
  it('fetches CSV (via MSW) and maps rows to HartMap domain objects', async () => {
    const store = makeStore()
    const result = await store.dispatch(mapsApi.endpoints.getMaps.initiate())

    const maps = result.data ?? []
    expect(maps).toHaveLength(3)
    expect(maps[0]).toMatchObject({
      id: 'holc-redlining',
      title: 'HOLC Redlining',
      year_start: 1937,
      tags: ['race', 'migration'],
      collection_ids: ['routes-and-roots'],
    })
  })

  it('projects a map onto the generic Asset shape for the shared layer', async () => {
    const store = makeStore()
    const result = await store.dispatch(mapsApi.endpoints.getMaps.initiate())
    const asset = mapToAsset((result.data ?? [])[0])

    expect(asset).toMatchObject({
      id: 'holc-redlining',
      type: 'map',
      href: '/maps/holc-redlining',
      lat: 41.76,
      primaryTag: 'race',
    })
  })
})
