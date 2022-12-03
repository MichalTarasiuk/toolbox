import {type Any, type Custom, type Array} from '@tool/typescript';
import {type List} from 'ts-toolbelt';

type Union<AnyArrayGeneric extends Any.AnyArray, Result extends Any.AnyArray = []> = AnyArrayGeneric extends [
  infer First,
  ...infer Rest,
]
  ? List.Includes<Result, First> extends 1
    ? Union<Rest, Result>
    : Union<Rest, Array.Push<Result, First>>
  : Result;

/**
 * Removes duplicates from array.
 */
export const union = <AnyArrayGenericType extends Any.AnyArray>(array: Custom.Narrow<AnyArrayGenericType>) =>
  [...new Set(array)] as Union<AnyArrayGenericType>;
