import type { Any } from '@flame/typescript'
import type { Function, List } from 'ts-toolbelt'

type Union<
  AnyArrayGeneric extends Any.AnyArray,
  Result extends Any.AnyArray = [],
> = AnyArrayGeneric extends [infer First, ...infer Rest]
  ? List.Includes<Result, First> extends 1
    ? Union<Rest, Result>
    : Union<Rest, List.Append<Result, First>>
  : Result

/**
 * Removes duplicates from array.
 */
export const union = <AnyArrayGenericType extends Any.AnyArray>(
  array: Function.Narrow<AnyArrayGenericType>,
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
) => [...new Set(array)] as Union<AnyArrayGenericType>
