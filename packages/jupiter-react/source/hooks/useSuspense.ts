/* eslint-disable @typescript-eslint/consistent-type-assertions --   // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- typescript can't infer type of generic function */
import { suspensify, useLazyRef } from '../source'

import type { Any } from '@jupiter/typescript'

export const useSuspense = <Promisable extends Any.AnyAsyncFunction>(
  promisable: Promisable,
) => {
  const lazyRef = useLazyRef(promisable)
  const resolved = suspensify(lazyRef.current).read()

  return resolved as Awaited<ReturnType<Promisable>>
}
