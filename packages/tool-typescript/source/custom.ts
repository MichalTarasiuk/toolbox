import type {Any, Array} from './source';

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IsAny<Type> = 0 extends Type & 1 ? true : false;
export type NotAny<Type> = true extends IsAny<Type> ? false : true;

export type Debug<AnyObject> = AnyObject extends Record<PropertyKey, unknown>
  ? {[Key in keyof AnyObject]: AnyObject[Key]}
  : never;

export type MaybePromise<Value> = Promise<Value> | Value;

export type Overwrite<A extends Any.AnyObject, B extends Any.AnyObject> = {
  [key in keyof (A & B)]: key extends keyof B ? B[key] : key extends keyof A ? A[key] : never;
};

export type Equals<A1, B2> = (<A>() => A extends B2 ? 1 : 0) extends <A>() => A extends A1 ? 1 : 0 ? 1 : 0;

export type UnionToIntersectionFn<Union> = (Union extends Union ? (union: () => Union) => void : never) extends (
  intersection: infer Intersection,
) => void
  ? Intersection
  : never;

export type LastUnion<Union> = UnionToIntersectionFn<Union> extends () => infer Last ? Last : never;

export type UnionToTuple<Union, Result extends Array<unknown> = []> = Union[] extends never[]
  ? Result
  : UnionToTuple<Exclude<Union, LastUnion<Union>>, [LastUnion<Union>, ...Result]>;

export type Or<Union> = Array.Some<UnionToTuple<Union>, true>;
export type And<Union> = Array.Every<UnionToTuple<Union>, true>;

export type ValueOf<Value extends Any.AnyArray | Any.AnyObject> = Value extends Any.AnyArray
  ? Value[number]
  : Value extends Any.AnyObject
  ? Value[keyof Value]
  : never;

export type Narrow<Type> =
  | Extract<Type, bigint | boolean | number | string | symbol | [] | null | undefined>
  | [Type] extends [[]]
  ? []
  : Type | {[Key in keyof Type]: Narrow<Type[Key]>} extends infer TValue
  ? TValue
  : never;

export type TypeOf<Target, Value> = Exclude<Value, Target> extends never ? true : false;

declare const UNDEFINED_VOID_ONLY: unique symbol;
// Destructors are only allowed to return void.
export type Destructor = () => {[UNDEFINED_VOID_ONLY]: never} | void;
export type VoidOrUndefinedOnly = {[UNDEFINED_VOID_ONLY]: never} | void;
