import { fireEvent, render } from '@testing-library/react'
import { useState } from 'react'

import { When, Unless, If, Then, Else } from '../../_api'

describe('jsdom - react:components:Conditions', () => {
  test('react:components:Conditions:When', () => {
    const Component = () => {
      const [condition, setCondition] = useState(false)

      const toggle = () => setCondition(!condition)

      return (
        <>
          <When condition={condition}>
            <p>Hello World</p>
          </When>
          <button onClick={toggle}>toggle</button>
        </>
      )
    }

    const { getByText } = render(<Component />)

    expect(() => getByText('Hello World')).toThrowError()

    fireEvent.click(getByText('toggle'))

    getByText('Hello World')
  })

  test('react:components:Conditions:Unless', () => {
    const Component = () => {
      const [condition, setCondition] = useState(false)

      const toggle = () => setCondition(!condition)

      return (
        <>
          <Unless condition={condition}>
            <p>Hello World</p>
          </Unless>
          <button onClick={toggle}>toggle</button>
        </>
      )
    }

    const { getByText } = render(<Component />)

    getByText('Hello World')

    fireEvent.click(getByText('toggle'))

    expect(() => getByText('Hello World')).toThrowError()
  })

  test('react:components:Conditions:If', () => {
    const Component = () => {
      const [condition, setCondition] = useState(false)

      const toggle = () => setCondition(!condition)

      return (
        <>
          <If condition={condition}>
            <Then>
              <p>Truthy</p>
            </Then>
            <Else>
              <p>Falsy</p>
            </Else>
          </If>
          <button onClick={toggle}>toggle</button>
        </>
      )
    }

    const { getByText } = render(<Component />)

    getByText('Falsy')

    fireEvent.click(getByText('toggle'))

    getByText('Truthy')
  })
})
