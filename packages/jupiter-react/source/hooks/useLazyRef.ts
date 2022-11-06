/* eslint-disable @typescript-eslint/consistent-type-assertions -- typescript can't infer return type of unknwon function */
import { isObject, keyIn } from '@jupiter/utils'
import { useRef } from 'react'

import { objectIs } from '../../_api'

import type { MutableRefObject } from 'react'

const canWork = <Current extends unknown, Symbol extends symbol>(
  ref: MutableRefObject<Current>,
  symbol: Symbol,
): ref is { current: Exclude<Current, Symbol> } =>
  isObject(ref) && keyIn(ref, 'current') && !objectIs(ref.current, symbol)

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

  if (canWork(ref, canInitialize)) {
    return ref
  }

  throw Error('something went wrong')
}
