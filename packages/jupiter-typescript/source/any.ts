// any:primitives

export type Primitive = string | number | boolean | null | undefined | symbol

export type FalsyValues = 0 | '' | null | undefined | false

export type TruthyValues = Exclude<
  | Comparable
  | AnyFunction
  | UnknownFunction
  | AnyGeneratorFunction
  | AnyAsyncFunction
  | AnyObject
  | AnyArray
  | AnyPromise
  | AnyMap
  | AnySet
  | AnyWeakMap
  | AnyWeakSet
  | true
  | string,
  0 | ''
>

type Sign = '-' | '+'

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

/**
 * `null` or `undefined`.
 * */
export type Nullish = null | undefined

// any:functions

export type AnyFunction<Args extends any[] = any[], ReturnType = unknown> = (
  ...args: Args
) => ReturnType

export type UnknownFunction = (...args: unknown[]) => unknown

export type AnyGeneratorFunction = (
  ...args: any[]
) => Generator<unknown, any, unknown>

export type AnyAsyncFunction = (...args: any[]) => Promise<unknown>

export type Noop = () => void

// any:objects

export type EmptyObject = {}

export type AnyObject<
  Value = unknown,
  Key extends PropertyKey = PropertyKey,
> = Record<Key, Value>

export type AnyArray = Array<unknown>

export type AnyPromise = Promise<unknown>

export type AnyMap = Map<unknown, unknown>

export type AnySet = Set<unknown>

export type AnyWeakMap = WeakMap<AnyObject, unknown>

export type AnyWeakSet = WeakSet<AnyObject>
