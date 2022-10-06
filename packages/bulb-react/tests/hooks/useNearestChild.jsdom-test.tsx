import { render } from '@testing-library/react'
import React from 'react'

import { useLayout, useNearestChild } from '../../source/hooks/hooks'
import { FiberProvider } from '../../source/providers/providers'

import type { ReactNode } from 'react'

const Wrapper = ({ children }: { children: ReactNode }) => (
  <FiberProvider>{children}</FiberProvider>
)

describe('jsdom - react:hooks:useNearestChild', () => {
  it('should return nearest child', () => {
    const spy = jest.fn()
    const paragraph = <p>example</p>
    const Example = () => {
      const nearestChild = useNearestChild<HTMLParagraphElement>()

      useLayout(() => {
        spy(nearestChild.current?.innerHTML)
      }, [])

      return paragraph
    }

    render(
      <Wrapper>
        <Example />
      </Wrapper>,
    )

    expect(spy).toHaveBeenCalledWith('example')
  })

  it('should return `undefined` when the child was not found', () => {
    const spy = jest.fn()
    const Example = () => {
      const nearestChild = useNearestChild()

      useLayout(() => {
        spy(nearestChild)
      }, [])

      return null
    }

    render(
      <Wrapper>
        <Example />
      </Wrapper>,
    )

    expect(spy).toHaveBeenLastCalledWith({ current: undefined })
  })
})
