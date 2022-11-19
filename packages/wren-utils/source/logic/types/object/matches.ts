import { isObject, keyIn } from '../../../source'

import type { Any, Custom } from '@wren/typescript'

type Matches<Keys extends PropertyKey[]> = Any.AnyObject<unknown, Keys[number]>

export const matches = <Keys extends PropertyKey[]>(
  object: unknown,
  keys: Custom.Narrow<Keys>,
): object is Matches<Keys> =>
  isObject(object) && keys.every((key) => keyIn(object, key))
