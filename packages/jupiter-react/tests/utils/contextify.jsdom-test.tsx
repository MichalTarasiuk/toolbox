import { fireEvent, render } from '@testing-library/react'
import mockConsole from 'jest-mock-console'
import React, { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { contextify } from '../../_api'

const useSettings = () => useState({ dakrMode: false })

describe('jsdom - react:utils:contextify', () => {
  it('should render', () => {
    const restoreConsole = mockConsole()
    const [ContextProvider, useContext] = contextify(useSettings)

    const Component = () => {
      useContext()

      return <p>rendered correctly</p>
    }
    const { getByText } = render(
      <ErrorBoundary fallback={<p>fallback</p>}>
        <ContextProvider>
          <Component />
        </ContextProvider>
      </ErrorBoundary>,
    )

    expect(console.error).not.toHaveBeenCalled()
    getByText('rendered correctly')

    restoreConsole()
  })

  it('should not render', () => {
    const restoreConsole = mockConsole()
    const [_, useContext] = contextify(useSettings)

    const Component = () => {
      const [context] = useContext()

      return <p>{context.dakrMode ? 'dark' : 'light'}</p>
    }
    const { getByText } = render(
      <ErrorBoundary fallback={<p>fallback</p>}>
        <Component />
      </ErrorBoundary>,
    )

    expect(console.error).toHaveBeenCalled()
    getByText('fallback')

    restoreConsole()
  })

  it('should create global hook', () => {
    const [ContextProvider, useContext] = contextify(useSettings)

    const ChildA = () => {
      const [context] = useContext()

      return <p>{context.dakrMode ? 'dark' : 'light'}</p>
    }
    const ChildB = () => {
      const [, setContext] = useContext()

      const toggle = () =>
        setContext((settings) => ({
          ...settings,
          dakrMode: !settings.dakrMode,
        }))

      return <button onClick={toggle}>toggle</button>
    }

    const Component = () => (
      <ContextProvider>
        <ChildA />
        <ChildB />
      </ContextProvider>
    )

    const { getByText } = render(<Component />)

    fireEvent.click(getByText('toggle'))

    getByText('dark')
  })
})
