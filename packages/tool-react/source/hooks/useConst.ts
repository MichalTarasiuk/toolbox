import {resolve} from '@tool/utils';
import {useState} from 'react';

export const useConst = <State>(resolveableState: State | (() => State)) => {
  const [state] = useState(() => {
    const resolvedState = resolve(resolveableState);

    return Object.freeze(resolvedState);
  });

  return state;
};
