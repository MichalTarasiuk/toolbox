import type {ReactNode} from 'react';
import type React from 'react';
import type {Resolvable} from '@tool/utils';

export type Childrens = ReturnType<(typeof React)['Children']['toArray']>;

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
