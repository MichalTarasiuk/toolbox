import { keyIn } from '@jupiter/utils'

import type { Custom, Any } from '@jupiter/typescript'
import type {
  GetStaticPropsContext,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsResult,
} from 'next'

type PrerenderUnion = 'static' | 'server'
type Resolve = 'inSeries' | 'all'

type PropsProviderUnion = {
  static: (
    context: GetStaticPropsContext,
  ) => Custom.MaybePromise<GetServerSidePropsResult<Any.AnyObject>>
  server: (
    context: GetServerSidePropsContext,
  ) => Custom.MaybePromise<GetStaticPropsResult<Any.AnyObject>>
}

type PropsProviderResult = Awaited<
  ReturnType<PropsProviderUnion[PrerenderUnion]>
>

const hasProps = (
  propsProviderResult: PropsProviderResult,
): propsProviderResult is { props: Any.AnyObject } =>
  keyIn(propsProviderResult, 'props')

export const composePageProps = <Prerender extends PrerenderUnion>(
  _prerender: Prerender,
  propsProviders: Array<PropsProviderUnion[Prerender]>,
  resolve: Resolve,
) => {
  return async (context) => {
    if (resolve === 'all') {
      await Promise.all(
        propsProviders.flatMap(async (propsProvider) => {
          const propsProviderResult = await propsProvider(context)

          if (hasProps(propsProviderResult)) {
            return [propsProviderResult.props]
          }

          return []
        }),
      )

      return {
        props: {},
      }
    }

    return {
      props: {},
    }
  }
}

// export const composeServerProps = composePageProps.bind(null, 'server')
// export const composeStaticProps = composePageProps.bind(null, 'static')
