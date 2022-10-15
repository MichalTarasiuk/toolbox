import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { createAtoms } from '../../_api'

describe('react:factories:createAtoms', () => {
  it('should rerender component on update atom', () => {
    const { atom, useAtom } = createAtoms()
    const userAtom = atom(null)

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
})
