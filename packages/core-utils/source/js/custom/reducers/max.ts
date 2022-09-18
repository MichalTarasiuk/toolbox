/**
 * Get the largest value of the 2 parameters.
 * Meant to be used with `Array.prototype.reduce`.
 *
 * @example
 * ```js
 * const array = [1, 2, 3];
 *
 * array.reduce(max); // 3
 * ```
 *
 * @param previousValue - Current largest value seen
 * @param currentValue - The next value to compare
 *
 * @returns `previousValue` or `currentValue`, whichever is larger
 */
export const max = <
  Accumulator extends Comparable,
  CurrentValue extends Comparable,
>(
  accumulator: Accumulator,
  currentValue: CurrentValue,
): Accumulator | CurrentValue => {
  return (currentValue as unknown as Accumulator)! > accumulator!
    ? currentValue
    : accumulator
}
