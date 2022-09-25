import {
  createContext as createContextImpl,
  useContextSelector,
} from 'use-context-selector'

import { uppercaseFirst } from '@wren/utils'
import type { Context } from 'react'

type Selector<TContextValue, TSelected> = (
  contextValue: TContextValue,
) => TSelected

const defaultContextValue = Symbol()

const getErrorMessage = (name: string) =>
  `use${name} must be used within a ${name}Provider`

const createContext = <TContextValue>() =>
  createContextImpl(defaultContextValue) as unknown as Context<TContextValue>

const isInvalidHookCall = (contextValue: unknown) =>
  contextValue === defaultContextValue

export const createSafeContext = <TContextValue>(name: string) => {
  const safeContext = createContext<TContextValue>()
  const uppercasedName = uppercaseFirst(name)

  const useSafeContext = <TSelected = TContextValue>(
    selector?: Selector<TContextValue, TSelected>,
  ) => {
    const identity = (value: TContextValue) => value as unknown as TSelected
    const selected = useContextSelector(safeContext, selector ?? identity)

    if (isInvalidHookCall(selected)) {
      const errorMessage = getErrorMessage(name)

      throw Error(errorMessage)
    }

    return selected
  }

  safeContext.displayName = `${uppercasedName}Context`

  return [safeContext.Provider, useSafeContext] as const
}
