type UppercaseFirst<Word extends string> = Word extends `${infer Letter}${infer Letters}`
  ? `${Uppercase<Letter>}${Letters}`
  : Word;

/**
 * Converts first alphabetic character in a string to uppercase.
 *
 * @param word alphabetic characters to convert
 *
 * @returns converted alphabetic characters
 */
export const uppercaseFirst = <Word extends string>(word: Word) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
  (word.at(0)?.toUpperCase() + word.slice(1)) as UppercaseFirst<Word>;

type LowercaseFirst<Word extends string> = Word extends `${infer Letter}${infer Letters}`
  ? `${Lowercase<Letter>}${Letters}`
  : Word;

/**
 * Converts first alphabetic character in a string to lowercase.
 *
 * @param word alphabetic characters to convert
 *
 * @returns converted alphabetic characters
 */
export const lowercaseFirst = <Word extends string>(word: Word) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
  (word.at(0)?.toLowerCase() + word.slice(1)) as LowercaseFirst<Word>;
