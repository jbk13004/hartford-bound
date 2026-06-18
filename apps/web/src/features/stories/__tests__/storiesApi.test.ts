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

    // Domain mapping: comma list -> array, pipe list -> paragraphs, variant union.
    expect(stories[0]).toMatchObject({
      id: 'addie-brown',
      title: 'Addie Brown',
      variant: 'blue',
      tags: ['#LABOR', '#GENDER'],
      body: ['First paragraph', 'Second paragraph'],
    })
    expect(stories[1].id).toBe('james-mars')
  })

  it('getStoryById returns the matching mapped story', async () => {
    const store = makeStore()
    const result = await store.dispatch(
      storiesApi.endpoints.getStoryById.initiate('james-mars'),
    )

    expect(result.data?.title).toBe('James Mars')
    expect(result.data?.variant).toBe('yellow')
  })
})
