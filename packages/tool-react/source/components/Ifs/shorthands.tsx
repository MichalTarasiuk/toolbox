import {resolve} from '@tool/utils';

import type {Resolvable} from '@tool/utils';
import type {ReactNode} from 'react';

type BlockProps = {
  condition: Resolvable<unknown>;
  children: ReactNode;
};

export const When = ({condition, children}: BlockProps) => {
  const resolvedCondition = resolve(condition);

  return <>{!!resolvedCondition && children}</>;
};

export const Unless = ({condition, children}: BlockProps) => {
  const resolvedCondition = resolve(condition);

  return <>{!resolvedCondition && children}</>;
};
