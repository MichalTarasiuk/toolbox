import {isFunction, resolve} from '@tool/utils';

import type {AtomInitialize, Initialization, LazyInitialization, ResolvableState} from '../types';

const isLazyInitialization = <State>(
  initialization: Initialization<State>,
): initialization is LazyInitialization<State> => isFunction(initialization);

export const createAtomWithPrevious = (atomInitialize: AtomInitialize) => {
  return <State>(initialization: Initialization<State>) => {
    const wrappedInitialization = (...params: Parameters<LazyInitialization<State>>) => {
      const previous = undefined as State | undefined;

      if (isLazyInitialization(initialization)) {
        return {
          previous,
          current: initialization(...params),
        };
      }

      return {
        previous,
        current: initialization,
      };
    };

    const atom = atomInitialize(wrappedInitialization, (handler, resolvableState: ResolvableState<State>) => {
      const state = handler.state.current;
      const resolvedState = resolve(resolvableState, state);

      handler.set({previous: state, current: resolvedState});
    });

    return atom;
  };
};
