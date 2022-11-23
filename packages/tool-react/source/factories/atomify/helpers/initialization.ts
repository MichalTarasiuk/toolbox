import {isFunction} from '@tool/utils';

import type {Get, Initialization, LazyInitialization} from '../types';
import type {Any} from '@tool/typescript';

const canResolvInitialization = <State>(
  initialization: Initialization<State>,
): initialization is LazyInitialization<State> => isFunction(initialization);

export const initialize = <State>(initialization: Initialization<State>, get: Get, lifecycle: {before: Any.Noop}) => {
  lifecycle.before();

  if (canResolvInitialization(initialization)) {
    const state = initialization(get);

    initialization.get?.(state);

    return state;
  }

  return initialization;
};
