import {isString, keyIn, none, signs} from '../../source';

import type {Any, Custom, Array} from '@tool/typescript';

type FormatKey<Key extends PropertyKey> = Key extends `?${infer FormatedKey}` ? FormatedKey : Key;
type KeysIn<Keys extends Array.MaybeReadonly<PropertyKey>> = Any.AnyObject<unknown, FormatKey<Keys[number]>>;

export const keysIn = <Keys extends Array.MaybeReadonly<PropertyKey>>(
  anyObject: Any.AnyObject,
  keys: Keys extends Any.AnyReadonlyArray ? Keys : Custom.Narrow<Keys>,
): anyObject is KeysIn<Keys> =>
  keys.every(key => {
    const isOptional = isString(key) && key.startsWith(signs.question);

    if (isOptional) {
      return true;
    }

    const formatedKey = isString(key) && /\?\w+/g.test(key) ? key.replace(signs.question, none) : key;

    return keyIn(anyObject, formatedKey);
  });
