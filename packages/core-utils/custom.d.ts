type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false
type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
type IsAny<Type> = 0 extends 1 & Type ? true : false
type NotAny<Type> = true extends IsAny<Type> ? false : true

type Debug<AnyObject> = { [Key in keyof AnyObject]: AnyObject[Key] }

type Narrow<Type> =
  | (Type extends infer TValue ? TValue : never)
  | Extract<
      Type,
      number | string | boolean | bigint | symbol | null | undefined | []
    >
  | ([Type] extends [[]] ? [] : { [Key in keyof Type]: Narrow<Type[Key]> })

type FalsyValues = 0 | '' | null | undefined | false

type LowercaseFirst<Word extends string> =
  Word extends `${infer Letter}${infer Letters}`
    ? `${Lowercase<Letter>}${Letters}`
    : Word

type UppercaseFirst<Word extends string> =
  Word extends `${infer Letter}${infer Letters}`
    ? `${Uppercase<Letter>}${Letters}`
    : Word
