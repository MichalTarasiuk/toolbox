import { noop } from '@flame/utils'
import { renderHook } from '@testing-library/react'

import { useEvent } from '../../_api'

describe('jsdom - react:hooks:useEvent', () => {
  it('should have stable reference on each rerender', () => {
    const { result, rerender } = renderHook(() => useEvent(() => {}), {
      initialProps: { fn: noop },
    })
    const savedResult = result.current

    rerender({ fn: noop.bind(undefined) })
    rerender({ fn: noop.bind(undefined) })

    expect(result.current).toBe(savedResult)
  })
})
