import {
  every,
  isArray,
  isObject,
  keysIn,
  isString,
  isNumber,
  isBoolean,
} from '@wren/utils'

import {
  dehydratedQueryState,
  dehydratedMutateState,
  fetchStatus,
  queryStatus,
  mutationStatus,
} from './consts'

import type { DehydratedState } from '@tanstack/react-query'

type DehydratedQuery = DehydratedState['queries'][number]

const isDehydratedQueryState = (value: unknown) =>
  isObject(value) &&
  keysIn(value, dehydratedQueryState) &&
  every(value, {
    dataUpdateCount: isNumber,
    dataUpdatedAt: isNumber,
    errorUpdateCount: isNumber,
    errorUpdatedAt: isNumber,
    fetchFailureCount: isNumber,
    isInvalidated: isBoolean,
    status: (value) => isString(value) && queryStatus.includes(value),
    fetchStatus: (value) => isString(value) && fetchStatus.includes(value),
  })

const isDehydratedQuery = (
  maybeDehydratedQuery: unknown,
): maybeDehydratedQuery is DehydratedQuery => {
  const hasKeys =
    isObject(maybeDehydratedQuery) &&
    keysIn(maybeDehydratedQuery, ['state', 'queryKey', 'queryHash'])

  if (hasKeys) {
    return every(maybeDehydratedQuery, {
      state: isDehydratedQueryState,
      queryHash: isString,
      queryKey: isArray,
    })
  }

  return hasKeys
}

type DehydratedMutate = DehydratedState['mutations'][number]

const isDehydratedMutateState = (value: unknown) =>
  isObject(value) &&
  keysIn(value, dehydratedMutateState) &&
  every(value, {
    failureCount: isNumber,
    isPaused: isBoolean,
    status: (value) => isString(value) && mutationStatus.includes(value),
  })

const isDehydratedMutate = (
  maybeDehydratedMutate: unknown,
): maybeDehydratedMutate is DehydratedMutate => {
  const hasKeys =
    isObject(maybeDehydratedMutate) &&
    keysIn(maybeDehydratedMutate, ['state', '?mutationKey'])

  if (hasKeys) {
    return every(maybeDehydratedMutate, {
      state: isDehydratedMutateState,
      mutationKey: isArray,
    })
  }

  return hasKeys
}

export const isDehydratedState = (
  maybeDehydratedState: unknown,
): maybeDehydratedState is DehydratedState => {
  if (
    isObject(maybeDehydratedState) &&
    keysIn(maybeDehydratedState, ['mutations', 'queries'])
  ) {
    return every(maybeDehydratedState, {
      mutations: (value) => isArray(value) && value.every(isDehydratedMutate),
      queries: (value) => isArray(value) && value.every(isDehydratedQuery),
    })
  }

  return false
}
