/* eslint-disable react-hooks/exhaustive-deps */
import {useMemo, useRef} from 'react';

import type {DependencyList} from 'react';

export const useMemoRef = <MemoValue>(factory: () => MemoValue, dependencyList: DependencyList) => {
  const memo = useMemo(factory, dependencyList);
  const ref = useRef<MemoValue>(memo);

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
