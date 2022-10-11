import type { Any, Array } from './source'

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IsAny<Type> = 0 extends 1 & Type ? true : false
export type NotAny<Type> = true extends IsAny<Type> ? false : true

export type Debug<AnyObject> = { [Key in keyof AnyObject]: AnyObject[Key] }

export type Overwrite<A extends Any.AnyObject, B extends Any.AnyObject> = {
  [key in keyof (A & B)]: key extends keyof B
    ? B[key]
    : key extends keyof A
    ? A[key]
    : never
}

export type Equals<A1 extends any, B2 extends any> = (<A>() => A extends B2
  ? 1
  : 0) extends <A>() => A extends A1 ? 1 : 0
  ? 1
  : 0

export type UnionToIntersectionFn<Union> = (
  Union extends Union ? (union: () => Union) => void : never
) extends (intersection: infer Intersection) => void
  ? Intersection
  : never

export type LastUnion<Union> =
  UnionToIntersectionFn<Union> extends () => infer Last ? Last : never

export type UnionToTuple<
  Union,
  Result extends Array<unknown> = [],
> = Union[] extends never[]
  ? Result
  : UnionToTuple<
      Exclude<Union, LastUnion<Union>>,
      [LastUnion<Union>, ...Result]
    >

export type Or<Union> = Array.Some<UnionToTuple<Union>, true>
export type And<Union> = Array.Every<UnionToTuple<Union>, true>
