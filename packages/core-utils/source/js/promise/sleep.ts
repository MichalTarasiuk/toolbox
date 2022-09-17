/**
 * @param timeout - The timeout in milliseconds
 * @param resolved - Resolved promise data
 * @returns Reference to timer and promise
 */
export const sleep = <Resolved>(timeout: number, resolved: Resolved) => {
  let timer: number | null = null

  const promise: Promise<Resolved> = new Promise((resolve) => {
    timer = setTimeout(resolve, timeout, resolved)
  })

  return [timer, promise] as const
}
