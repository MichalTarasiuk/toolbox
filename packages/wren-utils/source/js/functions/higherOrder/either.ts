/**
 * Checks if at least one function returns true for a given set of arguments.
 */
export const either =
  (
    callback: (...args: readonly unknown[]) => unknown,
    fallback: (...args: readonly unknown[]) => unknown,
  ) =>
  (...args: readonly unknown[]) =>
    callback(...args) || fallback(...args)
