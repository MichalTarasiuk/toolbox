import { renderHook } from '@testing-library/react-hooks'
import { useEffect } from 'react'

import { useHasCommit } from '../../_api'

describe('jsdom - react:hooks:useHasCommit', () => {
  it('should return `true` after `useLayoutEffect` call', () => {
    const { result } = renderHook(() => useHasCommit())

    expect(result.current()).toBeTruthy()
  })

  it('should return `true` when componenet is unmounted', () => {
    const { result, unmount } = renderHook(() => useHasCommit())

    unmount()

    expect(result.current()).toBeFalsy()
  })

  it('be truthy in `useEffect` call', async () => {
    const spy = jest.fn()

    const { waitFor } = renderHook<{ effect: typeof spy }, void>(
      ({ effect }) => {
        const hasCommit = useHasCommit()

        useEffect(() => {
          effect(hasCommit())
        }, [])
      },
      { initialProps: { effect: spy } },
    )

    await waitFor(spy)

    expect(spy).toHaveBeenCalledWith(true)
  })
})
