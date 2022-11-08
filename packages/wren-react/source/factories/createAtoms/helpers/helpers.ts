import { isFunction } from '@wren/utils'
import equal from 'deep-equal'
import { v4 } from 'uuid'

import type {
  Get,
  Initialization,
  LazyInitialization,
  ResolvableState,
} from '../types'
import type { Any } from '@wren/typescript'

export { collectExtensions } from './collectExtensions'

export const createState = <State>() => {
  const initialState = Symbol()
  let state: State | typeof initialState = initialState

  const canUpdate = <State>(state: State, nextState: State) =>
    !equal(state, nextState)

  const update = (nextState: State) => {
    if (state === initialState || canUpdate(state, nextState)) {
      state = nextState
    }

    return state
  }

  return {
    update,
  }
}

const isResolveableState = <State>(
  resolvableState: ResolvableState<State>,
): resolvableState is (state: State) => State => isFunction(resolvableState)

export const resolveState = <State>(
  resolvableState: ResolvableState<State>,
  state: State,
) => {
  if (isResolveableState(resolvableState)) {
    return resolvableState(state)
  }

  return resolvableState
}

export const createWorker = () => {
  const id = v4()
  const coworkers = new Set<string>()

  const addCoworker = (coworkerId: string) => {
    coworkers.add(coworkerId)
  }

  const stop = () => coworkers.clear()

  const read = () => ({ id, coworkers: [...coworkers.values()] })

  return {
    read,
    addCoworker,
    stop,
    id,
  }
}

const canResolvInitialization = <State>(
  initialization: Initialization<State>,
): initialization is LazyInitialization<State> => isFunction(initialization)

export const initialize = <State>(
  initialization: Initialization<State>,
  get: Get,
  lifecycle: { before: Any.Noop },
) => {
  lifecycle.before()

  if (canResolvInitialization(initialization)) {
    const state = initialization(get)

    initialization.get?.(state)

    return state
  }

  return initialization
}
