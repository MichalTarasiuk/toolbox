/**
 * Assert the parameter is of a specific type.
 */
export const expectType = <Type>(_: Type): void => undefined

type IsAny<Type> = 0 extends 1 & Type ? true : false

/**
 * Assert the parameter is not typed as `any`
 */
export const expectTypeNotAny = <Type>(
  _: IsAny<Type> extends true ? never : Type,
): void => undefined
