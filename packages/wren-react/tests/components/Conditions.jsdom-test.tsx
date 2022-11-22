import { fireEvent, render } from '@testing-library/react'
import { isNull } from '@wren/utils'
import { useState } from 'react'

import { When, Unless, If, Then, Else, Switch, Case, Default } from '../../_api'

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

  test('react:components:Conditions:Switch', () => {
    const Component = () => {
      const [condition, setCondition] = useState<boolean | null>(false)

      const toggle = () => setCondition(!condition)

      const reset = () => setCondition(null)

      return (
        <>
          <Switch>
            <Case condition={isNull(condition) ? false : condition}>
              <p>1</p>
            </Case>
            <Case condition={isNull(condition) ? false : !condition}>
              <p>2</p>
            </Case>
            <Default>
              <p>fallback</p>
            </Default>
            <Case condition={false}>
              <p>3</p>
            </Case>
          </Switch>
          <button onClick={toggle}>toggle</button>
          <button onClick={reset}>reset</button>
        </>
      )
    }

    const { getByText } = render(<Component />)

    getByText('2')

    fireEvent.click(getByText('toggle'))

    getByText('1')

    fireEvent.click(getByText('reset'))

    getByText('fallback')
    getByText('3')
  })
})
