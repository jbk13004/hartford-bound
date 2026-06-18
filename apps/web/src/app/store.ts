import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { storiesApi } from '@/features/stories'
import { timelineApi } from '@/features/timeline'
import { archiveApi } from '@/features/archive'
import { mapsApi } from '@/features/maps'
import { exhibitsApi } from '@/features/exhibits'
import { tagsApi } from '@/features/tags'

/** Builds a fresh store. Used for the app singleton below and for isolated test stores. */
export const makeStore = () =>
  configureStore({
    reducer: {
      [storiesApi.reducerPath]: storiesApi.reducer,
      [timelineApi.reducerPath]: timelineApi.reducer,
      [archiveApi.reducerPath]: archiveApi.reducer,
      [mapsApi.reducerPath]: mapsApi.reducer,
      [exhibitsApi.reducerPath]: exhibitsApi.reducer,
      [tagsApi.reducerPath]: tagsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        storiesApi.middleware,
        timelineApi.middleware,
        archiveApi.middleware,
        mapsApi.middleware,
        exhibitsApi.middleware,
        tagsApi.middleware,
      ),
  })

export const store = makeStore()

// Enables refetchOnFocus / refetchOnReconnect behaviour (opted out per-API here,
// but wired once at the store so future APIs can opt in).
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
