import {entries, fromEntries} from '../../../source';

import {type Any as AnyType, type Custom} from '@tool/typescript';

type RemovePrefix<Key extends PropertyKey, Prefix extends string> = Key extends `${Prefix}${infer Value}` ? Value : Key;

type FindAndRemoveWhen<AnyObject extends AnyType.AnyObject<unknown>, Prefix extends string> = {
  [Key in keyof AnyObject as RemovePrefix<Extract<keyof AnyObject, `${Prefix}${string}`>, Prefix>]: AnyObject[Key];
};

export const findAndRemoveWhen = <AnyObject extends AnyType.AnyObject<unknown>, Prefix extends string>(
  object: AnyObject,
  prefix: Prefix,
) =>
  fromEntries(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    entries(object, false).flatMap(([key, value]) => {
      const stringifyKey = key.toString();

      if (stringifyKey.startsWith(prefix)) {
        return [key, value] as const;
      }

      return [];
    }),
  ) as unknown as Custom.Debug<FindAndRemoveWhen<AnyObject, Prefix>>;
