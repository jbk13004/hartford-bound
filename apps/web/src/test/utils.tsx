import type { PropsWithChildren, ReactElement } from 'react'
import { render, renderHook, type RenderHookOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { makeStore } from '@/app/store'

/** Wraps children in a fresh Redux store and a router (for <Link>/navigation). */
const providers = (route: string) =>
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Provider store={makeStore()}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    )
  }

/** Render a component with a fresh Redux store and a router (for <Link>). */
export function renderWithProviders(
  ui: ReactElement,
  { route = '/' }: { route?: string } = {},
) {
  const store = makeStore()
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>,
    ),
  }
}

/** Render a hook with the store + router providers (for RTK Query hook tests). */
export function renderHookWithProviders<Result, Props>(
  hook: (props: Props) => Result,
  options?: RenderHookOptions<Props> & { route?: string },
) {
  const { route = '/', ...rest } = options ?? {}
  return renderHook(hook, { wrapper: providers(route), ...rest })
}
