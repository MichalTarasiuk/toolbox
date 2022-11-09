import { isFunction } from '@wren/utils'
import equal from 'deep-equal'

import type { ResolvableState } from '../types'

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

export const isResolveableState = <State>(
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
