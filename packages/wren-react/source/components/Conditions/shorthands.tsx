import {resolve} from './helpers';

import type {Resolvable} from './helpers';
import type {ReactNode} from 'react';

type Props = {
  condition: Resolvable<unknown>;
  children: ReactNode;
};

export const When = ({condition, children}: Props) => {
  const resolvedCondition = resolve(condition);

  return <>{!!resolvedCondition && children}</>;
};

export const Unless = ({condition, children}: Props) => {
  const resolvedCondition = resolve(condition);

  return <>{!resolvedCondition && children}</>;
};
