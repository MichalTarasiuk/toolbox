// TODO: add typescript support
import {type Any} from '@tool/typescript';

type RunPromisesInSeries<
  AnyAsyncFunctions extends Any.AnyAsyncFunction[],
  Param = never,
  Result extends unknown[] = [],
> = AnyAsyncFunctions extends [infer First extends Any.AnyAsyncFunction, ...infer Rest extends Any.AnyAsyncFunction[]]
  ? RunPromisesInSeries<
      Rest,
      Awaited<ReturnType<First>>,
      [...Result, (param: Param) => Promise<Awaited<ReturnType<First>>>]
    >
  : Result;

/**
 * Runs an array of promises in series.
 */
export const runPromisesInSeries = <AnyAsyncFunctions extends Any.AnyAsyncFunction[]>(
  promises: RunPromisesInSeries<AnyAsyncFunctions>,
) => promises.reduce((anyPromises, next) => anyPromises.then(next), Promise.resolve());
