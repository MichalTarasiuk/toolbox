import { renderHook } from '@testing-library/react-hooks'
import { useLayoutEffect } from 'react'

import { useLayout } from '../../source/hooks/useLayout'

describe('jsdom - react:hooks:useLayout', () => {
  it('should return `useLayoutEffect` on client', () => {
    const {
      result: { current: hook },
    } = renderHook(() => useLayout)

    expect(hook).toBe(useLayoutEffect)
  })
})
