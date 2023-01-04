import {booleanToString, resolve} from '@tool/utils';
import React, {useMemo} from 'react';

import type {Resolvable} from '@tool/utils';
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

export const If = ({condition, children}: IfProps) => {
  const canWork = useMemo(() => {
    const Childrens = React.Children.toArray(children);

    return Object.values(Blocks).every(Block =>
      Childrens.some(Child => React.isValidElement(Child) && Child.type === Block),
    );
  }, [children]);

  if (!canWork) {
    throw Error('The <If> component should contain <Then /> and <Else /> components as its children');
  }

  const resolvedCondition = Boolean(resolve(condition));
  const Block = Blocks[booleanToString(resolvedCondition)];

  return (
    <>
      {React.Children.toArray(children)
        .filter(React.isValidElement)
        .find(reactElement => reactElement.type === Block) ?? null}
    </>
  );
};
