import {isNumber, isObject, isString, keyIn, signs} from '@tool/utils';
import {Children, cloneElement} from 'react';
import ReactIs from 'react-is';

import type {ReactNode, Key, ReactElement} from 'react';

const hasChildren = (props: unknown): props is {children: ReactNode} => isObject(props) && keyIn(props, 'children');

const isTag = (reactNode: ReactNode): reactNode is ReactElement =>
  ReactIs.isElement(reactNode) && !ReactIs.isFragment(reactNode);

export const flatMapChildren = (children: ReactNode, keys: Array<Key> = []) => {
  return Children.toArray(children).reduce<ReactNode[]>((collector, reactNode, index) => {
    if (isTag(reactNode)) {
      const key = keys.join(signs.dot) + String(reactNode.key);

      collector.push(
        cloneElement(reactNode, {
          key,
        }),
      );
    }

    if (ReactIs.isFragment(reactNode) && hasChildren(reactNode.props)) {
      collector.push(...flatMapChildren(reactNode.props.children, keys.concat(reactNode.key ?? index)));
    }

    if (isString(reactNode) || isNumber(reactNode)) {
      collector.push(reactNode);
    }

    return collector;
  }, []);
};
