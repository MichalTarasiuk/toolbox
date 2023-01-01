import {areHookInputsEqual} from '../../../_api';

import type {DependencyList} from 'react';

type None = typeof none;

const none = Symbol();

export const createCache = <State>() => {
  const cache: Array<[DependencyList, State]> = [];

  const get = (dependencyList: DependencyList) => {
    const cacheEntry = cache.find(([cachedDependencyList]) => areHookInputsEqual(cachedDependencyList, dependencyList));

    if (!cacheEntry) {
      return none;
    }

    const cachedState = cacheEntry[1];

    return cachedState;
  };

  const set = (dependencyList: DependencyList, state: State) => {
    cache.push([dependencyList, state]);
  };

  const isNone = (state: None | State): state is None => state === none;

  return {
    get,
    set,
    isNone,
  };
};
