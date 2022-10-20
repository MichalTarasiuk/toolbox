import { useCallback, useRef } from 'react'

import { useLayout } from './useLayout'

import type { Any } from '@jupiter/typescript'

/**
 * Issue: https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
 */
export const useEvent = <Fn extends Any.AnyFunction>(fn: Fn) => {
  const savedFn = useRef(fn)

  useLayout(() => {
    savedFn.current = fn
  })

  return useCallback((...params: Parameters<typeof fn>) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safty assertion
    return savedFn.current(...params) as ReturnType<Fn>
  }, [])
}
