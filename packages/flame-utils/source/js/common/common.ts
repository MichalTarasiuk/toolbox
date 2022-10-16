export * from './nullish'
export * from './typeof/typeof'
export * from './coalesce'

import type { Any } from '@flame/typescript'

/**
 * This method returns undefined.
 */
export const noop = () => {}

/**
 * Checks if the passed value is primitive or not.
 */
export const isPrimitive = (value: unknown): value is Any.Primitive =>
  Object(value) !== value
