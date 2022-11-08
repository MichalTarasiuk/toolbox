import { fireEvent, render } from '@testing-library/react'
import mockConsole from 'jest-mock-console'
import React, { memo, useCallback, useRef } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { createFastContext } from '../../_api'

import type { ReactNode } from 'react'

describe('jsdom - react:factories:createFastContext', () => {
  it('should render', () => {
    const [UserProvider, useUser] = createFastContext<{ name: string }>('user')

    const Component = () => {
      const [user] = useUser()

      return <p>name {user.name}</p>
    }
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <UserProvider store={{ name: 'Michał' }}>{children}</UserProvider>
    )

    render(<Component />, { wrapper: Wrapper })
  })

  it('should not render', () => {
    const restoreConsole = mockConsole()
    const [_, useUser] = createFastContext<{ name: string }>('user')

    const Component = () => {
      const [user] = useUser()

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

  it('should rerender when selected store is changed', () => {
    const [UserProvider, useUser] = createFastContext<{
      name: string
      age: number
    }>('user')

    const Child = memo(() => {
      const counter = useRef(0)
      const [name] = useUser((store) => store.name)

      return (
        <div>
          <p>name: {name}</p>
          <p>counter: {counter.current}</p>
        </div>
      )
    })
    const Parent = () => {
      const [user, setUser] = useUser()

      return (
        <div>
          <Child />
          <button
            onClick={() => {
              setUser({ ...user, name: 'Łukasz' })
            }}
          >
            update name
          </button>
          <button
            onClick={() => {
              setUser({ ...user, age: user.age + 1 })
            }}
          >
            increase age
          </button>
        </div>
      )
    }

    const Wrapper = ({ children }: { children: ReactNode }) => (
      <UserProvider store={{ name: 'Michał', age: 19 }}>
        {children}
      </UserProvider>
    )

    const { getByText } = render(<Parent />, { wrapper: Wrapper })

    getByText('name: Michał')

    fireEvent.click(getByText('increase age'))
    fireEvent.click(getByText('increase age'))
    fireEvent.click(getByText('increase age'))

    getByText('counter: 0')

    fireEvent.click(getByText('update name'))

    getByText('name: Łukasz')
  })

  it('should not rerender when selected store is not changed', () => {
    const [UserProvider, useUser] = createFastContext<{
      name: string
      age: number
    }>('user')

    const Child = memo(() => {
      const counter = useRef(0)
      const [name] = useUser((store) => store.name)

      return (
        <div>
          <p>name: {name}</p>
          <p>counter: {counter.current}</p>
        </div>
      )
    })
    const Parent = () => {
      const [user, setUser] = useUser()

      return (
        <div>
          <Child />
          <button
            onClick={() => {
              setUser({ ...user, name: 'Łukasz' })
            }}
          >
            update name
          </button>
          <button
            onClick={() => {
              setUser({ ...user, age: user.age + 1 })
            }}
          >
            increase age
          </button>
        </div>
      )
    }

    const Wrapper = ({ children }: { children: ReactNode }) => (
      <UserProvider store={{ name: 'Michał', age: 19 }}>
        {children}
      </UserProvider>
    )

    const { getByText } = render(<Parent />, { wrapper: Wrapper })

    getByText('name: Michał')

    fireEvent.click(getByText('increase age'))
    fireEvent.click(getByText('increase age'))
    fireEvent.click(getByText('increase age'))

    getByText('counter: 0')
  })

  it('should work with lazy state update', () => {
    const [UserProvider, useUser] = createFastContext<{
      name: string
      age: number
    }>('user')

    const Wrapper = ({ children }: { children: ReactNode }) => (
      <UserProvider store={{ name: 'Michał', age: 19 }}>
        {children}
      </UserProvider>
    )
    const Component = () => {
      const [user, setUser] = useUser()

      const increaseAge = useCallback(() => {
        setUser((user) => ({ ...user, age: user.age + 1 }))
      }, [setUser])

      return (
        <div>
          <p>age: {user.age}</p>
          <button onClick={increaseAge}>increase age</button>
        </div>
      )
    }

    const { getByText } = render(<Component />, { wrapper: Wrapper })

    fireEvent.click(getByText('increase age'))
    fireEvent.click(getByText('increase age'))
    fireEvent.click(getByText('increase age'))

    getByText('age: 22')
  })

  it('should not work without lazy state update', () => {
    const [UserProvider, useUser] = createFastContext<{
      name: string
      age: number
    }>('user')

    const Wrapper = ({ children }: { children: ReactNode }) => (
      <UserProvider store={{ name: 'Michał', age: 19 }}>
        {children}
      </UserProvider>
    )
    const Component = () => {
      const [user, setUser] = useUser()

      const increaseAge = useCallback(() => {
        setUser({ ...user, age: user.age })
      }, [setUser])

      return (
        <div>
          <p>age: {user.age}</p>
          <button onClick={increaseAge}>increase age</button>
        </div>
      )
    }

    const { getByText } = render(<Component />, { wrapper: Wrapper })

    fireEvent.click(getByText('increase age'))
    fireEvent.click(getByText('increase age'))
    fireEvent.click(getByText('increase age'))

    getByText('age: 19')
  })
})
