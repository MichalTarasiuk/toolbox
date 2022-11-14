export * from './nullish'
export * from './typeof/typeof'

import type { Any } from '@wren/typescript'

/**
 * Checks if the passed value is primitive or not.
 */
export const isPrimitive = (value: unknown): value is Any.Primitive =>
  Object(value) !== value
