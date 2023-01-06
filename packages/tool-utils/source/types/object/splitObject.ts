import {objectKeys} from '@tool/utils';

import type {Any, Custom} from '@tool/typescript';

type InferFirstPart<AnyObject extends Any.AnyObject, Separator> = {
  [Key in keyof AnyObject as AnyObject[Key] extends Separator ? never : Key]: AnyObject[Key];
};

type ShouldSkip = typeof shouldSkip;

const shouldSkip = Symbol();

const canSkip = (value: unknown): value is typeof shouldSkip => value === shouldSkip;

export const splitObject = <
  AnyObject extends Any.AnyObject,
  Separator,
  FirstPart = Custom.Debug<InferFirstPart<AnyObject, Separator>>,
>(
  anyObject: AnyObject,
  fn: (key: keyof AnyObject, value: unknown, shouldSkip: ShouldSkip) => Separator | ShouldSkip,
) =>
  objectKeys(anyObject).reduce(
    (collector, key) => {
      const result = fn(key, anyObject[key], shouldSkip);

      if (canSkip(result)) {
        const nextObject = {...collector[0], [key]: anyObject[key]};

        return [nextObject, collector[1]] as const;
      }

      const nextObject = {...collector[1], [key]: result};

      return [collector[0], nextObject] as const;
    },
    [{} as FirstPart, {} as Custom.Debug<Omit<Any.AnyObject<Separator, keyof AnyObject>, keyof FirstPart>>] as const,
  );
