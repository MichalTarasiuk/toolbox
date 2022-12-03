// TODO: ["substring", "substr", "slice", "search", "replaceAll", "replace", "repeat", "padEnd", "padStart", "match", "matchAll", "lastIndexOf", "indexOf", "includes", "concat", "charAt", "at"]

type Space = ' ' | '\n' | '\t';

/**
 * StartsWith type determines whether a string begins with the characters of a specified string,
 * returning true or false as appropriate.
 */
export type StartsWith<Word extends string, SearchString extends string> = Word extends `${SearchString}${string}`
  ? true
  : false;

/**
 * EndsWith type determines whether a string ends with the characters of a specified string,
 * returning true or false as appropriate.
 */
export type EndsWith<Word extends string, SearchString extends string> = Word extends `${string}${SearchString}`
  ? true
  : false;

/**
 * ToUpperCase type returns string converted to upper case.
 */
export type ToUpperCase<Word extends string> = Uppercase<Word>;

/**
 * TheToLowerCase type returns string converted to lower case.
 */
export type ToLowerCase<Word extends string> = Lowercase<Word>;

/**
 * The Trim type removes whitespace from both ends of a string.
 */
export type Trim<Word extends string> = TrimStart<TrimEnd<Word>>;

/**
 * TrimStart type removes whitespace from the beginning of a string.
 */
export type TrimStart<Word extends string> = Word extends `${Space}${infer Rest extends string}`
  ? TrimStart<Rest>
  : Word;

/**
 * TrimStart type removes whitespace from the beginning of a string.
 */
export type TrimEnd<Word extends string> = Word extends `${infer Rest extends string}${Space}` ? TrimEnd<Rest> : Word;

/**
 * Split takes a pattern and divides a String into an ordered list of substrings by searching for the pattern,
 * puts these substrings into an array, and returns the array.
 */
export type Split<Word extends string, Spliter extends string> = Word extends `${infer First}${Spliter}${infer Rest}`
  ? [First, ...Split<Rest, Spliter>]
  : [Word];

/**
 * Length type returns length of word.
 */
export type Length<Word extends string> = Word['length'];
