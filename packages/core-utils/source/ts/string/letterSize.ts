export const lowercase = <Word extends string>(word: Word) =>
  word.toLowerCase() as Lowercase<Word>

export const uppercase = <Word extends string>(word: Word) =>
  word.toUpperCase() as Uppercase<Word>
