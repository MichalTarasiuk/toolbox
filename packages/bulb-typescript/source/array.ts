// @TODO: add: ["at", "concat", "copyWithin", "entries", "every", "fill", "filter", "find", "findIndex", "findLast", "findLastIndex", "flat", "flatMap", "forEach", "includes", "indexOf", "join", "map", "pop", "push", "reduce", "reduceRight", "reverse", "shift", "slice", "some", "sort", "splice", "unshift"]

import type { Any, Custom } from './source'

export type Map<
  Array extends Any.AnyArray,
  Fn extends Any.Primitive | { when: Array[number]; then: unknown },
  SafeFn = Custom.LastUnion<Fn>,
> = Array extends [infer First, ...infer Rest]
  ? [
      SafeFn extends Any.Primitive
        ? SafeFn
        : SafeFn extends { when: unknown; then: unknown }
        ? First extends SafeFn['when']
          ? SafeFn['then']
          : First
        : First,
      ...Map<Rest, Fn>,
    ]
  : []

export type Some<Array extends Any.AnyArray, Value> = Array extends [
  infer First,
  ...infer Rest,
]
  ? Custom.Equals<First, Value> extends 1
    ? true
    : Some<Rest, Value>
  : false

export type Every<Array extends Any.AnyArray, Value> = Array extends [
  infer First,
  ...infer Rest,
]
  ? Custom.Equals<First, Value> extends 1
    ? Rest extends never[]
      ? true
      : Every<Rest, Value>
    : false
  : false
