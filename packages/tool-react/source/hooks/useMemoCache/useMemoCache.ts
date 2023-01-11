/* eslint-disable react-hooks/exhaustive-deps */
import {useMemo} from 'react';

import {useSyncedRef, useLazyRef} from '../../source';

import {createMemoCache} from './cache';

import type {areHookInputsEqual} from '../../source';
import type {DependencyList} from 'react';

export const useMemoCache = <State>(
  factory: () => State,
  dependencyList: DependencyList,
  customAreHookInputsEqual?: typeof areHookInputsEqual,
) => {
  const syncedAreHookInputsEqual = useSyncedRef(customAreHookInputsEqual);
  const cacheRef = useLazyRef(() => createMemoCache<State>(syncedAreHookInputsEqual.current));

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
