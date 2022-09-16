// common:functions

type AnyGeneratorFunction = (...args: any[]) => Generator<unknown, any, unknown>

type AnyAsyncFunction = (...args: any[]) => Promise<unknown>

// common:objects

type AnyObject = Record<PropertyKey, unknown>

type AnyArray = Array<unknown>

type AnyPromise = Promise<unknown>

type AnyMap = Map<unknown, unknown>

type AnySet = Set<unknown>

type AnyWeakMap = WeakMap<AnyObject, unknown>

type AnyWeakSet = WeakSet<AnyObject>
