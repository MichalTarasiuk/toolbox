/**
 * Calculate the sum of 2 `number`s.
 * Meant to be used with `Array.prototype.reduce`.
 *
 * Time complexity: _O(1)_
 *
 * Space complexity: _O(1)_
 *
 * @example
 * ```js
 * const array = [1, 2, 3];
 *
 * array.reduce(sum); // 6
 * ```
 *
 * @param a - First summand
 * @param b - Second summand
 *
 * @returns The sum of `a` and `b`
 */
export function sum(a: number, b: number): number
/**
 * Calculate the sum of 2 `bigint`s.
 * Meant to be used with `Array.prototype.reduce`.
 *
 * Time complexity: _O(1)_
 *
 * Space complexity: _O(1)_
 *
 * @example
 * ```js
 * const array = [1n, 2n, 3n];
 *
 * array.reduce(sum); // 6n
 * ```
 *
 * @param a - First summand
 * @param b - Second summand
 *
 * @returns The sum of `a` and `b`
 */
export function sum(a: bigint, b: bigint): bigint
export function sum<AnyNumber extends number>(a: AnyNumber, b: AnyNumber) {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
  return (a + b) as AnyNumber
}
