import {objectKeys} from '../../source';

import type {Any, Custom} from '@tool/typescript';

type UnionOf<AnyObject extends Any.AnyObject, KeyUnion extends PropertyKey = keyof AnyObject> = {
  [Key in KeyUnion]: {key: Key; value: AnyObject[Key]};
}[KeyUnion];

export const unionOf = <AnyObject extends Any.AnyObject>(anyObject: AnyObject) =>
  objectKeys(anyObject).map(key => ({key, value: anyObject[key]})) as unknown as Custom.Debug<UnionOf<AnyObject>>;
