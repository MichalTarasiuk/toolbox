// FIXME

import type { Any } from '@jupiter/typescript'

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
  Collector extends Any.Comparable,
  CurrentValue extends Any.Comparable,
>(
  collector: Collector,
  currentValue: CurrentValue,
): Collector | CurrentValue => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
  return (currentValue as unknown as Collector) > collector
    ? currentValue
    : collector
}
