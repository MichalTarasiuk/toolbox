/**
 * Get the lowest value of the 2 parameters.
 * Meant to be used with `Array.prototype.reduce`.
 *
 * @example
 * ```js
 * const array = [1, 2, 3];
 *
 * array.reduce(min); // 1
 * ```
 *
 * @param previousValue - Current lowest value seen
 * @param currentValue - The next value to compare
 *
 * @returns `previousValue` or `currentValue`, whichever is lower
 */
export const min = <
	Collector extends Comparable,
	CurrentValue extends Comparable,
>(
	collector: Collector,
	currentValue: CurrentValue,
): Collector | CurrentValue => {
	// @typescript-eslint/consistent-type-assertions -- safety assertion
	return (currentValue as unknown as Collector) < collector
		? currentValue
		: collector
}
