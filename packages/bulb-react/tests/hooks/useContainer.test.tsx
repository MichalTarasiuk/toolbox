import { renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { useContainer } from '../../source/hooks/hooks'
import { FiberProvider } from '../../source/providers/providers'

import type { ReactNode } from 'react'

const wrapper = ({ children }: { children: ReactNode }) => (
  <FiberProvider>{children}</FiberProvider>
)

describe('react:hooks:useContainer', () => {
  it('should return container', () => {
    const { result } = renderHook(() => useContainer(), { wrapper })

    expect(result).toBeDefined()
  })
})
