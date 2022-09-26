/**
 * Combines several regular expressions into a new one that matches any of them.
 *
 * @example
 * ```js
 * regExpUnion(/[a-z]/, /\d/); // /([a-z])|(\d)/
 * ```
 *
 * @param regExps - Regular expressions to get the union of
 *
 * @returns A new regular expression
 */
export const regExpUnion = (...regExps: readonly RegExp[]) => {
  return new RegExp(regExps.map((regExp) => `(${regExp.source})`).join('|'))
}
