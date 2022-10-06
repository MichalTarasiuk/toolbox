import { renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { useNearestParent } from '../../source/hooks/hooks'
import { FiberProvider } from '../../source/providers/providers'

import type { ReactNode } from 'react'

describe('jsdom - react:hooks:useNearestChild', () => {
  it('should return nearest parent', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <FiberProvider>
        <div>
          <p>some content</p>
          {children}
        </div>
      </FiberProvider>
    )
    const { result } = renderHook(() => useNearestParent(), {
      wrapper,
    })

    expect(result).toBeDefined()
  })

  it('should return `undefined` when the parent was not found', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <FiberProvider>{children}</FiberProvider>
    )

    const { result } = renderHook(() => useNearestParent(), {
      wrapper,
    })

    expect(result.current).toEqual({ current: undefined })
  })
})
