import { renderHook } from '@testing-library/react-hooks/server'
import { useEffect } from 'react'

import { useLayout } from '../../source/hooks/useLayout'

describe('jsdom - react:hooks:useLayout', () => {
  it('should return `useEffect` on server', () => {
    const {
      result: { current: hook },
    } = renderHook(() => useLayout)

    expect(hook).toBe(useEffect)
  })
})
