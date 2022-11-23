import React from 'react';

import {isReactElement, resolve} from './helpers';

import type {Resolvable} from './helpers';
import type {ReactNode} from 'react';

type IfProps = {
  condition: Resolvable<unknown>;
  children: ReactNode;
};

type BlockProps = {
  children: ReactNode;
};

export const Then = ({children}: BlockProps) => <>{children}</>;
export const Else = ({children}: BlockProps) => <>{children}</>;

const Blocks = {
  true: Then,
  false: Else,
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- narrow down type
const booleanToString = (bool: boolean) => bool.toString() as 'true' | 'false';

export const If = ({condition, children}: IfProps) => {
  const resolvedCondition = Boolean(resolve(condition));

  const Childrens = React.Children.toArray(children);
  const canWork = Object.values(Blocks).every(Block =>
    Childrens.some(Child => isReactElement(Child) && Child.type === Block),
  );

  if (!canWork) {
    throw Error('The <If> component should contain <Then /> and <Else /> components as its children');
  }

  const Block = Blocks[booleanToString(resolvedCondition)];

  return (
    <>
      {React.Children.toArray(children)
        .filter(isReactElement)
        .find(reactElement => reactElement.type === Block) ?? null}
    </>
  );
};
