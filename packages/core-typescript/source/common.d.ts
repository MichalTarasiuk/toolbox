// common:primitives

/**
 * `null` or `undefined`.
 * */
type Nullish = null | undefined

// common:functions

type AnyFunction<Args extends any[] = any[], ReturnType = unknown> = (
  ...args: Args
) => ReturnType

type UnknownFunction = (...args: unknown[]) => unknown

type AnyGeneratorFunction = (...args: any[]) => Generator<unknown, any, unknown>

type AnyAsyncFunction = (...args: any[]) => Promise<unknown>

// common:objects

type AnyObject<Value = unknown> = Record<PropertyKey, Value>

type AnyArray = Array<unknown>

type AnyPromise = Promise<unknown>

type AnyMap = Map<unknown, unknown>

type AnySet = Set<unknown>

type AnyWeakMap = WeakMap<AnyObject, unknown>

type AnyWeakSet = WeakSet<AnyObject>
