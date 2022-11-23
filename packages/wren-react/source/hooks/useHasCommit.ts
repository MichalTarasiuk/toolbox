import {useCallback, useRef} from 'react';

import {useLayout} from './hooks';

/**
 * Returned function yields `true` only in case component is commited (useLayoutEffect call).
 *
 * @returns function that yields current mount state
 */
export const useHasCommit = () => {
  const hasCommit = useRef(false);
  const get = useCallback(() => hasCommit.current, []);

  useLayout(() => {
    hasCommit.current = true;

    return () => {
      hasCommit.current = false;
    };
  }, []);

  return get;
};
