import {isClient, isString} from '@tool/utils';

import type {AtomInitialize, Initialization} from '../types';

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
      (_get, set, nextLazyInitialization: Initialization<string>) => {
        const lazyInitialization: Initialization<string> = isString(nextLazyInitialization)
          ? () => nextLazyInitialization
          : nextLazyInitialization;

        lazyInitialization.get = (state: string) => {
          localStorage.setItem(key, state);
        };

        set(lazyInitialization);
      },
    );

    return atom;
  };
};
