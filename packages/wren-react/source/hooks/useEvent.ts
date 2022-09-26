// Usage:
// https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md

import { isClient } from '@wren/utils'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

const useLayout = isClient() ? useLayoutEffect : useEffect

export const useEvent = <TFn extends AnyFunction>(fn: TFn) => {
  const savedFn = useRef(fn)

  useLayout(() => {
    savedFn.current = fn
  })

  const a = useCallback((...params: Parameters<typeof fn>) => {
    return savedFn.current(...params)
  }, [])

  return
}
