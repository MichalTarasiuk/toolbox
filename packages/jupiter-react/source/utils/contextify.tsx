import { none } from '@jupiter/utils'
import React from 'react'

import { createSafeContext } from '../source'

import type { Any } from '@jupiter/typescript'
import type { ReactNode } from 'react'

type InferSettings<Params extends Any.AnyArray> = {
  [Key in Extract<keyof Params, `${number}`>]: Params[Key]
}

type ContextProvider<Params extends Any.AnyArray> = {
  children: ReactNode
  settings: InferSettings<Params>
}

export const contextify = <UseHook extends Any.AnyFunction>(
  useHook: UseHook,
) => {
  const name = useHook.name.replace('use', none)
  const [ContextProviderImpl, useContext] =
    createSafeContext<ReturnType<UseHook>>(name)

  const ContextProvider = ({
    children,
    settings,
  }: ContextProvider<Parameters<UseHook>>) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- fix later
    const hook = useHook(...Object.values(settings)) as ReturnType<UseHook>

    return <ContextProviderImpl value={hook}>{children}</ContextProviderImpl>
  }

  return [ContextProvider, useContext] as const
}