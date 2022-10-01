import { fireEvent, render } from '@testing-library/react'
import { noop } from '@wren/utils'
import React, { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { createSafeContext } from '../../source/factories/createSafeContext'

import type { ReactNode } from 'react'

type ContextValue = {
	name: string
	age: number
}

type RenderProps = { withProvider?: boolean; displayNameSpy?: UnknownFunction }
type SafeContextProviderProps = RenderProps & {
	children: ReactNode
}
type DisplayNameProps = Required<Pick<RenderProps, 'displayNameSpy'>>

const createTree = (initialContextValue: ContextValue) => {
	const [SafeContextProvider, useSafeContext] =
		createSafeContext<ContextValue>('tree')

	const FallbackComponent = () => <p>ERROR: something went wrong ¯\_(ツ)_/¯</p>

	const DisplayName = (props: DisplayNameProps) => {
		const name = useSafeContext((value) => value.name)

		props.displayNameSpy()

		return <p>{`name: ${name}`}</p>
	}

	const DisplayAge = () => {
		const age = useSafeContext((value) => value.age)

		return <p>{`age: ${age}`}</p>
	}

	const OptionalSafeContextProvider = (props: SafeContextProviderProps) => {
		const [contextValue, setContextValue] = useState(initialContextValue)

		const simulateYear = () => {
			setContextValue({ ...contextValue, age: contextValue.age + 1 })
		}

		if (props.withProvider) {
			return (
				<SafeContextProvider value={contextValue}>
					{props.children}
					<button onClick={simulateYear}>simulate year</button>
				</SafeContextProvider>
			)
		}

		return <>{props.children}</>
	}

	const Tree = (props?: RenderProps) => {
		const { withProvider = true } = props || {}

		return (
			<ErrorBoundary FallbackComponent={FallbackComponent}>
				<OptionalSafeContextProvider withProvider={withProvider}>
					<DisplayName displayNameSpy={props?.displayNameSpy || noop} />
					<DisplayAge />
				</OptionalSafeContextProvider>
			</ErrorBoundary>
		)
	}

	return Tree
}

describe('react:factories:createSafeContext', () => {
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
