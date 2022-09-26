import { nullish } from '../javascript'

type Coalesce<Args extends ReadonlyArray<unknown>> = Args extends readonly [
  infer Arg,
  ...infer RestArgs,
]
  ? Arg extends Nullish
    ? Coalesce<RestArgs>
    : Arg
  : undefined

/**
 * Returns the first defined, non-null argument.
 */
export const coalesce = <Args extends readonly unknown[]>(...args: Args) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
  args.find((arg) => !nullish(arg)) as Coalesce<Args>
