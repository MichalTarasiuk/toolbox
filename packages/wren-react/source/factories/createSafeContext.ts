import { uppercaseFirst } from '@wren/utils'
import {
	createContext as createContextImpl,
	useContextSelector,
} from 'use-context-selector'

import type { Context } from 'use-context-selector'

type Selector<ContextValue, Selected> = (contextValue: ContextValue) => Selected

const defaultContextValue = Symbol()

const getErrorMessage = (name: string) =>
	`use${name} must be used within a ${name}Provider`

const isInvalidHookCall = (contextValue: unknown) =>
	contextValue === defaultContextValue

const createContext = <ContextValue>() =>
	createContextImpl<ContextValue | typeof defaultContextValue>(
		defaultContextValue,
	)

export const createSafeContext = <ContextValue>(name: string) => {
	const safeContext = createContext<ContextValue>()
	const uppercasedName = uppercaseFirst(name)

	const useSafeContext = <Selected = ContextValue>(
		selector?: Selector<ContextValue, Selected>,
	) => {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safty assertion
		const identity = (value: ContextValue) => value as unknown as Selected
		const selected = useContextSelector(
			// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- developer should't know about default context value
			safeContext as Context<ContextValue>,
			selector ?? identity,
		)

		if (isInvalidHookCall(selected)) {
			const errorMessage = getErrorMessage(name)

			throw Error(errorMessage)
		}

		return selected
	}

	safeContext.displayName = `${uppercasedName}Context`

	return [safeContext.Provider, useSafeContext] as const
}
