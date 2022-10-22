import { isFunction, isObject, keyIn, signs, emptyObject } from '@jupiter/utils'

import type { Custom, Any, Array } from '@jupiter/typescript'
import type {
  GetStaticPropsContext,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsResult,
} from 'next'

type PrerenderUnion = 'static' | 'server'
type ResolveUnion = 'inSeries' | 'all'

type PropsProviderUnion = {
  static: (
    context: GetStaticPropsContext,
  ) => Custom.MaybePromise<GetServerSidePropsResult<Any.AnyObject>>
  server: (
    context: GetServerSidePropsContext,
  ) => Custom.MaybePromise<GetStaticPropsResult<Any.AnyObject>>
}

type InferProps<
  PropsProviders extends Array<PropsProviderUnion[PrerenderUnion]>,
  Resolve extends ResolveUnion,
  PropsUnion = Extract<
    Awaited<ReturnType<PropsProviders[number]>>,
    { props: Any.AnyObject }
  >['props'],
> = Resolve extends 'all'
  ? Array.Reduce<Custom.UnionToTuple<PropsUnion>>
  : PropsUnion

type InferContext<Prerender extends PrerenderUnion> = Prerender extends 'static'
  ? GetStaticPropsContext
  : GetServerSidePropsContext

const hasProps = (
  propsProviderResult: unknown,
): propsProviderResult is { props: Any.AnyObject } =>
  isObject(propsProviderResult) && keyIn(propsProviderResult, 'props')

export const composePageProps = <
  Prerender extends PrerenderUnion,
  Resolve extends ResolveUnion,
  PropsProviders extends Array<PropsProviderUnion[Prerender]>,
  Context extends InferContext<Prerender>,
  Props extends InferProps<PropsProviders, Resolve>,
>(
  name: `${Prerender}.${Resolve}`,
  propsProviders: Custom.Narrow<PropsProviders>,
  fn: (context: Context, props: Props) => ReturnType<PropsProviders[number]>,
) => {
  const [_, resolve] = name.split(signs.dot)

  return async (context: Context) => {
    if (resolve === 'all') {
      const allProps = await Promise.all(
        propsProviders.flatMap(async (propsProvider) => {
          const propsProviderResult = isFunction(propsProvider)
            ? await propsProvider(context)
            : emptyObject

          if (hasProps(propsProviderResult)) {
            return [propsProviderResult.props]
          }

          return []
        }),
      )

      const reducedProps = allProps.reduce(
        (collector, props) => ({ ...collector, ...props }),
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- implement overwrite
        {} as Props,
      )

      return fn(context, reducedProps)
    }

    return {
      props: {},
    }
  }
}
