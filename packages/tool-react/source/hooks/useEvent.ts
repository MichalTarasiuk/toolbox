import {useCallback, useRef} from 'react';

import {useLayout} from './useLayout';

import {type Any} from '@tool/typescript';

/**
 * Issue: https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
 */
export const useEvent = <Fn extends Any.AnyFunction>(fn: Fn) => {
  const savedFn = useRef(fn);

  useLayout(() => {
    savedFn.current = fn;
  });

  return useCallback((...params: Parameters<typeof fn>) => {
    return savedFn.current(...params) as ReturnType<Fn>;
  }, []);
};
