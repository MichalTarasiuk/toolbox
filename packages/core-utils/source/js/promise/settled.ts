/**
 * A result type for a `Promise` that resolved.
 *
 * @public
 * @category Promise
 */
export type ResolvedResult<Resolved> = [resolved: Resolved, error: undefined]
/**
 * A result type for a `Promise` that rejected.
 *
 * @public
 * @category Promise
 */
export type RejectedResult<AnyError extends Error> = [
  value: undefined,
  error: AnyError,
]
/**
 * A result type to represent a resolved or rejected `Promise`.
 * @public
 * @category Promise
 */
export type Result<Resolved, AnyError extends Error> =
  | ResolvedResult<Resolved>
  | RejectedResult<AnyError>
/**
 * Settle a promise by returning a tuple of the resolved value or rejected error.
 * This function never rejects.
 *
 * Time complexity: _O(1)_
 *
 * Space complexity: _O(1)_
 *
 * @example
 * ```js
 * const [value, error] = await settled(promise);
 * ```
 *
 * @param promise - The promise to settle
 *
 * @returns A tuple of the resolved value or rejected error
 *
 * @public
 * @category Promise
 */
export const settled = async <Resolved, AnyError extends Error>(
  promise: PromiseLike<Resolved>,
): Promise<Result<Resolved, AnyError>> => {
  try {
    return [await promise, undefined]
  } catch (error: unknown) {
    return [undefined, error as AnyError]
  }
}
