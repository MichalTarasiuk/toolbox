import {isFunction} from '../../../source';

import type {Any} from '@tool/typescript';

export type Resolvable<Resolved> = (() => Resolved) | Resolved;

const isResolvable = <Resolved>(value: unknown): value is Extract<Resolvable<Resolved>, Any.AnyFunction> =>
  isFunction(value);

export const resolve = <Resolved>(resolvable: Resolvable<Resolved>) => {
  if (isResolvable(resolvable)) {
    return resolvable();
  }

  return resolvable;
};
