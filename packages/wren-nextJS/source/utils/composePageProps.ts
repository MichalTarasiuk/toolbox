import {isObject, keyIn, signs, asyncFlatMap} from '@tool/utils';
import deepmerge from 'deepmerge';

import type {Custom, Any, Array} from '@tool/typescript';
import type {
  GetStaticPropsContext,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsResult,
} from 'next';

type PrerenderUnion = 'static' | 'server';
type ExecutionModeUnion = 'sequential' | 'parallel';
type ResolveModeUnion = 'deep' | 'shallow';

type PropsProviderUnion = {
  static: (context: GetStaticPropsContext) => Custom.MaybePromise<GetServerSidePropsResult<Any.AnyObject>>;
  server: (context: GetServerSidePropsContext) => Custom.MaybePromise<GetStaticPropsResult<Any.AnyObject>>;
};

type InferProps<
  PropsProviders extends Array<PropsProviderUnion[PrerenderUnion]>,
  Resolve extends ResolveModeUnion,
  PropsUnion = Extract<Awaited<ReturnType<PropsProviders[number]>>, {props: Any.AnyObject}>['props'],
> = Array.Reduce<Custom.UnionToTuple<PropsUnion>, Resolve>;

type InferContext<Prerender extends PrerenderUnion> = Prerender extends 'static'
  ? GetStaticPropsContext
  : GetServerSidePropsContext;

type InferResult<Prerender extends PrerenderUnion> = Prerender extends 'static'
  ? GetStaticPropsResult<Any.AnyObject>
  : GetServerSidePropsResult<Any.AnyObject>;

const hasProps = (propsProviderResult: unknown): propsProviderResult is {props: Any.AnyObject} =>
  isObject(propsProviderResult) && keyIn(propsProviderResult, 'props');

const resolvePropsProviders = <Prerender extends PrerenderUnion, Context extends InferContext<Prerender>>(
  propsProviders: Array<PropsProviderUnion[Prerender]>,
  context: Context,
  executionMode: unknown,
) => {
  if (executionMode === 'parallel') {
    return asyncFlatMap(propsProviders, async propsProvider => {
      // @ts-ignore
      const propsProviderResult = await propsProvider(context);

      if (hasProps(propsProviderResult)) {
        return [propsProviderResult.props];
      }

      return [];
    });
  }

  throw Error('TODO: sequential');
};

const createMergeProps = (resolveMode: unknown) =>
  resolveMode === 'deep'
    ? (a: Any.AnyObject, b: Any.AnyObject) => deepmerge(a, b)
    : (a: Any.AnyObject, b: Any.AnyObject) => ({...a, ...b});

export const composePageProps = <
  Prerender extends PrerenderUnion,
  ExecutionMode extends ExecutionModeUnion,
  Resolve extends ResolveModeUnion,
  PropsProviders extends Array<PropsProviderUnion[Prerender]>,
  Context extends InferContext<Prerender>,
  Props extends InferProps<PropsProviders, Resolve>,
>(
  name: `${Prerender}.${ExecutionMode}.${Resolve}`,
  propsProviders: PropsProviders,
  fn: (context: Context, props: Props) => InferResult<Prerender>,
) => {
  const [_, executionMode, resolveMode] = name.split(signs.dot);

  return async (context: Context) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- fix me
    const allProps = (await resolvePropsProviders(propsProviders, context, executionMode)) as Any.AnyObject[];

    const mergeProps = createMergeProps(resolveMode);
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- fix me
    const props = allProps.reduce(mergeProps) as Props;

    return fn(context, props);
  };
};
