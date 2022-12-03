import {isClient, isString} from '@tool/utils';

import {type AtomInitialize, type LazyInitialization} from '../types';

export const createAtomWithStorage = (atomInitialize: AtomInitialize) => {
  return <State extends string>(key: string, state: State) => {
    const atom = atomInitialize(
      () => {
        if (isClient()) {
          localStorage.setItem(key, state);

          return localStorage.getItem(key) ?? state;
        }

        return state;
      },
      (_get, set, nextInitialization) => {
        if (!nextInitialization) {
          return;
        }

        const lazyInitialization: LazyInitialization<string> = isString(nextInitialization)
          ? () => nextInitialization
          : nextInitialization;

        lazyInitialization.get = (nextState: string) => {
          localStorage.setItem(key, nextState);
        };

        set(lazyInitialization);
      },
    );

    return atom;
  };
};
