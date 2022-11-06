import { isFunction, objectKeys } from '@jupiter/utils'
import equal from 'deep-equal'

import type {
  AtomInitialize,
  Get,
  Initialization,
  LazyInitialization,
  ResolvableState,
} from '../types'
import type { Any } from '@jupiter/typescript'

type FormatExtensionKey<ExtensionKey> =
  ExtensionKey extends `create${infer First}${infer Rest}`
    ? `${Lowercase<First>}${Rest}`
    : never

type CollectExtensions = {
  -readonly [ExtenstionKey in keyof Extenstions as FormatExtensionKey<ExtenstionKey>]: ReturnType<
    Extenstions[ExtenstionKey]
  >
}

type Extenstions = typeof import('./extensions/extensions')

const formatExtensionKey = <ExtensionKey extends `create${string}`>(
  extensionKey: ExtensionKey,
) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- narrow
  extensionKey.replace(
    /create(\w)(\w+)/g,
    (_: unknown, a: string, b: string) => a.toLowerCase() + b,
  ) as FormatExtensionKey<ExtensionKey>

export const collectExtensions = (
  extenstions: Extenstions,
  atom: AtomInitialize,
) =>
  objectKeys(extenstions).reduce((collector, extenstionKey) => {
    collector[formatExtensionKey(extenstionKey)] =
      extenstions[extenstionKey](atom)

    return collector
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- define type of collector
  }, {} as CollectExtensions)

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
