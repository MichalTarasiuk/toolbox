import {resolve} from '@tool/utils';

import type {Resolvable} from '@tool/utils';
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
