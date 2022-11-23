import React, {useId, useMemo} from 'react';

import {useFiberProvider, traverseFiber} from '../source';

import type {Fiber} from 'react-reconciler';

type ReactInternal = {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: React.RefObject<Fiber>;
  };
};

type State = {memoizedState: unknown; next: State};

const {ReactCurrentOwner} =
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- expose React props
  (React as unknown as ReactInternal).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

/**
 * Returns the current react-internal {@link Fiber}. This is an implementation detail of [react-reconciler](https://github.com/facebook/react/tree/main/packages/react-reconciler).
 */
export const useFiber = () => {
  const root = useFiberProvider();

  // In development mode, React will expose the current component's Fiber as ReactCurrentOwner.
  // In production, we don't have this luxury and must traverse from FiberProvider via useId
  const id = useId();
  const fiber = useMemo(
    () =>
      ReactCurrentOwner.current ??
      traverseFiber<null>(root, false, node => {
        let state: State = node.memoizedState;
        // eslint-disable-next-line functional/no-loop-statement -- if match, return
        while (state) {
          if (state.memoizedState === id) {
            return true;
          }

          state = state.next;
        }

        return false;
      }),
    [root, id],
  );

  return fiber;
};
