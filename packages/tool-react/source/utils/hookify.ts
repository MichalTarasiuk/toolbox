import {type Any as AnyType, type Object as ObjectType} from '@tool/typescript';

type Hookify<AnyObject extends AnyType.AnyObject> = AnyObject & ObjectType.Values<AnyObject>;

export const hookify = <AnyObject extends AnyType.AnyObject>(anyObject: AnyObject) => {
  const values = Object.values(anyObject);

  return Object.assign(values, anyObject) as Hookify<AnyObject>;
};
