import { isArray } from '../javascript'

type CastArray<Value> = Value extends Array<unknown> ? Value : [Value]

/**
 * Casts the provided value as an array if it's not one.
 */
export const castArray = <Value>(value: Value) =>
  (isArray(value) ? value : [value]) as CastArray<Value>
