import { isDehydratedState } from './assertions'

import type { Any } from '@wren/typescript'

export const findDehydratedState = (pageProps: Any.AnyObject) => {
  const dehydratedState = Object.values(pageProps).find(isDehydratedState)

  if (dehydratedState) {
    return dehydratedState
  }

  const fallbackDehydratedState = {
    queries: [],
    mutations: [],
  }

  return fallbackDehydratedState
}
