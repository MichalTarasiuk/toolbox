import {isArray} from '../../../source';

import {type Any} from '@tool/typescript';

type ToArray<Value> = Value extends Any.AnyArray ? Value : [Value];

/**
 * Casts the provided value as an array if it's not one.
 */
export const toArray = <Value>(value: Value) => (isArray(value) ? value : [value]) as ToArray<Value>;
