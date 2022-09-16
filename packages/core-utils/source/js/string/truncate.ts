/**
 * Truncate text to a certain length, optionally appending a suffix when truncated.
 *
 * Time complexity: _O(n)_
 *
 * Space complexity: _O(n)_
 *
 * @example
 * ```js
 * truncate('hello, world', 5, '...'); // 'hello...'
 * ```
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length before text is truncated
 * @param suffix - Suffix to append if text was truncated
 *
 * @returns Truncated text
 *
 * @public
 * @category String
 */
export const truncate = <Text extends string>(
  text: Text,
  maxLength: number,
  suffix = '',
): Text | `${string}${typeof suffix}` => {
  const canTruncate = text.length > maxLength

  if (canTruncate) {
    return text.slice(0, maxLength) + suffix
  }

  return text
}
