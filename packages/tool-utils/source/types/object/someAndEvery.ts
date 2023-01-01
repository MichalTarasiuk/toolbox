/* eslint-disable @typescript-eslint/ban-ts-comment */
import {keyIn, objectKeys} from '../../source';

import type {Any} from '@tool/typescript';

type InferAssertions<AnyObject extends Any.AnyObject> = Partial<{
  [Key in keyof AnyObject]: (value: AnyObject[Key]) => boolean;
}>;

const createObjectAssertion =
  (type: 'every' | 'some') =>
  <AnyObject extends Any.AnyObject, Assertions extends InferAssertions<AnyObject>>(
    anyObject: AnyObject,
    assertions: Assertions,
  ) => {
    const tuple = objectKeys(assertions);

    return tuple[type](assertionKey => {
      const assertion = assertions[assertionKey];

      if (keyIn(anyObject, assertionKey) && assertion) {
        const value = anyObject[assertionKey];

        // @ts-ignore
        return assertion(value);
      }

      return false;
    });
  };

export const every = createObjectAssertion('every');
export const some = createObjectAssertion('some');
