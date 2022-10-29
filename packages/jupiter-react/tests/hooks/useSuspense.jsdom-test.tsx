import { sleep } from '@jupiter/utils'
import { render } from '@testing-library/react'
import React from 'react'

import { useSuspense } from '../../_api'

describe('jsdom - react:hooks:useSuspense', () => {
  it('should wait for promise resolved', async () => {
    const fetchUser = async () => {
      await sleep(1000, null)[0]

      return {
        name: 'Michał',
        age: 19,
      }
    }

    const Component = () => {
      const { name } = useSuspense(fetchUser)

      return <p>name: {name}</p>
    }

    const { findByText } = render(<Component />)

    await findByText('name: Michał')
  })
})
