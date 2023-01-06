import type {Any, Custom, Array as ArrayType} from '../source';

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
export type Keys<AnyObject extends Any.AnyObject> = Array<keyof AnyObject>;

/**
 * Entries type returns an array of a given object's own enumerable string-keyed property [key, value] pairs.
 */
export type Entries<AnyObject extends Any.AnyObject> = Array<
  Custom.ValueOf<{
    [Key in keyof AnyObject]: [Key, AnyObject[Key]];
  }>
>;

/**
 * FromEntries type transforms a list of key-value pairs into an object.
 */
export type FromEntries<Entry extends ArrayType.Entry> = {
  [Key in Entry[0]]: Entry extends [Key, unknown] ? Entry[1] : never;
};
/**
 * Values type return array of a given object's values.
 */
export type Values<Value extends Any.AnyObject, ValueKeys = Keys<Value>> = ValueKeys extends PropertyKey[]
  ? Custom.UnionToTuple<
      {
        [Key in ValueKeys[number]]: Key extends keyof Value ? Value[Key] : never;
      }[ValueKeys[number]]
    >
  : never;
