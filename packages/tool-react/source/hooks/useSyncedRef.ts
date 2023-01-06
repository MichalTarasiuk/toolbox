import {useMemo, useRef} from 'react';

/**
 * Like `useRef`, but it returns immutable ref that contains actual value.
 */
export const useSyncedRef = <Value>(value: Value) => {
  const ref = useRef(value);

  ref.current = value;

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
