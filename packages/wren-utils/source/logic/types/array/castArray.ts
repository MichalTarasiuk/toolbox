import { isArray } from '../../../source'

import type { Any } from '@wren/typescript'

type ToArray<Value> = Value extends Any.AnyArray ? Value : [Value]

/**
 * Casts the provided value as an array if it's not one.
 */
export const toArray = <Value>(value: Value) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
  (isArray(value) ? value : [value]) as ToArray<Value>
