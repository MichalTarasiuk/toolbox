/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import {keyIn} from '../../source';

import type {Any, Number, Custom} from '@tool/typescript';

type AnyBoundParams = Any.AnyObject<unknown, string>;

type InferBoundParams<
  AnyFunction extends Any.AnyFunction,
  Params extends unknown[] = Parameters<AnyFunction>,
> = Partial<{
  [Key in Extract<keyof Params, `${number}`>]: Params[Key];
}>;

type InferParams<
  Params extends Any.AnyArray,
  BoundParams extends AnyBoundParams,
  Result extends Any.AnyArray = [],
  IndexArr extends never[] = [],
> = Params extends [infer First, ...infer Rest]
  ? Custom.Equals<BoundParams[Number.ToString<IndexArr['length']>], unknown> extends 0
    ? InferParams<Rest, BoundParams, Result, [...IndexArr, never]>
    : InferParams<Rest, BoundParams, [...Result, First], [...IndexArr, never]>
  : Result;

export const bound = <
  AnyFunction extends Any.AnyFunction,
  BoundParams extends AnyBoundParams = InferBoundParams<AnyFunction>,
  Params extends Parameters<AnyFunction> = Parameters<AnyFunction>,
>(
  anyFunction: AnyFunction,
  boundParams: BoundParams,
) => {
  const boundParamsKeys = Object.keys(boundParams);

  return (...restParams: InferParams<Params, BoundParams>) => {
    const newRestParams = [...restParams];

    const length = restParams.length + boundParamsKeys.length;
    const params = [...Array(length)].map((_, index) => {
      const stringifyIndex = String(index);

      return keyIn(boundParams, stringifyIndex) ? boundParams[stringifyIndex] : newRestParams.shift();
    });

    return anyFunction(...(params as Parameters<AnyFunction>)) as ReturnType<AnyFunction>;
  };
};
