export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? true
  : false
export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IsAny<Type> = 0 extends 1 & Type ? true : false
export type NotAny<Type> = true extends IsAny<Type> ? false : true

export type Debug<AnyObject> = { [Key in keyof AnyObject]: AnyObject[Key] }

type Narrow<Type> =
  | (Type extends infer TValue ? TValue : never)
  | Extract<
      Type,
      number | string | boolean | bigint | symbol | null | undefined | []
    >
  | ([Type] extends [[]] ? [] : { [Key in keyof Type]: Narrow<Type[Key]> })

type FalsyValues = 0 | '' | null | undefined | false
