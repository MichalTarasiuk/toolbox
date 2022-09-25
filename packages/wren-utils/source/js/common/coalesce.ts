import { nullish } from '../javascript'

type Coalesce<Args extends Array<unknown>> = Args extends [
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
export const coalesce = <Args extends unknown[]>(...args: Args) =>
  args.find((arg) => !nullish(arg)) as Coalesce<Args>