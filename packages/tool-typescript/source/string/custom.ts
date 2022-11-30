/**
 * DropChar type drop a specified char from a string.
 */
export type DropChar<Word extends string, Char extends string> = Word extends `${infer First}${infer Rest}`
  ? First extends Char
    ? DropChar<Rest, Char>
    : `${First}${DropChar<Rest, Char>}`
  : Word;

/**
 * ToNumber type convert string to number.
 */
export type ToNumber<Word extends string> = Word extends `${infer Number extends number}` ? Number : never;
