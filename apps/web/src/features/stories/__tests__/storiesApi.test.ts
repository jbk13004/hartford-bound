import { describe, it, expect } from 'vitest'
import { makeStore } from '@/app/store'
import { storiesApi } from '../api/storiesApi'

describe('storiesApi', () => {
  it('fetches CSV (via MSW) and maps rows to Story domain objects', async () => {
    const store = makeStore()
    const result = await store.dispatch(storiesApi.endpoints.getStories.initiate())

    expect(result.isSuccess).toBe(true)
    const stories = result.data ?? []
    expect(stories).toHaveLength(2)

    // Domain mapping: numbers parsed, multi-value columns split to arrays.
    expect(stories[0]).toMatchObject({
      id: 'addie-brown',
      title: 'Addie Brown',
      year_start: 1841,
      year_end: 1870,
      lat: 41.76,
      lng: -72.68,
      tags: ['labor', 'migration'],
      map_ids: ['holc-redlining'],
    })
    expect(stories[1].id).toBe('james-mars')
    expect(stories[1].map_ids).toEqual([])
  })

  it('getStoryById returns the matching mapped story', async () => {
    const store = makeStore()
    const result = await store.dispatch(
      storiesApi.endpoints.getStoryById.initiate('james-mars'),
    )

    expect(result.data?.title).toBe('James Mars')
    expect(result.data?.tags).toEqual(['race'])
  })

  it('getStoryBlocks maps blocks with parsed sort_order and type', async () => {
    const store = makeStore()
    const result = await store.dispatch(
      storiesApi.endpoints.getStoryBlocks.initiate(),
    )

    const blocks = result.data ?? []
    expect(blocks).toHaveLength(4)
    const addie = blocks.filter((b) => b.story_id === 'addie-brown')
    expect(addie.map((b) => b.sort_order)).toEqual([20, 10, 30])
    expect(addie.find((b) => b.type === 'photo')?.caption).toBe('A caption')
  })
})
