import type { Any } from '@bulb/typescript'

/**
 * Create a new function that calls the provided `fn` and negates the result.
 *
 * @example
 * ```js
 * const array = [0, null, '', undefined, false];
 *
 * array.filter(not(nullish)); // [0, '', false]
 * ```
 *
 * @param fn - Function to negate the return value of
 *
 * @returns The inverted return value of `fn`
 */
export const not = <Fn extends Any.AnyFunction<any[], boolean>>(fn: Fn) => {
  return (...parameters: Parameters<Fn>) => !fn(...parameters)
}
