import { isFunction } from '@jupiter/utils'
import equal from 'deep-equal'

import type {
  Get,
  Initialization,
  LazyInitialization,
  ResolvableState,
} from '../types'
import type { Any } from '@jupiter/typescript'

export * from './extensions/extensions'

type FormatExtensionKey<ExtensionKey> =
  ExtensionKey extends `create${infer First}${infer Rest}`
    ? `${Lowercase<First>}${Rest}`
    : never

export const formatExtensionKey = <ExtensionKey extends `create${string}`>(
  extensionKey: ExtensionKey,
) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- narrow
  extensionKey.replace(
    /create(\w)(\w+)/g,
    (_: unknown, a: string, b: string) => a.toLowerCase() + b,
  ) as FormatExtensionKey<ExtensionKey>

export const canUpdateState = <State>(state: State, nextState: State) =>
  equal(state, nextState)

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
