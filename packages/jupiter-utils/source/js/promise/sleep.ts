/**
 * @param timeout - The timeout in milliseconds
 * @param resolved - Resolved promise data
 *
 * @returns Reference to timer and promise
 */
export const sleep = <Resolved>(timeout: number, resolved: Resolved) => {
  let timer: NodeJS.Timeout | undefined
  let resolveImpl:
    | ((value: Resolved | PromiseLike<Resolved>) => void)
    | undefined

  const promise: Promise<Resolved> = new Promise((resolve) => {
    timer = setTimeout(resolve, timeout, resolved)
  })

  const resolve = () => {
    if (resolveImpl) {
      resolveImpl(resolved)

      resolveImpl = undefined
    }
  }

  return [promise, timer, resolve] as const
}
