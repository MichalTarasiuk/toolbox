import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import { createSafeContext } from '@wren/react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { findDehydratedState } from './helpers'

import type { QueryClient } from '@tanstack/react-query'
import type { Any } from '@wren/typescript'
import type { ReactNode } from 'react'

type ServerCacheProviderProps = {
  children: ReactNode
  queryClient: QueryClient
  pageProps: Any.AnyObject
}

const [ServerCacheProviderImpl, useServerCache] =
  createSafeContext('serverCache')

const ServerCacheProvider = ({
  children,
  queryClient,
  pageProps,
}: ServerCacheProviderProps) => {
  const router = useRouter()

  const cache = useMemo(() => new Map(), [])
  const dehydratedState = useMemo(() => {
    const dehydratedStateToCache = findDehydratedState(pageProps)

    cache.set(router.asPath, dehydratedStateToCache)

    return dehydratedStateToCache
  }, [cache, pageProps, router.asPath])

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <ServerCacheProviderImpl value={null}>
          {children}
        </ServerCacheProviderImpl>
      </Hydrate>
    </QueryClientProvider>
  )
}

export { ServerCacheProvider, useServerCache }
