/* eslint-disable @typescript-eslint/no-unused-vars */
import type {Custom} from '@tool/typescript';

/**
 * Assert the parameter is of a specific type.
 */
export const expectType = <Type>(_: Type): void => undefined;

/**
 * Assert the parameter is not typed as `any`
 */
export const expectTypeNotAny = <Type>(_: Custom.IsAny<Type> extends true ? never : Type): void => undefined;

/**
 * Assert the parameter is not typed as `any`
 */
export const expectNever = (_: never): void => undefined;
