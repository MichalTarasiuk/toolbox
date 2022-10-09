import type { Any } from '@bulb/typescript'

/**
 * Defers invoking a function until the current call stack has cleared.
 */
export const defer = <Fn extends Any.AnyFunction>(
  fn: Fn,
  ...params: Parameters<Fn>
) => setTimeout(fn, 0, ...params)
