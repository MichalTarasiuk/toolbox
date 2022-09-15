/**
 * Round a number to n digits of precision after the decimal point.
 *
 * Time complexity: _O(1)_
 *
 * Space complexity: _O(1)_
 *
 * @example
 * ```js
 * const value = 12.345;
 *
 * toDigits(value, 2); // 12.35
 * ```
 *
 * @param value - Value to format
 * @param precision - Number of digits of precision after the decimal point
 *
 * @returns Number rounded to the specified number of digits
 *
 * @public
 */
export const toDigits = (value: number, precision: number) => {
  const factor = 10 ** precision

  return Math.round(value * factor * (1 + Number.EPSILON)) / factor
}
