import { isString, keyIn, objectKeys } from '@wren/utils'
import { useMemo } from 'react'

import { readServerCacheKey } from './helpers'
import { useServerCache } from './serverContext'

import type { GetServerSidePropsContext, GetStaticPropsContext } from 'next'

export type ContextUnion = GetServerSidePropsContext | GetStaticPropsContext
export type PropsProviderType<Context extends ContextUnion = ContextUnion> = ((
  context: Context,
) => unknown) & { name: string }

type CreateServerHook = typeof createServerHook
export type ServerHook = ReturnType<CreateServerHook>

/**
 * `createServerHook` returns hook lets you write React hooks for data queries in NextJS by lifting static props into React Context.
 *
 * @param name - unqiue key which define cache value
 * @param propsProvider - provide value to cache having access to server side
 *
 * @returns cached value base on name
 */
export const createServerHook = <PropsProvider extends PropsProviderType>(
  name: string,
  propsProvider: PropsProvider,
) => {
  const useServerHook = () => {
    const serverCache = useServerCache()

    const serverCacheKey = useMemo(() => {
      const serverCacheKeys = objectKeys(serverCache)
      const selectedServerCacheKey = serverCacheKeys.find(
        (serverCacheKey: unknown): serverCacheKey is string =>
          readServerCacheKey(serverCacheKey) === name,
      )

      return selectedServerCacheKey
    }, [serverCache])

    if (isString(serverCacheKey) && keyIn(serverCache, serverCacheKey)) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- cache[name] has props provider result
      return serverCache[name] as ReturnType<PropsProvider>
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
