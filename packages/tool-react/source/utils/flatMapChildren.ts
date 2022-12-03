import {isNumber, isObject, isString, keyIn, signs} from '@tool/utils';
import {Children, cloneElement} from 'react';
import ReactIs from 'react-is';

import type {ReactNode, Key, ReactElement} from 'react';

const hasChildren = (props: unknown): props is {children: ReactNode} => isObject(props) && keyIn(props, 'children');

const isElement = ReactIs.isElement;
const isFragment = (reactNode: ReactNode): reactNode is ReactElement =>
  ReactIs.isFragment(reactNode) && hasChildren(reactNode.props);

export const flatMapChildren = (children: ReactNode, keys: Key[] = []) => {
  return Children.toArray(children).reduce<ReactNode[]>((collector, reactNode, index) => {
    if (isFragment(reactNode)) {
      collector.push(...flatMapChildren(reactNode.props.children, keys.concat(reactNode.key ?? index)));

      return collector;
    }

    if (isElement(reactNode)) {
      const key = keys.join(signs.dot) + String(reactNode.key);

      collector.push(
        cloneElement(reactNode, {
          key,
        }),
      );

      return collector;
    }

    if (isString(reactNode) || isNumber(reactNode)) {
      collector.push(reactNode);

      return collector;
    }

    return collector;
  }, []);
};
