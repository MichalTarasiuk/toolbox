import {keyIn, resolve} from '@tool/utils';

import {Case, Default} from './components';

import type {ReactElement} from 'react';

export const isTruthy = (reactElement: ReactElement) => {
  if (reactElement.type === Case) {
    return keyIn(reactElement.props, 'condition') && resolve(reactElement.props['condition']);
  }

  return true;
};

export const isDefault = (reactElement: ReactElement) => reactElement.type === Default;
export const isCase = (reactElement: ReactElement) => reactElement.type === Case;
