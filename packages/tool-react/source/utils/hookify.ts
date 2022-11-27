import type {Any as AnyType, Object as ObjectType} from '@tool/typescript';

type Hookify<AnyObject extends AnyType.AnyObject> = ObjectType.Values<AnyObject> & AnyObject;

export const hookify = <AnyObject extends AnyType.AnyObject>(anyObject: AnyObject) => {
  const values = Object.values(anyObject);

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- narrow down type
  return Object.assign(values, anyObject) as unknown as Hookify<AnyObject>;
};
