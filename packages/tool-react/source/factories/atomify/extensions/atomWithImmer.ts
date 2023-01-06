import {produce} from 'immer';

import type {Draft} from 'immer';
import type {AtomInitialize, Initialization} from '../types';

export const createAtomWithImmer = (atomInitialize: AtomInitialize) => {
  return <State>(initialization: Initialization<State>) => {
    const atom = atomInitialize(initialization, (handler, recipe: (draft: Draft<State>) => void) => {
      const nextState = produce(handler.state, recipe);

      handler.set(nextState);
    });

    return atom;
  };
};
