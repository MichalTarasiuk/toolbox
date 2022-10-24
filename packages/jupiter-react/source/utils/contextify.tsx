// @TODO: add support for params of hook

import { none } from '@jupiter/utils'
import React from 'react'

import { createSafeContext } from '../source'

import type { Any } from '@jupiter/typescript'
import type { ReactNode } from 'react'

export const contextify = <UseHook extends Any.UnknownFunction>(
  useHook: UseHook,
) => {
  const name = useHook.name.replace('use', none)
  const [SafeProviderImpl, useSafeContext] =
    createSafeContext<ReturnType<UseHook>>(name)

  const SafeProvider = ({ children }: { children: ReactNode }) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- fix later
    const hook = useHook() as ReturnType<UseHook>

    return <SafeProviderImpl value={hook}>{children}</SafeProviderImpl>
  }

  return [SafeProvider, useSafeContext] as const
}
