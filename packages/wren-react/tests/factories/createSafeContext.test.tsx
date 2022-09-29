import { render } from '@testing-library/react'
import React, { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { createSafeContext } from '../../source/factories/createSafeContext'

import type { ReactNode } from 'react'

type ContextValue = { name: string; age: number }

type RenderProps = { withProvider?: boolean; displayNameSpy?: UnknownFunction }
type SafeContextProviderProps = RenderProps & {
  children: ReactNode
  value: ContextValue
}
type DisplayNameProps = Pick<RenderProps, 'displayNameSpy'>

const createTree = (initialContextValue: ContextValue) => {
  const [SafeContextProvider, useSafeContext] =
    createSafeContext<ContextValue>('tree')

  const FallbackComponent = () => <p>ERROR: something went wrong ¯\_(ツ)_/¯</p>

  const DisplayName = (props: DisplayNameProps) => {
    const name = useSafeContext((value) => value.name)

    props?.displayNameSpy()

    return <p>name: {name}</p>
  }

  const DisplayAge = () => {
    const age = useSafeContext((value) => value.age)

    return <p>age: {age}</p>
  }

  const OptionalSafeContextProvider = (props: SafeContextProviderProps) => {
    if (props.withProvider) {
      return (
        <SafeContextProvider value={props.value}>
          {props.children}
        </SafeContextProvider>
      )
    }

    return <>{props.children}</>
  }

  const render = (props?: RenderProps) => {
    const [contextValue, setContextValue] = useState(initialContextValue)

    const { withProvider = true } = props || {}

    const handler = {
      simulateYear: () =>
        setContextValue({ ...contextValue, age: contextValue.age + 1 }),
    }

    return {
      ui: (
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          <OptionalSafeContextProvider
            value={contextValue}
            withProvider={withProvider}
          >
            <DisplayName />
            <DisplayAge />
          </OptionalSafeContextProvider>
        </ErrorBoundary>
      ),
      handler,
    }
  }

  return {
    render,
  }
}

describe.skip('react:factories:createSafeContext', () => {
  it('should render correctly', () => {
    const tree = createTree({ name: 'Michał', age: 19 })
    const { ui } = tree.render()

    render(ui)
  })

  it('should trow provider error', () => {
    const tree = createTree({ name: 'Michał', age: 19 })
    const { ui } = tree.render({ withProvider: false })

    render(ui)
  })

  it('should rerender `DisplayAge` component', async () => {
    const initialContextValue = { name: 'Michał', age: 19 }

    const tree = createTree(initialContextValue)
    const { ui, handler } = tree.render()

    const { findByText } = render(ui)

    handler.simulateYear()

    await findByText(`age: ${initialContextValue.age}`)
  })

  it('should not rerender `DisplayName` component on update age', async () => {
    const initialContextValue = { name: 'Michał', age: 19 }
    const displayNameSpy = jest.fn()

    const tree = createTree(initialContextValue)
    const { ui, handler } = tree.render({ displayNameSpy })

    const { findByText } = render(ui)

    handler.simulateYear()

    await findByText(`age: ${initialContextValue.age}`)
    expect(displayNameSpy).toHaveBeenCalledTimes(1)
  })
})
