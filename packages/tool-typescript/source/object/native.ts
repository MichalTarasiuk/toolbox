import {type Any, type Custom} from '../source';

/**
 * Overwrites the first object starting from the right.
 */
export type Assign<
  Objects extends Array<Any.AnyObject>,
  Result extends Any.AnyObject = Any.EmptyObject,
> = Objects extends [infer FirstObject extends Any.AnyObject, ...infer RestObjects extends Array<Any.AnyObject>]
  ? Assign<RestObjects, Custom.Overwrite<Result, FirstObject>>
  : Result;

/**
 * Keys type returns an array of object properties.
 */
export type Keys<Value extends Any.AnyArray | Any.AnyObject> = Custom.UnionToTuple<
  Value extends Any.AnyObject ? keyof Value : Extract<keyof Value, `${number}`>
>;

/**
 * Entries type returns an array of a given object's own enumerable string-keyed property [key, value] pairs.
 */
export type Entries<
  Value extends Any.AnyArray | Any.AnyObject,
  ValueKeys = Keys<Value>,
> = ValueKeys extends PropertyKey[]
  ? Custom.UnionToTuple<
      {
        [Key in ValueKeys[number]]: Key extends keyof Value ? [Key, Value[Key]] : never;
      }[ValueKeys[number]]
    >
  : never;

/**
 * FromEntries type transforms a list of key-value pairs into an object.
 */
export type FromEntries<Entry extends ReadonlyArray<[PropertyKey, unknown]>> = {
  [Key in Extract<keyof Entry, `${number}`> as Entry[0][0]]: Entry[Key][1];
};

/**
 * Values type return array of a given object's values.
 */
export type Values<
  Value extends Any.AnyArray | Any.AnyObject,
  ValueKeys = Keys<Value>,
> = ValueKeys extends PropertyKey[]
  ? Custom.UnionToTuple<
      {
        [Key in ValueKeys[number]]: Key extends keyof Value ? Value[Key] : never;
      }[ValueKeys[number]]
    >
  : never;
