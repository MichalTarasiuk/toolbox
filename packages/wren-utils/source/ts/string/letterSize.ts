/**
 * Converts all the alphabetic characters in a string to lowercase.
 *
 * @param word - Alphabetic characters to convert
 *
 * @returns Converted alphabetic characters
 */
export const lowercase = <Word extends string>(word: Word) =>
	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
	word.toLowerCase() as Lowercase<Word>

/**
 * Converts all the alphabetic characters in a string to uppercase.
 *
 * @param word - Alphabetic characters to convert
 *
 * @returns Converted alphabetic characters
 */
export const uppercase = <Word extends string>(word: Word) =>
	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
	word.toUpperCase() as Uppercase<Word>
