type UppercaseFirst<Word extends string> =
  Word extends `${infer Letter}${infer Letters}`
    ? `${Uppercase<Letter>}${Letters}`
    : Word
;``

export const uppercaseFirst = <Word extends string>(word: Word) =>
  (word.at(0)?.toUpperCase() + word.slice(1)) as UppercaseFirst<Word>

type LowercaseFirst<Word extends string> =
  Word extends `${infer Letter}${infer Letters}`
    ? `${Lowercase<Letter>}${Letters}`
    : Word

export const lowercaseFirst = <Word extends string>(word: Word) =>
  (word.at(0)?.toLowerCase() + word.slice(1)) as LowercaseFirst<Word>
