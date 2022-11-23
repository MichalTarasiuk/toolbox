// import { entries, fromEntries } from '@tool/utils'

import {keyIn} from '../../../source';

import type {Any} from '@tool/typescript';

export const renameKeys = <AnyObject extends Any.AnyObject>(anyObject: AnyObject, keysMapper: Any.AnyObject) =>
  Object.fromEntries(
    Object.entries(anyObject).map(([key, value]) => [keyIn(keysMapper, key) ? keysMapper[key] : key, value]),
  );
