import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
  PreviewData,
} from 'next'
import { ParsedUrlQuery } from 'querystring'

export type InvokeStrategy = 'sequential' | 'parallel'

export type PropsMergeStrategy = 'deep' | 'shallow'

export type ComposeOptions<
  TPropsMergeStrategy extends PropsMergeStrategy = PropsMergeStrategy,
> = {
  propsMergeStrategy?: TPropsMergeStrategy
  callStrategy?: InvokeStrategy
}

export type ResolvedPropsProvider = Extract<
  GetServerSidePropsResult<MappedObject<unknown>>,
  { props: unknown }
>

export type GetProps<
  TArray extends Array<unknown>,
  TResult extends Array<MappedObject<unknown>> = [],
> = TArray extends [infer First, ...infer Rest]
  ? GetProps<
      Rest,
      First extends GetServerSideProps
        ? [...TResult, InferGetServerSidePropsType<First>]
        : TResult
    >
  : TResult

export type MergeProps<
  TAllProps extends MappedObject<unknown>[],
  TCallStrategy extends PropsMergeStrategy,
> = TCallStrategy extends 'deep'
  ? UnionToIntersection<TAllProps[number]>
  : Reduce<TAllProps>

export type PropsProviders = Array<
  (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  ) => MaybePromise<unknown>
>
