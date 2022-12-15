import {useCallback, useState} from 'react';
import {produce} from 'immer';
import {isFunction} from '@tool/utils';

import type {Draft} from 'immer';

type ResolveableState<State> = (draft: Draft<State>) => void;
type MaybeResolvableState<State> = ResolveableState<State> | State;

const isResolveable = <State>(
  resolvableState: MaybeResolvableState<State>,
): resolvableState is ResolveableState<State> => isFunction(resolvableState);

const resolve = <State>(resolvableState: MaybeResolvableState<State>, state: State) => {
  if (isResolveable(resolvableState)) {
    const resolvedState = produce(state, resolvableState);

    return resolvedState;
  }

  return resolvableState;
};

export const useImmerState = <State>(initial: State) => {
  const [state, setStateImpl] = useState(initial);

  const setState = useCallback((maybeResolvableState: MaybeResolvableState<State>) => {
    setStateImpl(currentState => {
      const resolvedState = resolve(maybeResolvableState, currentState);

      return resolvedState;
    });
  }, []);

  return [state, setState] as const;
};
