import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import 'mock-local-storage'

import { createAtoms } from '../../_api'

describe('react:factories:createAtoms', () => {
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
})
