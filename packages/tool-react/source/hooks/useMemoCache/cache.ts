import {areHookInputsEqual} from '../../../_api';

import type {DependencyList} from 'react';

const none = Symbol();

type None = typeof none;
type CachedItem<State> = {state: State; dependencyList: DependencyList};

export const createCache = <State>() => {
  const cache = new Map<string, Set<CachedItem<State>>>();

  const get = (dependencyList: DependencyList) => {
    const key = String(dependencyList);
    const cached = cache.get(key);

    if (!cached) {
      return none;
    }

    const cachedItem = [...cached.values()].find(item => areHookInputsEqual(item.dependencyList, dependencyList));

    if (cachedItem) {
      return cachedItem.state;
    }

    return none;
  };

  const set = (dependencyList: DependencyList, state: State) => {
    const key = String(dependencyList);

    const hasCachedItem = cache.has(key);

    if (!hasCachedItem) {
      cache.set(key, new Set());
    }

    const cachedItem = cache.get(key);

    if (cachedItem) {
      cachedItem.add({dependencyList, state});
    }
  };

  const isNone = (state: None | State): state is None => state === none;

  return {
    get,
    set,
    isNone,
  };
};
