import {isClient, resolve} from '@tool/utils';

import type {Resolvable} from '@tool/utils';
import type {AtomInitialize, Initialization} from '../types';

export const createAtomWithStorage = (atomInitialize: AtomInitialize) => {
  return (key: string, state: string) => {
    const atom = atomInitialize(
      () => {
        if (isClient()) {
          localStorage.setItem(key, state);

          return localStorage.getItem(key) ?? state;
        }

        return state;
      },
      (handler, resolvableState: Resolvable<string, [string]>) => {
        const resolvedState = resolve(resolvableState, handler.state);
        const lazyInitialization: Initialization<string> = () => resolvedState;

        lazyInitialization.get = (nextState: string) => {
          localStorage.setItem(key, nextState);
        };

        handler.set(lazyInitialization);
      },
    );

    return atom;
  };
};
