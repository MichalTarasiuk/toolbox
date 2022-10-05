/**
 * Returns a function that takes one argument and runs a callback if it's truthy or returns it if falsy.
 *
 * @returns Function expecting a single value, x, that returns the appropriate value based on pred
 */
export const when =
  (
    predicate: (value: unknown) => boolean,
    whenTrue: (value: unknown) => boolean,
  ) =>
  (value: unknown) =>
    predicate(value) ? whenTrue(value) : value
