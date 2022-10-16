import type { Any } from '@flame/typescript'

/**
 * Check if something is `null` or `undefined`.
 *
 * @example
 * ```js
 * const value = Math.random() > 0.5 ? 'hello' : null;
 *
 * nullish(value);
 * ```
 *
 * @param value - Value to check
 *
 * @returns `true` if `value` is nullish, `false` if otherwise
 */
export const nullish = (value: unknown): value is Any.Nullish =>
  value === null || value === undefined
