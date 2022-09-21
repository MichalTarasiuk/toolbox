// @TODO: add description
export const either =
  (
    callback: (...args: unknown[]) => unknown,
    fallback: (...args: unknown[]) => unknown,
  ) =>
  (...args: unknown[]) =>
    callback(...args) || fallback(...args)
