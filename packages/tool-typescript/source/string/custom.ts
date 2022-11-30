/**
 * Drop a specified char from a string.
 */
export type DropChar<Word extends string, Char extends string> = Word extends `${infer First}${infer Rest}`
  ? First extends Char
    ? DropChar<Rest, Char>
    : `${First}${DropChar<Rest, Char>}`
  : Word;
