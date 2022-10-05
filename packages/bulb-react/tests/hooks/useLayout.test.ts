import { renderHook as renderHookClient } from '@testing-library/react-hooks'
import { renderHook as renderHookServer } from '@testing-library/react-hooks/server'
import { useEffect, useLayoutEffect } from 'react'

import { useLayout } from '../../source/hooks/useLayout'

describe('react:hooks:useLayout', () => {
  it('should return `useEffect` on client', () => {
    const {
      result: { current: hook },
    } = renderHookClient(() => useLayout)

    expect(hook).toBe(useLayoutEffect)
  })

  it('should return `useEffect` on server', () => {
    const {
      result: { current: hook },
    } = renderHookServer(() => useLayout)

    expect(hook).toBe(useEffect)
  })
})
