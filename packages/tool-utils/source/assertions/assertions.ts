export * from './nullish';
export * from './typeof/typeof';
export * from './isClient';
export * from './boolean';
export * from './expect';
export * from './string';
export * from './object';
export * from './runtime/runtime';

import type {Any} from '@tool/typescript';

/**
 * Checks if the passed value is primitive or not.
 */
export const isPrimitive = (value: unknown): value is Any.Primitive => Object(value) !== value;

/**
 * Checks if the passed value is truthy or not.
 */
export const isTruthy = <Value>(value: Value): value is Exclude<Value, Any.FalsyValues> => Boolean(value);

/**
 * Checks if the passed value is JSON or not.
 */
export const isJSON = (value: unknown): value is Any.AnyObject<unknown, string> => {
  try {
    JSON.parse(JSON.stringify(value));

    return true;
  } catch (error) {
    return false;
  }
};

export const isPropertyKey = (value: unknown) => {
  const type = typeof value;

  return ['string', 'number', 'symbol'].includes(type);
};

export function errorWhen(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw Error(message);
  }
}
