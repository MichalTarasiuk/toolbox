import { keyIn, signs } from '../../../source'

import type { Any, Custom, Array } from '@wren/typescript'

type FormatKey<Key extends PropertyKey> = Key extends `?${infer FormatedKey}`
  ? FormatedKey
  : Key
type KeysIn<Keys extends Array.OptionalReadonly<PropertyKey>> = Any.AnyObject<
  unknown,
  FormatKey<Keys[number]>
>

export const keysIn = <Keys extends Array.OptionalReadonly<PropertyKey>>(
  anyObject: Any.AnyObject,
  keys: Keys extends Any.AnyReadonlyArray ? Keys : Custom.Narrow<Keys>,
): anyObject is KeysIn<Keys> =>
  keys.every((key) => {
    const stringifyKey = key.toString()
    const isOptional = stringifyKey.startsWith(signs.question)

    if (isOptional) {
      return true
    }

    return keyIn(anyObject, stringifyKey)
  })
