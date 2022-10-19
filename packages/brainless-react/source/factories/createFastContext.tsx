import { createEventHub } from '@brainless/utils'
import React, {
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react'

import { createSafeContext } from './createSafeContext'

import type { Any, Custom } from '@brainless/typescript'
import type { ReactNode, SetStateAction } from 'react'

type FastContextProviderProps<Store extends Any.AnyObject> = {
  store: Store
  children: ReactNode
}

type CreateFastContext<Store extends Any.AnyObject> = {
  store: Store
  setStore: (setStateAction: SetStateAction<Store>) => void
  subscribe: (onStoreChange: Any.UnknownFunction) => Any.Noop
}
type Selector<Store extends Any.AnyObject, Selected> = (
  store: Store,
) => Selected

const eventHub = createEventHub()

export const createFastContext = <Store extends Any.AnyObject>(
  name: string,
) => {
  const [FastContextProviderImpl, useFastContextImpl] =
    createSafeContext<CreateFastContext<Store>>(name)

  const FastContextProvider = ({
    children,
    store: initialStore,
  }: FastContextProviderProps<Store>) => {
    const [store, setStoreImpl] = useState(initialStore)

    const subscribe = useCallback((onStoreChange: Any.UnknownFunction) => {
      const subscriber = eventHub.on(name, onStoreChange)

      return () => {
        subscriber.off()
      }
    }, [])

    const setStore = useCallback((setStateAction: SetStateAction<Store>) => {
      setStoreImpl(setStateAction)

      eventHub.emit(name)
    }, [])

    const value = useMemo(
      () => ({ store, setStore, subscribe }),
      [store, setStore, subscribe],
    )

    return (
      <FastContextProviderImpl value={value}>
        {children}
      </FastContextProviderImpl>
    )
  }

  const useFastContext = <
    Selected,
    SafeSelected = Custom.Equals<Selected, unknown> extends 1
      ? Store
      : Selected,
  >(
    selector?: Selector<Store, Selected>,
  ) => {
    const { store, setStore, subscribe } = useFastContextImpl()

    const selectedStore = useSyncExternalStore(
      subscribe,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safe assertion (fix later, if can)
      () => (selector ? selector(store) : store) as SafeSelected,
    )

    return [selectedStore, setStore] as const
  }

  return [FastContextProvider, useFastContext] as const
}
