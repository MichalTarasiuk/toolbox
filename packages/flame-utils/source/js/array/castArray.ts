import { isArray } from '../javascript'

import type { Any } from '@flame/typescript'

type CastArray<Value> = Value extends Any.AnyArray ? Value : [Value]

/**
 * Casts the provided value as an array if it's not one.
 */
export const castArray = <Value>(value: Value) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
  (isArray(value) ? value : [value]) as CastArray<Value>
