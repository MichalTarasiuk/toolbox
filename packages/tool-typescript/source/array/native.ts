import type {Any, Custom} from '../source';

export type Map<
  Array extends Any.AnyArray,
  Fn extends Any.Primitive | {when: Array[number]; then: unknown},
  SafeFn = Custom.LastUnion<Fn>,
> = Array extends [infer First, ...infer Rest]
  ? [
      SafeFn extends Any.Primitive
        ? SafeFn
        : SafeFn extends {when: unknown; then: unknown}
        ? First extends SafeFn['when']
          ? SafeFn['then']
          : First
        : First,
      ...Map<Rest, Fn>,
    ]
  : [];

export type Filter<Array extends Any.AnyArray, Fn, Output extends Any.AnyArray = []> = Array extends [
  infer First,
  ...infer Rest,
]
  ? First extends Fn
    ? Filter<Rest, Fn, [...Output, First]>
    : Filter<Rest, Fn, Output>
  : Output;

export type Reduce<
  Array extends unknown[],
  Strategy extends 'deep' | 'shallow',
  Collector extends Any.AnyObject = Any.EmptyObject,
> = Array extends [infer First, ...infer Rest]
  ? First extends Any.AnyObject
    ? Reduce<Rest, Strategy, Strategy extends 'shallow' ? Custom.Overwrite<Collector, First> : Collector & First>
    : never
  : Collector;

export type Some<Array extends Any.AnyArray, Value> = Array extends [infer First, ...infer Rest]
  ? Custom.Equals<First, Value> extends 1
    ? true
    : Some<Rest, Value>
  : false;

export type Every<Array extends Any.AnyArray, Value> = Array extends [infer First, ...infer Rest]
  ? Custom.Equals<First, Value> extends 1
    ? Rest extends never[]
      ? true
      : Every<Rest, Value>
    : false
  : false;

export type Push<Array extends Any.AnyArray, Value extends Array[number]> = [...Array, Value];

export type Length<Array extends Any.AnyArray> = Array['length'];

export type Includes<Array extends Any.AnyArray, SearchElement> = Array extends [
  infer First,
  ...infer Rest extends Any.AnyArray,
]
  ? Custom.Equals<First, SearchElement> extends true
    ? true
    : Includes<Rest, SearchElement>
  : false;

export type From<To extends number, Result extends never[] = []> = To extends Result['length']
  ? Result
  : From<To, [...Result, never]>;
