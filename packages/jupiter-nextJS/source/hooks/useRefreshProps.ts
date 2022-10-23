import { useEvent } from '@jupiter/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import type { NextRouter } from 'next/router'
import type { UrlObject } from 'url'

type Url = string | UrlObject

type InferTransitionOptions<GenericNextRouter extends NextRouter> =
  GenericNextRouter extends {
    push: (url: Url, as?: Url, options?: infer TransitionOptions) => unknown
  }
    ? TransitionOptions
    : never

export const useRefreshProps = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  const getUrl = useEvent(() => router.asPath)

  useEffect(() => {
    const routeChangeStartHandler = (
      nextUrl: string,
      transitionOptions: InferTransitionOptions<typeof router>,
    ) => {
      if (getUrl() === nextUrl && !transitionOptions.shallow) {
        setIsRefreshing(true)
      }
    }
    const routeChangeFinishHandler = () => {
      setIsRefreshing((isRefreshing) => isRefreshing && false)
    }

    router.events.on('routeChangeStart', routeChangeStartHandler)
    router.events.on('routeChangeError', routeChangeFinishHandler)
    router.events.on('routeChangeComplete', routeChangeFinishHandler)

    return () => {
      router.events.off('routeChangeStart', routeChangeStartHandler)
      router.events.off('routeChangeError', routeChangeFinishHandler)
      router.events.off('routeChangeComplete', routeChangeFinishHandler)
    }
  }, [])

  const refreshProps = useCallback(() => {
    void router.replace(router.asPath, undefined)
  }, [])

  return [isRefreshing, refreshProps] as const
}
