export * from './nullish'
export * from './typeof/typeof'

import type { Any } from '@wren/typescript'

/**
 * Checks if the passed value is primitive or not.
 */
export const isPrimitive = (value: unknown): value is Any.Primitive =>
  Object(value) !== value

/**
 * Checks if the passed value is truthy or not.
 */
export const isTruthy = <Value>(
  value: Value,
): value is Exclude<Value, Any.FalsyValues> => Boolean(value)
