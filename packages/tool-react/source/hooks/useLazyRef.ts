/* eslint-disable @typescript-eslint/consistent-type-assertions -- typescript can't infer return type of unknwon function */
import {isObject, keyIn} from '@tool/utils';
import {useRef} from 'react';

import {objectIs} from '../../_api';

import type {MutableRefObject} from 'react';

const canInitialize = Symbol();

const canWork = <Current, Initial extends symbol>(
  ref: MutableRefObject<Current>,
  initial: Initial,
): ref is {current: Exclude<Current, Initial>} =>
  isObject(ref) && keyIn(ref, 'current') && !objectIs(ref.current, initial);

export const useLazyRef = <LazyInitialize extends () => unknown>(lazyInitialize: LazyInitialize) => {
  const ref = useRef<ReturnType<LazyInitialize> | typeof canInitialize>(canInitialize);

  if (ref.current === canInitialize) {
    ref.current = lazyInitialize() as ReturnType<LazyInitialize>;
  }

  if (canWork(ref, canInitialize)) {
    return ref;
  }

  throw Error('something went wrong');
};
