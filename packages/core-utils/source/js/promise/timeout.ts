import { sleep } from './sleep'

const RESOLVED_TIMEOUT_PROMISE = Symbol('RESOLVED_TIMEOUT_PROMISE')
const ERROR_TIMEOUT_MESSAGE = 'timed out'

/**
 * Reject if the given promise does not resolve within the given timeout.
 *
 * Time complexity: _O(1)_
 *
 * Space complexity: _O(1)_
 *
 * @param promise - The promise to wait for
 * @param timeoutMs - The timeout in milliseconds
 *
 * @returns The resolved value of the promise
 */
export const timeout = async <Resolved>(
  promise: Promise<Resolved>,
  timeoutMs: number,
) => {
  const [timer, timeoutPromise] = sleep(timeoutMs, RESOLVED_TIMEOUT_PROMISE)

  const resolved = await Promise.race([promise, timeoutPromise]).finally(() => {
    if (timer) {
      clearTimeout(timer)
    }
  })

  if (resolved === RESOLVED_TIMEOUT_PROMISE) {
    throw new Error(ERROR_TIMEOUT_MESSAGE)
  }

  return resolved
}
