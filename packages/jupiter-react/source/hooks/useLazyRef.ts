/* eslint-disable @typescript-eslint/consistent-type-assertions -- typescript can't infer return type of unknwon function */
import { isObject, isSymbol, keyIn } from '@jupiter/utils'
import { useRef } from 'react'

import type { MutableRefObject } from 'react'

const canWork = <Current>(
  ref: MutableRefObject<Current>,
): ref is { current: Exclude<Current, symbol> } =>
  isObject(ref) && keyIn(ref, 'current') && !isSymbol(ref.current)

export const useLazyRef = <LazyInitialize extends () => unknown>(
  lazyInitialize: LazyInitialize,
) => {
  const canInitialize = Symbol()
  const ref = useRef<ReturnType<LazyInitialize> | typeof canInitialize>(
    canInitialize,
  )

  if (ref.current === canInitialize) {
    ref.current = lazyInitialize() as ReturnType<LazyInitialize>
  }

  if (canWork(ref)) {
    return ref
  }

  throw Error('something went wrong')
}
