import type {Resolvable} from '@tool/utils';
import type {ReactNode} from 'react';
import type React from 'react';

export type Childrens = ReturnType<typeof React['Children']['toArray']>;

export type SwitchProps = {
  children: ReactNode;
};

export type CaseProps = {
  children: ReactNode;
  shouldBreak?: boolean;
  condition: Resolvable<unknown>;
};

export type DefaultProps = {
  children: ReactNode;
  shouldBreak?: boolean;
};
