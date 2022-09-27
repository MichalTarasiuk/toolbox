// Usage:
// https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md

import { isClient } from '@wren/utils'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

const useLayout = isClient() ? useLayoutEffect : useEffect

export const useEvent = <Fn extends AnyFunction>(fn: Fn) => {
  const savedFn = useRef(fn)

  useLayout(() => {
    savedFn.current = fn
  })

  return useCallback((...params: Parameters<typeof fn>) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safty assertion
    return savedFn.current(...params) as ReturnType<Fn>
  }, [])
}
