import { isClient, isFunction, isString } from '@jupiter/utils'

import type { LazyInitialization, AtomInitialize } from '../../types'

const isSafeLazyInitialization = <State extends string>(
  lazyInitialization: unknown,
): lazyInitialization is LazyInitialization<State> =>
  isFunction(lazyInitialization)

export const createAtomWithStorage = (atomInitialize: AtomInitialize) => {
  return <State extends string>(key: string, state: State) => {
    const atom = atomInitialize(
      () => {
        if (isClient()) {
          localStorage.setItem(key, state)

          return localStorage.getItem(key) ?? state
        }

        return state
      },
      (_get, set, nextInitialization) => {
        if (!nextInitialization) {
          return
        }

        const lazyInitialization = isString(nextInitialization)
          ? () => nextInitialization
          : nextInitialization

        if (isSafeLazyInitialization<State>(lazyInitialization)) {
          lazyInitialization.get = (state: State) => {
            localStorage.setItem(key, state)
          }
        }

        set(lazyInitialization)
      },
    )

    return atom
  }
}
