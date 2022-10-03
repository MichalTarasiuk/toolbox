/**
 * @param timeout - The timeout in milliseconds
 * @param resolved - Resolved promise data
 *
 * @returns Reference to timer and promise
 */
export const sleep = <Resolved>(timeout: number, resolved: Resolved) => {
	let timer: NodeJS.Timeout | undefined

	const promise: Promise<Resolved> = new Promise((resolve) => {
		timer = setTimeout(resolve, timeout, resolved)
	})

	return [promise, timer] as const
}
