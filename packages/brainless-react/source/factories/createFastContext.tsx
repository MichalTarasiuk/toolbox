import { createEventHub } from '@brainless/utils'
import React, {
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react'

import { createSafeContext } from './createSafeContext'

import type { Any } from '@brainless/typescript'
import type { ReactNode } from 'react'

type FastContextProviderProps<Store extends Any.AnyObject> = {
  store: Store
  children: ReactNode
}

type CreateFastContext<Store extends Any.AnyObject> = {
  store: Store
  setStore: (nextStore: Store) => void
  subscribe: (onStoreChange: Any.UnknownFunction) => Any.Noop
}
type Selector<Store extends Any.AnyObject> = (store: Store) => unknown

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

    const setStore = useCallback((store: Store) => {
      setStoreImpl(store)

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

  const useFastContext = (selector?: Selector<Store>) => {
    const { store, setStore, subscribe } = useFastContextImpl()

    const selectedStore = useSyncExternalStore(subscribe, () =>
      selector ? selector(store) : store,
    )

    return [selectedStore, setStore] as const
  }

  return [FastContextProvider, useFastContext] as const
}
