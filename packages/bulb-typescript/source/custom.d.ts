// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IsAny<Type> = 0 extends 1 & Type ? true : false
export type NotAny<Type> = true extends IsAny<Type> ? false : true

export type Debug<AnyObject> = { [Key in keyof AnyObject]: AnyObject[Key] }

export type FalsyValues = 0 | '' | null | undefined | false

export type Sign = '-' | '+'

export type NumberLike =
  | { [Symbol.toPrimitive](hint: 'number'): number }
  | number
  | bigint
  | Number
  | boolean
  | `${number | bigint}`
  | `${Sign | ''}${'Infinity'}`
  | null

export type Comparable = string | NumberLike
