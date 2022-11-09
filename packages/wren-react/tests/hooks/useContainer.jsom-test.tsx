import { renderHook } from '@testing-library/react-hooks'

import { useContainer, FiberProvider } from '../../_api'

import type { ReactNode } from 'react'

const wrapper = ({ children }: { children: ReactNode }) => (
  <FiberProvider>{children}</FiberProvider>
)

describe('jsdom - react:hooks:useContainer', () => {
  it('should return container', () => {
    const { result } = renderHook(() => useContainer(), { wrapper })

    expect(result).toBeDefined()
  })
})
