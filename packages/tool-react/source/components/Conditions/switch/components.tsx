import {resolve} from '@tool/utils';

import type {CaseProps, DefaultProps} from './types';

export const Case = ({children, condition}: CaseProps) => {
  const resolvedCondition = Boolean(resolve(condition));

  return <>{resolvedCondition && children}</>;
};
export const Default = ({children}: DefaultProps) => <>{children}</>;
