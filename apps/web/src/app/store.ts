import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { storiesApi } from '@/features/stories'
import { timelineApi } from '@/features/timeline'
import { archiveApi } from '@/features/archive'

export const store = configureStore({
  reducer: {
    [storiesApi.reducerPath]: storiesApi.reducer,
    [timelineApi.reducerPath]: timelineApi.reducer,
    [archiveApi.reducerPath]: archiveApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      storiesApi.middleware,
      timelineApi.middleware,
      archiveApi.middleware,
    ),
})

// Enables refetchOnFocus / refetchOnReconnect behaviour (opted out per-API here,
// but wired once at the store so future APIs can opt in).
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
