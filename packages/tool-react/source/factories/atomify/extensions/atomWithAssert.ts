import {resolve} from '@tool/utils';

import type {AtomInitialize, Initialization, ResolvableState} from '../types';

export const createAtomWithAssert = (atomInitialize: AtomInitialize) => {
  return <State>(initialization: Initialization<State>, assert: (state: State) => boolean) => {
    const atom = atomInitialize(initialization, (handler, resolvableState: ResolvableState<State>) => {
      const resolvedState = resolve(resolvableState, handler.state);

      if (assert(resolvedState)) {
        handler.set(resolvedState);
      }
    });

    return atom;
  };
};
