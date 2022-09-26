// common:primitives

type Primitive = string | number | boolean | null | undefined | symbol

/**
 * `null` or `undefined`.
 * */
type Nullish = null | undefined

// common:functions

type AnyFunction<
  Args extends readonly any[] = readonly any[],
  ReturnType = unknown,
> = (...args: Args) => ReturnType

type UnknownFunction = (...args: readonly unknown[]) => unknown

type AnyGeneratorFunction = (
  ...args: readonly any[]
) => Generator<unknown, any, unknown>

type AnyAsyncFunction = (...args: readonly any[]) => Promise<unknown>

// common:objects

type AnyObject<Value = unknown> = Record<PropertyKey, Value>

type AnyArray = ReadonlyArray<unknown>

type AnyPromise = Promise<unknown>

type AnyMap = ReadonlyMap<unknown, unknown>

type AnySet = ReadonlySet<unknown>

type AnyWeakMap = WeakMap<AnyObject, unknown>

type AnyWeakSet = WeakSet<AnyObject>
