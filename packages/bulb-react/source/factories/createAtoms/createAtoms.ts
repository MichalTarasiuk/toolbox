import { createEventHub } from '@bulb/utils'
import { useCallback, useSyncExternalStore } from 'react'
import { v4 } from 'uuid'

export const createAtoms = () => {
  type Atom = ReturnType<typeof atom>

  const eventHub = createEventHub()
  const secretToken = Symbol()

  const atom = (initialState: unknown) => {
    const id = v4()
    let state = initialState

    const read = (token: symbol) => {
      if (token !== secretToken) {
        throw Error('You do not have permission to read this atom')
      }

      const set = (nextState: unknown) => (state = nextState)

      return {
        id,
        set,
        state,
      }
    }

    return {
      read,
    }
  }

  const useAtom = (atom: Atom) => {
    const state = useSyncExternalStore(
      (onStoreChange) => {
        const subscriber = eventHub.on(atom.read(secretToken).id, onStoreChange)

        return () => subscriber.off()
      },
      () => atom.read(secretToken).state,
    )

    const setState = useCallback((nextState: unknown) => {
      const { id, set } = atom.read(secretToken)

      set(nextState)

      eventHub.emit(id)
    }, [])

    return [state, setState] as const
  }

  return { useAtom, atom }
}
