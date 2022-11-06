import { renderHook } from '@testing-library/react-hooks'

import { useLazyRef } from '../../_api'

describe('jsdom - react:hooks:useLazyRef', () => {
  it('should return resolved `lazyInitialize`', () => {
    const resolved = Symbol()
    const lazyInitialize = () => resolved

    const {
      result: { current: hook },
    } = renderHook(() => useLazyRef(lazyInitialize))

    expect(hook.current).toBe(resolved)
  })

  it('should be mutable', () => {
    const resolved = Symbol()
    const lazyInitialize = () => resolved

    const {
      result: { current: hook },
    } = renderHook(() => useLazyRef(lazyInitialize))

    expect(hook.current).toBe(resolved)

    const nextValue = Symbol()
    hook.current = nextValue

    expect(hook.current).toBe(nextValue)
  })
})
