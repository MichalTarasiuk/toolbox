/* eslint-disable react-hooks/exhaustive-deps */
import {useMemo, useRef} from 'react';

import type {DependencyList} from 'react';

export const useMemoRef = <MemoValue>(factory: () => MemoValue, dependencyList: DependencyList) => {
  const ref = useRef<MemoValue | null>(null);
  const memo = useMemo(factory, dependencyList);

  ref.current = memo;

  return useMemo(
    () =>
      Object.freeze({
        get current() {
          return ref.current;
        },
      }),
    [],
  );
};
