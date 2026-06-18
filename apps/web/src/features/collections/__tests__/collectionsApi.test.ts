import { describe, it, expect } from 'vitest'
import { makeStore } from '@/app/store'
import { collectionsApi } from '../api/collectionsApi'

describe('collectionsApi', () => {
  it('fetches CSV (via MSW) and maps rows to Collection domain objects', async () => {
    const store = makeStore()
    const result = await store.dispatch(
      collectionsApi.endpoints.getCollections.initiate(),
    )

    const collections = result.data ?? []
    expect(collections).toHaveLength(2)
    expect(collections[0]).toMatchObject({
      id: 'routes-and-roots',
      title: 'Routes and Roots',
      subtitle: 'Migration Patterns',
      tags: ['migration'],
    })
    expect(collections[0].cover_image_url).toContain('live.staticflickr.com')
  })
})
