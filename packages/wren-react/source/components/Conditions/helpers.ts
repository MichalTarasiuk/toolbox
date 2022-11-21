import { isFunction } from '@wren/utils'
import * as ReactIs from 'react-is'

import type { Any } from '@wren/typescript'
import type { ReactElement, ReactNode } from 'react'

export type Resolvable<Resolved> = (() => Resolved) | Resolved

const isResolvable = <Resolved>(
  value: unknown,
): value is Extract<Resolvable<Resolved>, Any.AnyFunction> => isFunction(value)

export const resolve = <Resolved>(resolvable: Resolvable<Resolved>) => {
  if (isResolvable(resolvable)) {
    return resolvable()
  }

  return resolvable
}

export const isReactElement = (
  reactNode: ReactNode,
): reactNode is ReactElement => ReactIs.isElement(reactNode)
