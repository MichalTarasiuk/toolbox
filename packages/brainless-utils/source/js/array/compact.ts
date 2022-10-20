import type { Any } from '@jupiter/typescript'
import type { Any as A, Function, List } from 'ts-toolbelt'

type Compact<
  Arr extends Any.AnyArray,
  Result extends Any.AnyArray = [],
> = Arr extends [infer First, ...infer Rest]
  ? A.Contains<First, Any.FalsyValues> extends 1
    ? Compact<Rest, Result>
    : Compact<Rest, List.Append<Result, First>>
  : Result

/**
 * Removes falsy values from an array.
 */
export const compact = <Arr extends Any.AnyArray>(
  array: Function.Narrow<Arr>,
) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
  array.filter(Boolean) as Compact<Arr>
