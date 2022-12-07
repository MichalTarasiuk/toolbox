import {isFunction} from '../../source';

import type {Any} from '@tool/typescript';

export type Resolvable<Resolved, Params extends unknown[] = never[]> = Resolved | ((...params: Params) => Resolved);

const isResolvable = <Resolved, Params extends unknown[]>(
  value: unknown,
): value is Extract<Resolvable<Resolved, Params>, Any.AnyFunction> => isFunction(value);

export const resolve = <Resolved, Params extends unknown[]>(
  resolvable: Resolvable<Resolved, Params>,
  ...params: Params
) => {
  if (isResolvable(resolvable)) {
    return resolvable(...params) as Resolved;
  }

  return resolvable as Resolved;
};
