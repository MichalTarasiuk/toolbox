// common:primitives

export type Primitive = string | number | boolean | null | undefined | symbol

/**
 * `null` or `undefined`.
 * */
export type Nullish = null | undefined

// common:functions

export type AnyFunction<Args extends any[] = any[], ReturnType = unknown> = (
  ...args: Args
) => ReturnType

export type UnknownFunction = (...args: unknown[]) => unknown

export type AnyGeneratorFunction = (
  ...args: any[]
) => Generator<unknown, any, unknown>

export type AnyAsyncFunction = (...args: any[]) => Promise<unknown>

// common:objects

export type AnyObject<Value = unknown> = Record<PropertyKey, Value>

export type AnyArray = Array<unknown>

export type AnyPromise = Promise<unknown>

export type AnyMap = Map<unknown, unknown>

export type AnySet = Set<unknown>

export type AnyWeakMap = WeakMap<AnyObject, unknown>

export type AnyWeakSet = WeakSet<AnyObject>
