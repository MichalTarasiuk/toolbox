import type { Any } from '@jupiter/typescript'

export const debounce = <Fn extends Any.UnknownFunction>(
  fn: Fn,
  wait: number,
) => {
  let timeoutId: number | null = null

  return (...args: Parameters<Fn>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = window.setTimeout(() => {
      fn.call(null, ...args)
    }, wait)
  }
}
