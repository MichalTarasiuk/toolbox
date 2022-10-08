import { renderHook } from '@testing-library/react'

import { useEventHub } from '../../source/hooks/hooks'

describe('jsdom - react:hooks:useEventHub', () => {
  it('should subscribe and listen', () => {
    const spy = jest.fn()
    const event = { name: 'event' }

    const { result } = renderHook(() => useEventHub('click', spy))

    result.current.emit(event)

    expect(spy).toHaveBeenCalledWith(event)
  })

  it('should unsubscribe before componenet unmount', () => {
    const spy = jest.fn()
    const event = { name: 'event' }

    const { result, unmount } = renderHook(() => useEventHub('click', spy))

    unmount()
    result.current.emit(event)

    expect(spy).not.toHaveBeenCalledWith(event)
  })
})
