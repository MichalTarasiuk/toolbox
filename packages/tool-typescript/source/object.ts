// @TODO: add support for array's and create

import type {UnionToTuple} from './custom';
import type {Any, Custom} from './source';

export type Assign<Objects extends Array<Any.AnyObject>, Result extends Any.AnyObject = {}> = Objects extends [
  infer FirstObject extends Any.AnyObject,
  ...infer RestObjects extends Array<Any.AnyObject>,
]
  ? Assign<RestObjects, Custom.Overwrite<Result, FirstObject>>
  : Result;

export type Keys<Value extends Any.AnyObject | Any.AnyArray> = Custom.UnionToTuple<
  Value extends Any.AnyObject ? keyof Value : Extract<keyof Value, `${number}`>
>;

export type Entries<
  Value extends Any.AnyArray | Any.AnyObject,
  ValueKeys = Keys<Value>,
> = ValueKeys extends PropertyKey[]
  ? UnionToTuple<
      {
        [Key in ValueKeys[number]]: Key extends keyof Value ? [Key, Value[Key]] : never;
      }[ValueKeys[number]]
    >
  : never;

export type FromEntries<Entry extends Array<[PropertyKey, unknown]>> = {
  [Key in Extract<keyof Entry, `${number}`> as Entry[0][0]]: Entry[Key][1];
};

export type Values<
  Value extends Any.AnyObject | Any.AnyArray,
  ValueKeys = Keys<Value>,
> = ValueKeys extends PropertyKey[]
  ? UnionToTuple<
      {
        [Key in ValueKeys[number]]: Key extends keyof Value ? Value[Key] : never;
      }[ValueKeys[number]]
    >
  : never;
