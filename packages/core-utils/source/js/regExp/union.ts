/**
 * Combines several regular expressions into a new one that matches any of them.
 *
 * Time complexity: _O(n)_
 *
 * Space complexity: _O(1)_
 *
 * @example
 * ```js
 * regExpUnion(/[a-z]/, /\d/); // /([a-z])|(\d)/
 * ```
 *
 * @param regExps - Regular expressions to get the union of
 *
 * @returns A new regular expression
 *
 * @public
 * @category Regular expressions
 */
export const regExpUnion = (...regExps: RegExp[]) => {
  return new RegExp(regExps.map((regExp) => `(${regExp.source})`).join('|'))
}
