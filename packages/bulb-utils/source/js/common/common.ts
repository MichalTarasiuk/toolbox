export * from './nullish'
export * from './typeof/typeof'
export * from './coalesce'

/**
 * This method returns undefined.
 */
export const noop = () => {}

/**
 * Checks if the passed value is primitive or not.
 */
export const isPrimitive = (value: unknown): value is Primitive =>
  Object(value) !== value
