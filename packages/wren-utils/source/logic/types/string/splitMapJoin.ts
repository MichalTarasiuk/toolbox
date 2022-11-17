/**
 * Map split string by separator.
 *
 * @example
 * ```js
 * splitMapJoin('hello, world', ' ', (substring) => substring.toUpperCase()) // 'HELLO WORLD'
 * ```
 *
 * @param str - Text to map
 * @param separator - A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned
 * @param fn - A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
 *
 * @returnsMapped string
 */
export const splitMapJoin = (
  str: string,
  separator: string,
  fn: (substring: string) => string,
) => {
  return str.split(separator).map(fn).join(separator)
}
