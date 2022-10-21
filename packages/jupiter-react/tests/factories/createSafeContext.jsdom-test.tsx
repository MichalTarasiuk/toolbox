import { render } from '@testing-library/react'
import mockConsole from 'jest-mock-console'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { createSafeContext } from '../../_api'

import type { ReactNode } from 'react'

describe('react:factories:createSafeContext', () => {
  it('should render', () => {
    const [UserProvider, useUser] = createSafeContext<{ name: string }>('user')

    const Component = () => {
      const user = useUser()

      return <p>name {user.name}</p>
    }
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <UserProvider value={{ name: 'Michał' }}>{children}</UserProvider>
    )

    render(<Component />, { wrapper: Wrapper })
  })

  it('should not render', () => {
    const restoreConsole = mockConsole()
    const [_, useUser] = createSafeContext<{ name: string }>('user')

    const Component = () => {
      const user = useUser()

      return <p>name {user.name}</p>
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
})