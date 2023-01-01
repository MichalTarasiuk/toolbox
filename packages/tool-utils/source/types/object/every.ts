/* eslint-disable @typescript-eslint/ban-ts-comment */
import {keyIn, objectKeys} from '../../source';

import type {Any} from '@tool/typescript';

type InferAssertions<AnyObject extends Any.AnyObject> = Partial<{
  [Key in keyof AnyObject]: (value: AnyObject[Key]) => boolean;
}>;

export const every = <AnyObject extends Any.AnyObject, Assertions extends InferAssertions<AnyObject>>(
  anyObject: AnyObject,
  assertions: Assertions,
) =>
  objectKeys(assertions).every(assertionKey => {
    const assertion = assertions[assertionKey];

    if (keyIn(anyObject, assertionKey) && assertion) {
      const value = anyObject[assertionKey];

      // @ts-ignore
      return assertion(value);
    }

    return false;
  });
