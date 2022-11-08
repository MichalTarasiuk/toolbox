/* eslint-disable @typescript-eslint/consistent-type-assertions -- resolveState: typescript can't infer return type */
import { createEventHub, isUndefined } from '@wren/utils'
import { useCallback, useSyncExternalStore } from 'react'

import * as extenstions from './extensions/extensions'
import {
  collectExtensions,
  createState,
  createWorker,
  initialize,
  resolveState,
} from './helpers/helpers'

import type { Atom, CustomSet, Initialization, ResolvableState } from './types'

export const createAtoms = () => {
  const eventHub = createEventHub()
  const secretToken = Symbol()

  const atom = <State>(
    initialInitialization: Initialization<State>,
    customSet?: CustomSet<State>,
  ) => {
    const state = createState<State>()
    const worker = createWorker()

    let initialization = initialInitialization

    const read = (token: symbol) => {
      if (token !== secretToken) {
        throw Error('You do not have permission to read this atom')
      }

      const get = <AtomState>(atom: Atom<AtomState>) => {
        const { id, state } = atom.read(secretToken)

        worker.addCoworker(id)

        return state
      }

      const setImpl = (nextInitialization?: Initialization<State>) => {
        if (isUndefined(nextInitialization)) {
          return
        }

        initialization = nextInitialization

        eventHub.emit(worker.id)
      }

      const set = (nextInitialization?: Initialization<State>) => {
        customSet
          ? customSet(get, setImpl, nextInitialization)
          : setImpl(nextInitialization)
      }

      return {
        get state() {
          const nextState = initialize(initialization, get, {
            before: () => worker.stop(),
          })
          const updatedState = state.update(nextState)

          return updatedState
        },
        set,
        ...worker.read(),
      }
    }

    return {
      read,
    }
  }

  const useAtom = <State>(atom: Atom<State>) => {
    const atomValue = useAtomValue(atom)
    const uodateAtom = useUpdateAtom(atom)

    return [atomValue, uodateAtom] as const
  }

  const useAtomValue = <State>(atom: Atom<State>) => {
    const state = useSyncExternalStore<State>(
      (onStoreChange) => {
        const { id, coworkers } = atom.read(secretToken)

        const subscribers = [id, ...coworkers].map((name) =>
          eventHub.on(name, onStoreChange),
        )

        return () => {
          subscribers.forEach((subscriber) => {
            subscriber.off()
          })
        }
      },
      () => atom.read(secretToken).state,
    )

    return state
  }

  const useUpdateAtom = <State>(atom: Atom<State>) => {
    const setState = useCallback(
      (resolvableState?: ResolvableState<State | undefined>) => {
        const { state, set } = atom.read(secretToken)

        set(resolveState(resolvableState, state))
      },
      [],
    )

    return setState
  }

  return {
    atom,
    useAtom,
    useAtomValue,
    useUpdateAtom,
    ...collectExtensions(extenstions, atom),
  }
}
