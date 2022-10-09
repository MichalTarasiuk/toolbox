// @TODO: add support for array's and create: ["values", "entries", "fromEntries"]

import type { Any, Custom } from './source'

export type Assign<
  Objects extends Array<Any.AnyObject | Any.AnyArray>,
  Result extends Any.AnyObject = {},
> = Objects extends [
  infer FirstObject extends Any.AnyObject,
  ...infer RestObjects extends Array<Any.AnyObject>,
]
  ? Assign<RestObjects, Custom.Overwrite<Result, FirstObject>>
  : Result

export type Keys<Value extends Any.AnyObject | Any.AnyArray> =
  Custom.UnionToTuple<
    Value extends Any.AnyObject
      ? keyof Value
      : Extract<keyof Value, `${number}`>
  >
