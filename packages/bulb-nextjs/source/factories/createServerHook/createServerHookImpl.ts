import { keyIn } from '@bulb/utils'

import { useServerCache } from './serverContext'

import type { GetServerSidePropsContext, GetStaticPropsContext } from 'next'

export type ContextUnion = GetServerSidePropsContext | GetStaticPropsContext
export type PropsProvider<Context extends ContextUnion = ContextUnion> = ((
  context: Context,
) => unknown) & { name: string }

export const createServerHook = <Name extends string>(
  name: Name,
  propsProvider: PropsProvider,
) => {
  const useServerHook = () => {
    const serverCache = useServerCache()

    if (keyIn<typeof serverCache, Name>(serverCache, name)) {
      return serverCache[name]
    }

    throw Error(
      `Did not find a data hook named "${name}". Ensure it was provided to composePropsProviders.`,
    )
  }

  propsProvider.name = name

  return Object.assign(useServerHook, {
    propsProvider,
  })
}
