import { isArray } from '../javascript'

type CastArray<Value> = Value extends Array<unknown> ? Value : [Value]

export const castArray = <Value>(value: Value) =>
  (isArray(value) ? value : [value]) as CastArray<Value>
