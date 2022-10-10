import React, { createContext, useContext } from 'react'

import type { Any } from '@bulb/typescript'
import type { ReactNode } from 'react'

type ServerCacheProviderProps = {
  children: ReactNode
  serverCache: Any.AnyObject
}

const initialContextValue = Symbol()
const serverCacheContext = createContext<
  Any.AnyObject | typeof initialContextValue
>(initialContextValue)

export const ServerCacheProvider = ({
  serverCache,
  children,
}: ServerCacheProviderProps) => {
  return (
    <serverCacheContext.Provider value={serverCache}>
      {children}
    </serverCacheContext.Provider>
  )
}

export const useServerCache = () => {
  const context = useContext(serverCacheContext)

  if (context === initialContextValue) {
    throw Error(
      'useServerCache must be called within a <ServerCacheProvider />',
    )
  }

  return context
}
