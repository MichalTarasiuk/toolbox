import type { Function } from 'ts-toolbelt'

type RunPromisesInSeries<
  AnyAsyncFunctions extends AnyAsyncFunction[],
  Param = never,
  Result extends unknown[] = [],
> = AnyAsyncFunctions extends [
  infer First extends AnyAsyncFunction,
  ...infer Rest extends AnyAsyncFunction[],
]
  ? RunPromisesInSeries<
      Rest,
      Awaited<ReturnType<First>>,
      [...Result, (param: Param) => Promise<Awaited<ReturnType<First>>>]
    >
  : Result

const runPromisesInSeries = <AnyAsyncFunctions extends AnyAsyncFunction[]>(
  promises: RunPromisesInSeries<AnyAsyncFunctions>,
) => {
  // promises.reduce(
  //   (anyPromises, next) => anyPromises.then(next),
  //   Promise.resolve(),
  // )
}

runPromisesInSeries([])
