import {keyIn, fromEntries, entries} from '../../../source';

import type {Any, Custom} from '@tool/typescript';

type RenameKeys<AnyObject extends Any.AnyObject, KeysMapper extends Any.AnyObject<PropertyKey>> = {
  [Key in keyof AnyObject as Key extends keyof KeysMapper ? KeysMapper[Key] : Key]: AnyObject[Key];
};

export const renameKeys = <AnyObject extends Any.AnyObject, KeysMapper extends Any.AnyObject<PropertyKey>>(
  anyObject: AnyObject,
  keysMapper: Custom.Narrow<KeysMapper>,
) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- narrow down
  fromEntries(
    // @ts-ignore
    entries(anyObject, false).map(([key, value]) => [keyIn(keysMapper, key) ? keysMapper[key] : key, value] as const),
  ) as Custom.Debug<RenameKeys<AnyObject, KeysMapper>>;
