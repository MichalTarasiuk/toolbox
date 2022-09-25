// Usage:
// https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { isClient } from '@wren/utils'

const useLayout = isClient() ? useLayoutEffect : useEffect

export const useEvent = <TFn extends AnyFunction>(fn: TFn) => {
  const savedFn = useRef(fn)

  useLayout(() => {
    savedFn.current = fn
  })

  return useCallback((...params: Parameters<typeof fn>) => {
    return savedFn.current(...params)
  }, []) as unknown as TFn
}
