/**
 * A result type for a `Promise` that resolved.
 */
export type ResolvedResult<Resolved> = readonly [
  resolved: Resolved,
  error: undefined,
]
/**
 * A result type for a `Promise` that rejected.
 */
export type RejectedResult<AnyError extends Error> = readonly [
  value: undefined,
  error: AnyError,
]
/**
 * A result type to represent a resolved or rejected `Promise`.
 */
export type Result<Resolved, AnyError extends Error> =
  | ResolvedResult<Resolved>
  | RejectedResult<AnyError>
/**
 * Settle a promise by returning a tuple of the resolved value or rejected error.
 * This function never rejects.
 *
 * @example
 * ```js
 * const [value, error] = await settled(promise);
 * ```
 *
 * @param promise - The promise to settle
 *
 * @returns A tuple of the resolved value or rejected error
 */
export const settled = async <Resolved, AnyError extends Error>(
  promise: PromiseLike<Resolved>,
): Promise<Result<Resolved, AnyError>> => {
  try {
    return [await promise, undefined]
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safty assertion
    return [undefined, error as AnyError]
  }
}
