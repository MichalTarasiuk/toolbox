import { renderHook } from '@testing-library/react-hooks'

import { useLazyRef } from '../../_api'

describe('jsdom - react:hooks:useLazyRef', () => {
  it('should return resolved `lazyInitialize`', () => {
    const resolved = 'Hello World'
    const lazyInitialize = () => resolved

    const {
      result: { current: hook },
    } = renderHook(() => useLazyRef(lazyInitialize))

    expect(hook.current).toBe(resolved)
  })

  it('should be mutable', () => {
    const resolved = 'Hello World'
    const lazyInitialize = () => resolved

    const {
      result: { current: hook },
    } = renderHook(() => useLazyRef(lazyInitialize))

    expect(hook.current).toBe(resolved)

    const nextValue = 'Hello Michał'
    hook.current = nextValue

    expect(hook.current).toBe(nextValue)
  })
})
