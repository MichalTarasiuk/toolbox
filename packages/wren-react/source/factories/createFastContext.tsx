import { createEventHub, isObject } from '@wren/utils'
import React, {
  useCallback,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react'

import { createSafeContext } from './createSafeContext'

import type { Any, Custom } from '@wren/typescript'
import type { ReactNode } from 'react'

type FastContextProviderProps<Store extends Any.AnyObject> = {
  store: Store
  children: ReactNode
}

type CreateFastContext<Store extends Any.AnyObject> = {
  get: () => Store
  setStore: (
    nextStore: Partial<Store> | ((store: Store) => Partial<Store>),
  ) => void
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
    const store = useRef(initialStore)

    const get = useCallback(() => store.current, [])

    const subscribe = useCallback((onStoreChange: Any.UnknownFunction) => {
      const subscriber = eventHub.on(name, onStoreChange)

      return () => {
        subscriber.off()
      }
    }, [])

    const setStore = useCallback(
      (nextStore: Partial<Store> | ((store: Store) => Partial<Store>)) => {
        store.current = {
          ...store.current,
          ...(isObject(nextStore) ? nextStore : nextStore(store.current)),
        }

        eventHub.emit(name)
      },
      [],
    )

    const value = useMemo(
      () => ({ get, setStore, subscribe }),
      [get, setStore, subscribe],
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
    const { get, setStore, subscribe } = useFastContextImpl()

    const selectedStore = useSyncExternalStore(
      subscribe,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safe assertion (fix later, if can)
      () => (selector ? selector(get()) : get()) as SafeSelected,
    )

    return [selectedStore, setStore] as const
  }

  return [FastContextProvider, useFastContext] as const
}
