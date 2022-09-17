/**
 * Create a new function that calls the provided `fn` and negates the result.
 *
 * Time complexity: _O(1)_
 *
 * Space complexity: _O(1)_
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
export const not = <Fn extends (...parameters: any[]) => boolean>(fn: Fn) => {
  return ((...parameters) => !fn(...parameters)) as Fn
}
