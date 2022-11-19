const dehydratedState = ['data', 'status', 'error'] as const

export const dehydratedQueryState = [
  'dataUpdateCount',
  'dataUpdatedAt',
  'errorUpdateCount',
  'errorUpdatedAt',
  'fetchFailureCount',
  'fetchFailureReasons',
  'fetchMeta',
  'isInvalidated',
  'fetchStatus',
  ...dehydratedState,
] as const

export const dehydratedMutateState = [
  'context',
  'failureCount',
  'failureReason',
  'isPaused',
  'variables',
  ...dehydratedState,
] as const

export const queryStatus = ['loading', 'error', 'success']
export const mutationStatus = ['idle', 'loading', 'success', 'error']

export const fetchStatus = ['fetching', 'paused', 'idle']
