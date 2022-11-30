import type {Any, Custom} from '../source';

export type IsKnowableObject<Value extends Any.AnyObject> = Custom.Equals<keyof Value, PropertyKey> extends 0
  ? true
  : false;
