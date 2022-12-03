/* eslint-disable @typescript-eslint/no-explicit-any -- contravariance */

// any:primitives

export type Primitive = boolean | number | string | symbol | null | undefined;

export type FalsyValues = '' | 0 | false | null | undefined;

export type TruthyValues = Exclude<
  | AnyArray
  | AnyAsyncFunction
  | AnyFunction
  | AnyGeneratorFunction
  | AnyMap
  | AnyObject
  | AnyPromise
  | AnySet
  | AnyWeakMap
  | AnyWeakSet
  | Comparable
  | UnknownFunction
  | string
  | true,
  '' | 0
>;

type Sign = '-' | '+';

export type NumberLike =
  | bigint
  | boolean
  | number
  | number
  | `${bigint | number}`
  | `${Sign | ''}${'Infinity'}`
  | {[Symbol.toPrimitive](hint: 'number'): number}
  | null;

export type Comparable = Exclude<NumberLike, null> | string;

/**
 * `null` or `undefined`.
 * */
export type Nullish = null | undefined;

// any:functions

export type AnyFunction<Args extends any[] = any[], ReturnType = unknown> = (...args: Args) => ReturnType;

export type UnknownFunction = (...args: unknown[]) => unknown;

export type AnyGeneratorFunction = (...args: any[]) => Generator;

export type AnyAsyncFunction = (...args: any[]) => Promise<unknown>;

export type Noop = () => void;

// any:objects

// eslint-disable-next-line @typescript-eslint/ban-types
export type EmptyObject = {};

export type AnyObject<Value = unknown, Key extends PropertyKey = PropertyKey> = Record<Key, Value>;

export type AnyArray = unknown[];

export type AnyPromise = Promise<unknown>;

export type AnyMap = Map<unknown, unknown>;

export type AnySet = Set<unknown>;

export type AnyWeakMap = WeakMap<AnyObject, unknown>;

export type AnyWeakSet = WeakSet<AnyObject>;
