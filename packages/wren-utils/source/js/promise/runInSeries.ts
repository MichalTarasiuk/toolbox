import type { Function } from 'ts-toolbelt'

type RunPromisesInSeries<
  AnyAsyncFunctions extends readonly AnyAsyncFunction[],
  Param = never,
  Result extends readonly unknown[] = readonly [],
> = AnyAsyncFunctions extends readonly [
  infer First extends AnyAsyncFunction,
  ...infer Rest extends readonly AnyAsyncFunction[],
]
  ? RunPromisesInSeries<
      Rest,
      Awaited<ReturnType<First>>,
      readonly [
        ...Result,
        (param: Param) => Promise<Awaited<ReturnType<First>>>,
      ]
    >
  : Result

/**
 * Runs an array of promises in series.
 */
const runPromisesInSeries = <
  AnyAsyncFunctions extends readonly AnyAsyncFunction[],
>(
  promises: RunPromisesInSeries<AnyAsyncFunctions>,
) => {
  // promises.reduce(
  //   (anyPromises, next) => anyPromises.then(next),
  //   Promise.resolve(),
  // )
}
