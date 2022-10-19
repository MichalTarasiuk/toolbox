import { noop } from '@brainless/utils'
import { fireEvent, render } from '@testing-library/react'
import React, { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { createSelectorContext } from '../../_api'

import type { Any } from '@brainless/typescript'
import type { ReactNode } from 'react'

type ContextValue = {
  name: string
  age: number
}

type RenderProps = {
  withProvider?: boolean
  displayNameSpy?: Any.UnknownFunction
}
type SelectorContextProviderProps = RenderProps & {
  children: ReactNode
}
type DisplayNameProps = Required<Pick<RenderProps, 'displayNameSpy'>>

const createTree = (initialContextValue: ContextValue) => {
  const [SelectorContextProvider, useSelectorContext] =
    createSelectorContext<ContextValue>('tree')

  const FallbackComponent = () => <p>ERROR: something went wrong ¯\_(ツ)_/¯</p>

  const DisplayName = (props: DisplayNameProps) => {
    const name = useSelectorContext((value) => value.name)

    props.displayNameSpy()

    return <p>{`name: ${name}`}</p>
  }

  const DisplayAge = () => {
    const age = useSelectorContext((value) => value.age)

    return <p>{`age: ${age}`}</p>
  }

  const OptionalSelectorContextProvider = (
    props: SelectorContextProviderProps,
  ) => {
    const [contextValue, setContextValue] = useState(initialContextValue)

    const simulateYear = () => {
      setContextValue({ ...contextValue, age: contextValue.age + 1 })
    }

    if (props.withProvider) {
      return (
        <SelectorContextProvider value={contextValue}>
          {props.children}
          <button onClick={simulateYear}>simulate year</button>
        </SelectorContextProvider>
      )
    }

    return <>{props.children}</>
  }

  const Tree = (props?: RenderProps) => {
    const { withProvider = true } = props || {}

    return (
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <OptionalSelectorContextProvider withProvider={withProvider}>
          <DisplayName displayNameSpy={props?.displayNameSpy || noop} />
          <DisplayAge />
        </OptionalSelectorContextProvider>
      </ErrorBoundary>
    )
  }

  return Tree
}

describe('react:factories:createSelectorContext', () => {
  it('should render correctly', () => {
    const Tree = createTree({ name: 'Michał', age: 19 })

    const { getByText } = render(<Tree />)

    getByText('simulate year')
  })

  it('should rerender `DisplayAge` component', async () => {
    const initialContextValue = { name: 'Michał', age: 19 }
    const Tree = createTree(initialContextValue)

    const { findByText, getByText } = render(<Tree />)

    fireEvent.click(getByText('simulate year'))

    await findByText(`age: ${initialContextValue.age + 1}`)
  })

  it('should not rerender `DisplayName` component on update age', () => {
    const initialContextValue = { name: 'Michał', age: 19 }
    const displayNameSpy = jest.fn()
    const Tree = createTree(initialContextValue)

    const { getByText } = render(<Tree displayNameSpy={displayNameSpy} />)

    fireEvent.click(getByText('simulate year'))

    getByText(`age: ${initialContextValue.age + 1}`)
    expect(displayNameSpy).toHaveBeenCalledTimes(3)
  })
})
