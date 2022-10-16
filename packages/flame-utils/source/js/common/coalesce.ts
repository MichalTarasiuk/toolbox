import { nullish } from '../javascript'

import type { Any } from '@flame/typescript'

type Coalesce<Args extends Array<unknown>> = Args extends [
  infer Arg,
  ...infer RestArgs,
]
  ? Arg extends Any.Nullish
    ? Coalesce<RestArgs>
    : Arg
  : undefined

/**
 * Returns the first defined, non-null argument.
 */
export const coalesce = <Args extends unknown[]>(...args: Args) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
  args.find((arg) => !nullish(arg)) as Coalesce<Args>
