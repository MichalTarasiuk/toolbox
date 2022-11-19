import { objectKeys } from '../../../source'

import type { Any } from '@wren/typescript'

type InferFns<Object extends Any.AnyObject> = Partial<{
  [Key in keyof Object]: (value: Object[Key]) => boolean
}>

export const every = <
  Object extends Any.AnyObject,
  Fns extends InferFns<Object>,
>(
  object: Object,
  fns: Fns,
) =>
  objectKeys(fns).every((fnKey) => {
    const fn = fns[fnKey]

    if (fn) {
      return fn(object[fnKey])
    }

    return false
  })
