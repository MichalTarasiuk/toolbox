import {type Any, type Custom} from '../source';

/**
 * IsKnowableObject type check that object has specified props.
 */
export type IsKnowableObject<Value extends Any.AnyObject> = Custom.Equals<keyof Value, PropertyKey> extends 0
  ? true
  : false;
