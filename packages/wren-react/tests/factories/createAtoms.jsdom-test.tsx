import { fireEvent, render } from '@testing-library/react'
import { isUndefined } from '@wren/utils'
import React from 'react'

import 'mock-local-storage'
import { createAtoms } from '../../_api'

describe('jsdom - react:factories:createAtoms', () => {
  it('should emit update atom', () => {
    const { atom, useAtom } = createAtoms()
    const userAtom = atom<{ name: string; age: number } | null>(null)

    const Component = () => {
      const [user, setUser] = useAtom(userAtom)

      if (user) {
        return <p>user is fetched</p>
      }

      const fetchUser = () => {
        setUser({ name: 'Michał', age: 19 })
      }

      return <button onClick={fetchUser}>fetch user</button>
    }

    const { getByText } = render(<Component />)

    fireEvent.click(getByText('fetch user'))

    getByText('user is fetched')
  })

  it('should rerender component on update atom', () => {
    const { atom, useAtom } = createAtoms()
    const userAtom = atom<{ name: string; age: number } | null>(null)

    const Child = () => {
      const [_, setUser] = useAtom(userAtom)

      const fetchUser = () => {
        setUser({ name: 'Michał', age: 19 })
      }

      return <button onClick={fetchUser}>fetch user</button>
    }
    const Parent = () => {
      const [user] = useAtom(userAtom)

      return (
        <>
          {user && 'user is fetched'}
          <Child />
        </>
      )
    }

    const { getByText } = render(<Parent />)

    fireEvent.click(getByText('fetch user'))

    getByText('user is fetched')
  })

  it('should invoke atom when coworked is updated', () => {
    const { atom, useAtom } = createAtoms()

    const firstnameAtom = atom<string | null>(null)
    const userAtom = atom((get) => ({ firstname: get(firstnameAtom) }))

    const FirstnameSetter = () => {
      const [_, setFirstname] = useAtom(firstnameAtom)

      return (
        <button onClick={() => setFirstname('Michał')}>set firstname</button>
      )
    }
    const Component = () => {
      const [user] = useAtom(userAtom)

      if (user.firstname) {
        return <p>status: success</p>
      }

      return <FirstnameSetter />
    }

    const { getByText } = render(<Component />)

    fireEvent.click(getByText('set firstname'))

    getByText('status: success')
  })

  it('should work with custom set', () => {
    const { atom, useAtom } = createAtoms()

    const firstnameAtom = atom<string | null>(null, (_, set) => {
      set('Michał')
    })
    const userAtom = atom((get) => ({ firstname: get(firstnameAtom) }))

    const FirstnameSetter = () => {
      const [_, setFirstname] = useAtom(firstnameAtom)

      return <button onClick={() => setFirstname()}>set firstname</button>
    }
    const Component = () => {
      const [user] = useAtom(userAtom)

      if (user.firstname) {
        return <p>status: success</p>
      }

      return <FirstnameSetter />
    }

    const { getByText } = render(<Component />)

    fireEvent.click(getByText('set firstname'))

    getByText('status: success')
  })

  it('should save counter in localstorage', () => {
    const { atomWithStorage, useAtom } = createAtoms()
    const counterAtom = atomWithStorage('counter', '1')

    const Component = () => {
      const [counter, setCounter] = useAtom(counterAtom)

      return (
        <div>
          <p>counter: {counter}</p>
          <button
            onClick={() => {
              setCounter((counter) => {
                const parsedCounter = Number(counter)
                const nextCounter = parsedCounter + 1

                return nextCounter.toString()
              })
            }}
          >
            increase
          </button>
        </div>
      )
    }

    const { getByText } = render(<Component />)

    fireEvent.click(getByText('increase'))

    getByText('counter: 2')
    expect(window.localStorage.getItem('counter')).toBe('2')
  })

  it('should not rerender component which update atom', () => {
    const { atom, useAtomValue, useUpdateAtom } = createAtoms()
    const counterAtom = atom(0)

    const displayerSpy = jest.fn()
    const updaterSpy = jest.fn()

    const Displayer = () => {
      const counter = useAtomValue(counterAtom)

      displayerSpy()

      return <p>counter: {counter}</p>
    }
    const Updater = () => {
      const updateAtom = useUpdateAtom(counterAtom)

      updaterSpy()

      const increase = () => {
        updateAtom((counter) => (isUndefined(counter) ? 0 : counter + 1))
      }

      return <button onClick={increase}>increase</button>
    }

    const Component = () => {
      return (
        <>
          <Displayer />
          <Updater />
        </>
      )
    }

    const { getByText } = render(<Component />)

    fireEvent.click(getByText('increase'))
    fireEvent.click(getByText('increase'))

    getByText('counter: 2')

    expect(displayerSpy).toHaveBeenCalledTimes(3)
    expect(updaterSpy).toHaveBeenCalledTimes(1)
  })
})
