/* eslint-disable @typescript-eslint/consistent-type-assertions -- resolveState: typescript can't infer return type */
import { createEventHub, isFunction } from '@jupiter/utils'
import equal from 'deep-equal'
import { useCallback, useSyncExternalStore } from 'react'
import { v4 } from 'uuid'

import type { Any } from '@jupiter/typescript'

type Get = <State>(atom: Atom<State>) => State
type CustomSet<State> = (
  get: (atom: Atom<State>) => State,
  set: (nextInitialization: Initialization<State>) => void,
  nextInitialization?: Initialization<State>,
) => void

export type LazyInitialization<State> = ((get: Get) => State) & {
  get?: (state: State) => void
}
type Initialization<State> = State | LazyInitialization<State>

type ResolvableState<State> = State | ((state: State) => State)

type Atom<State = unknown> = {
  read: (token: symbol) => {
    id: string
    readonly state: State
    readonly coworkers: string[]
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
      const state = initialization(get)

      initialization.get?.(state)

      return state
    }

    return initialization
  }

  const resolveState = <State>(
    resolvableState: ResolvableState<State>,
    state: State,
  ) => {
    if (isFunction(resolvableState)) {
      return resolvableState(state) as State
    }

    return resolvableState as State
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

      const setImpl = (nextInitialization?: Initialization<State>) => {
        if (!nextInitialization) {
          return
        }

        initialization = nextInitialization

        eventHub.emit(id)
      }

      const set = (nextInitialization?: Initialization<State>) => {
        customSet
          ? customSet(get, setImpl, nextInitialization)
          : setImpl(nextInitialization)
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
      (resolvableState?: ResolvableState<State | undefined>) => {
        const { state, set } = atom.read(secretToken)

        set(resolveState(resolvableState, state))
      },
      [],
    )

    return [state, setState] as const
  }

  return { useAtom, atom }
}
