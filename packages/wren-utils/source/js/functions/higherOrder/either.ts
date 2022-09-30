/**
 * Checks if at least one function returns true for a given set of arguments.
 */
export const either =
	(
		callback: (...args: unknown[]) => unknown,
		fallback: (...args: unknown[]) => unknown,
	) =>
	(...args: unknown[]) =>
		callback(...args) || fallback(...args)
