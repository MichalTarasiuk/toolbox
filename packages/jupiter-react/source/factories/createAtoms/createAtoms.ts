import { createEventHub, isFunction } from '@jupiter/utils'
import equal from 'deep-equal'
import { useCallback, useSyncExternalStore } from 'react'
import { v4 } from 'uuid'

import type { Any } from '../../../../jupiter-typescript/_api'

type Get = <State>(atom: Atom<State>) => State
type CustomSet<State> = (
  get: (atom: Atom<State>) => State,
  set: (nextInitialization: Initialization<State>) => void,
) => void

type LazyInitialization<State> = (get: Get) => State
type Initialization<State> = State | LazyInitialization<State>

type Atom<State = unknown> = {
  read: (token: symbol) => {
    readonly state: State
    readonly coworkers: string[]
    id: string
    set: (nextInitialization?: Initialization<State>) => void
  }
}

export const createAtoms = () => {
  const eventHub = createEventHub()
  const secretToken = Symbol()

  const canUpdateState = <State>(state: State, nextState: State) =>
    equal(state, nextState)

  const canResolve = <State>(
    initialization: Initialization<State>,
  ): initialization is LazyInitialization<State> => isFunction(initialization)

  const initialize = <State>(
    initialization: Initialization<State>,
    get: Get,
    lifecycle: { before: Any.Noop },
  ) => {
    lifecycle.before()

    if (canResolve(initialization)) {
      return initialization(get)
    }

    return initialization
  }

  const atom = <State>(
    initialInitialization: Initialization<State>,
    customSet?: CustomSet<State>,
  ) => {
    const id = v4()
    const coworkers = new Set<string>()

    let initialization = initialInitialization
    let state: State | null = null

    const read = (token: symbol) => {
      if (token !== secretToken) {
        throw Error('You do not have permission to read this atom')
      }

      const get = <AtomState>(atom: Atom<AtomState>) => {
        const { id, state } = atom.read(secretToken)

        coworkers.add(id)

        return state
      }

      const setImpl = (nextInitialization: Initialization<State>) => {
        initialization = nextInitialization

        eventHub.emit(id)
      }

      const set = (nextInitialization?: Initialization<State>) => {
        if (customSet) {
          customSet(get, setImpl)

          return
        }

        if (nextInitialization) {
          setImpl(nextInitialization)
        }
      }

      return {
        get state() {
          const nextState = initialize(initialization, get, {
            before: () => coworkers.clear(),
          })

          if (state === null || !canUpdateState(state, nextState)) {
            state = nextState
          }

          return state
        },
        get coworkers() {
          return [...coworkers.values()]
        },
        id,
        set,
      }
    }

    return {
      read,
    }
  }

  const useAtom = <State>(atom: Atom<State>) => {
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

    const setState = useCallback(
      (nextInitialization?: Initialization<State>) => {
        const { set } = atom.read(secretToken)

        set(nextInitialization)
      },
      [],
    )

    return [state, setState] as const
  }

  return { useAtom, atom }
}
