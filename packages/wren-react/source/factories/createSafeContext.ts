import { uppercaseFirst } from '@wren/utils'
import {
  createContext as createContextImpl,
  useContextSelector,
} from 'use-context-selector'

type Selector<TContextValue, TSelected> = (
  contextValue: TContextValue,
) => TSelected

const defaultContextValue = Symbol()

const getErrorMessage = (name: string) =>
  `use${name} must be used within a ${name}Provider`

const createContext = <ContextValue>() =>
  createContextImpl<ContextValue | typeof defaultContextValue>(
    defaultContextValue,
  )

const isInvalidHookCall = (contextValue: unknown) =>
  contextValue === defaultContextValue

export const createSafeContext = <ContextValue>(name: string) => {
  const safeContext = createContext<ContextValue>()
  const uppercasedName = uppercaseFirst(name)

  const useSafeContext = <Selected = ContextValue>(
    selector?: Selector<ContextValue, Selected>,
  ) => {
    const identity = (value: ContextValue) => value
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
