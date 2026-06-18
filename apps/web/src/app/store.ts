import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { storiesApi } from '@/features/stories'
import { timelineEventsApi } from '@/features/timelineEvents'
import { archiveApi } from '@/features/archive'
import { mapsApi } from '@/features/maps'
import { collectionsApi } from '@/features/collections'
import { exhibitsApi } from '@/features/exhibits'
import { exhibitPanelsApi } from '@/features/exhibitPanels'
import { tagsApi } from '@/features/tags'

/** Builds a fresh store. Used for the app singleton below and for isolated test stores. */
export const makeStore = () =>
  configureStore({
    reducer: {
      [storiesApi.reducerPath]: storiesApi.reducer,
      [timelineEventsApi.reducerPath]: timelineEventsApi.reducer,
      [archiveApi.reducerPath]: archiveApi.reducer,
      [mapsApi.reducerPath]: mapsApi.reducer,
      [collectionsApi.reducerPath]: collectionsApi.reducer,
      [exhibitsApi.reducerPath]: exhibitsApi.reducer,
      [exhibitPanelsApi.reducerPath]: exhibitPanelsApi.reducer,
      [tagsApi.reducerPath]: tagsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        storiesApi.middleware,
        timelineEventsApi.middleware,
        archiveApi.middleware,
        mapsApi.middleware,
        collectionsApi.middleware,
        exhibitsApi.middleware,
        exhibitPanelsApi.middleware,
        tagsApi.middleware,
      ),
  })

export const store = makeStore()

// Enables refetchOnFocus / refetchOnReconnect behaviour (opted out per-API here,
// but wired once at the store so future APIs can opt in).
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
