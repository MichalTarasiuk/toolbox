import {areHookInputsEqual} from '../../../_api';

import type {DependencyList} from 'react';

type None = typeof none;
type CachedItem<State> = {state: State; dependencyList: DependencyList};

const none = Symbol();

export const createCache = <State>() => {
  const cache = new Map<string, Array<CachedItem<State>>>();

  const get = (dependencyList: DependencyList) => {
    const key = String(dependencyList);
    const cached = cache.get(key);

    if (!cached) {
      return none;
    }

    const cachedItem = cached.find(item => areHookInputsEqual(item.dependencyList, dependencyList));

    if (cachedItem) {
      return cachedItem.state;
    }

    return none;
  };

  const set = (dependencyList: DependencyList, state: State) => {
    const key = String(dependencyList);

    const hasCachedItem = cache.has(key);

    if (!hasCachedItem) {
      cache.set(key, []);
    }

    const cachedItem = cache.get(key);

    if (cachedItem) {
      cachedItem.push({dependencyList, state});
    }
  };

  const isNone = (state: None | State): state is None => state === none;

  return {
    get,
    set,
    isNone,
  };
};
