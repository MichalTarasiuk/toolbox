import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import { createSafeContext } from '@wren/react'
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
  const dehydratedState = useMemo(
    () => findDehydratedState(pageProps),
    [pageProps],
  )

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
