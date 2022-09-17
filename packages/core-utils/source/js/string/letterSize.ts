/**
 * Converts first alphabetic character in a string to uppercase.
 *
 * @param word alphabetic characters to convert
 *
 * @returns converted alphabetic characters
 */
export const uppercaseFirst = <Word extends string>(word: Word) =>
  (word.at(0)?.toUpperCase() + word.slice(1)) as UppercaseFirst<Word>

/**
 * Converts first alphabetic character in a string to lowercase.
 *
 * @param word alphabetic characters to convert
 *
 * @returns converted alphabetic characters
 */
export const lowercaseFirst = <Word extends string>(word: Word) =>
  (word.at(0)?.toLowerCase() + word.slice(1)) as LowercaseFirst<Word>
