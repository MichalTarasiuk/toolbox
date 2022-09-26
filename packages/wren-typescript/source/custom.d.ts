// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
type IsAny<Type> = 0 extends 1 & Type ? true : false
type NotAny<Type> = true extends IsAny<Type> ? false : true

type Debug<AnyObject> = { readonly [Key in keyof AnyObject]: AnyObject[Key] }

type FalsyValues = 0 | '' | null | undefined | false

type Sign = '-' | '+'

type NumberLike =
  | { [Symbol.toPrimitive](hint: 'number'): number }
  | number
  | bigint
  | Number
  | boolean
  | `${number | bigint}`
  | `${Sign | ''}${'Infinity'}`
  | null

type Comparable = string | NumberLike
