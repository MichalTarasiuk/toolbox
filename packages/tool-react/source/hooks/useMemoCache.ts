/* eslint-disable react-hooks/exhaustive-deps */
import {useMemo} from 'react';
import {errorWhen} from '@tool/utils';

import {useLazyRef} from './useLazyRef';

import type {DependencyList} from 'react';

export const useMemoCache = <State>(factory: () => State, dependencyList: DependencyList) => {
  const cacheRef = useLazyRef(() => new Map<DependencyList, State>());

  const memo = useMemo(() => {
    const cache = cacheRef.current;

    if (cache.has(dependencyList)) {
      const cachedState = cache.get(dependencyList);

      errorWhen(cachedState, 'No cached state');

      return cachedState;
    }

    const state = factory();

    return state;
  }, dependencyList);

  return memo;
};
