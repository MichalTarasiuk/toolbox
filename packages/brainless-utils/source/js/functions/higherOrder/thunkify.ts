// FIXME

import type { Any } from '@brainless/typescript'

/**
 * Create a new function that calls the provided `fn` with the given arguments.
 * After the first call the return value will be cached and returned again, meaning you technically only need to pass the arguments the first time.
 *
 * @example
 * ```js
 * function add(a, b) {
 *  return a + b;
 * }
 *
 * const thunk = thunkify(add);
 *
 * thunk(1, 2); // 3
 * thunk(3, 4); // 3
 * ```
 *
 * @param fn - The function to thunkify
 *
 * @returns A function that returns whatever the first call of `fn` returns for the given arguments
 */
export const thunkify = <Fn extends Any.AnyFunction>(fn: Fn) => {
  let wasCalled = false
  let result: ReturnType<Fn>

  return (...parameters: Parameters<Fn>) => {
    if (!wasCalled) {
      wasCalled = true

      result = fn(...parameters)
    }

    return result
  }
}
