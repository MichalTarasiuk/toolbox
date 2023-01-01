/* eslint-disable react-hooks/exhaustive-deps */
import {useMemo} from 'react';

import {useLazyRef} from '../useLazyRef';

import {createCache} from './cache';

import type {DependencyList} from 'react';

export const useMemoCache = <State>(factory: () => State, dependencyList: DependencyList) => {
  const cacheRef = useLazyRef(() => createCache<State>());

  const memo = useMemo(() => {
    const cache = cacheRef.current;
    const cachedState = cache.get(dependencyList);

    if (!cache.isNone(cachedState)) {
      return cachedState;
    }

    const state = factory();

    cache.set(dependencyList, state);

    return state;
  }, dependencyList);

  return memo;
};
