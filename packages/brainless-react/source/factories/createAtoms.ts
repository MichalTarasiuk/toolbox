import { createEventHub, isFunction } from '@brainless/utils'
import { useCallback, useSyncExternalStore } from 'react'
import { v4 } from 'uuid'

type LazyInitialization<State> = (
  get: <SubState>(atom: Atom<SubState>) => SubState,
) => State
type Initialization<State> = State | LazyInitialization<State>

type Atom<State> = {
  read: (token: symbol) => {
    readonly state: State
    readonly coworkers: string[]
    id: string
    set: (nextInitialization: Initialization<State>) => void
  }
}

export const createAtoms = () => {
  const eventHub = createEventHub()
  const secretToken = Symbol()

  const canResolve = <State>(
    initialization: Initialization<State>,
  ): initialization is LazyInitialization<State> => isFunction(initialization)

  const initialize = <State>(
    initialization: Initialization<State>,
    coworkers: Set<string>,
  ) => {
    coworkers.clear()

    if (canResolve(initialization)) {
      initialization
      return initialization((atom) => {
        const { id, state } = atom.read(secretToken)

        coworkers.add(id)

        return state
      })
    }

    return initialization
  }

  const atom = <State>(initialInitialization: Initialization<State>) => {
    const id = v4()
    const coworkers = new Set<string>()

    let initialization = initialInitialization

    const read = (token: symbol) => {
      if (token !== secretToken) {
        throw Error('You do not have permission to read this atom')
      }

      const set = (nextInitialization: Initialization<State>) => {
        initialization = nextInitialization
      }

      return {
        get state() {
          const innerState = initialize(initialization, coworkers)

          return innerState
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
      (nextInitialization: Initialization<State>) => {
        const { id, set } = atom.read(secretToken)

        set(nextInitialization)

        eventHub.emit(id)
      },
      [],
    )

    return [state, setState] as const
  }

  return { useAtom, atom }
}
