import { isAsyncFunction, isObject } from '@core/utils'
import deepmerge from 'deepmerge'

import type {
  ComposeOptions,
  PropsMergeStrategy,
  GetProps,
  MergeProps,
  PropsProviders,
  ResolvedPropsProvider,
} from './types'
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next'
import type { ParsedUrlQuery } from 'querystring'

const shallowMerge = <TObject1, TObject2>(a: TObject1, b: TObject2) =>
  ({ ...a, ...b } as unknown as Overwrite<TObject1, TObject2>)
const fixedDeepMerge = <TObject1, TObject2>(a: TObject1, b: TObject2) =>
  deepmerge(
    a as Partial<TObject1 & TObject2>,
    b as Partial<TObject1 & TObject2>,
  )

const hasProps = (
  resolvedPropsProvider: unknown,
): resolvedPropsProvider is ResolvedPropsProvider =>
  isObject(resolvedPropsProvider) && 'props' in resolvedPropsProvider

const getProps = (resolvedPropsProviders: unknown[]) =>
  Promise.all(
    resolvedPropsProviders
      .filter(hasProps)
      .map(async (resolvedPropsProvider) => await resolvedPropsProvider.props),
  )

export const composeServerSideProps = <
  TParsedUrlQuery extends ParsedUrlQuery,
  TPreviewData extends PreviewData,
  TPropsProviders extends PropsProviders,
  TAllProps extends GetProps<TPropsProviders>,
  TCallStrategy extends PropsMergeStrategy = 'shallow',
  TMergedProps extends MergeProps<TAllProps, TCallStrategy> = MergeProps<
    TAllProps,
    TCallStrategy
  >,
  TReturnType = never,
>(
  propsProviders: Narrow<TPropsProviders>,
  callback: (
    context: GetServerSidePropsContext<TParsedUrlQuery, TPreviewData>,
    props: Pretty<TMergedProps>,
  ) => MaybePromise<GetServerSidePropsResult<TReturnType>>,
  options?: ComposeOptions<TCallStrategy>,
) => {
  const { propsMergeStrategy = 'shallow', callStrategy = 'sequential' } =
    options || {}
  const fixedPropsProviders = propsProviders as TPropsProviders

  const resolvePropsProviders = async (
    context: GetServerSidePropsContext<TParsedUrlQuery, TPreviewData>,
  ) => {
    if (callStrategy === 'parallel') {
      return await Promise.all(
        fixedPropsProviders
          .filter(isAsyncFunction)
          .map(async (propsProvider) => await propsProvider(context)),
      )
    }

    return fixedPropsProviders
      .filter(isAsyncFunction)
      .reduce(
        async (collector, propsProvider) =>
          collector.then(async (cache) => [
            ...cache,
            await propsProvider(context),
          ]),
        Promise.resolve([] as unknown[]),
      )
  }

  return async (
    context: GetServerSidePropsContext<TParsedUrlQuery, TPreviewData>,
  ) => {
    const resolvedPropsProviders = await resolvePropsProviders(context)
    const propsTuple = await getProps(resolvedPropsProviders)

    const mergeStrategy =
      propsMergeStrategy === 'shallow' ? shallowMerge : fixedDeepMerge
    const propsIntersection = propsTuple.reduce(
      (collector, props) => mergeStrategy(collector, props),
      {},
    ) as Pretty<TMergedProps>

    return callback(context, propsIntersection)
  }
}
