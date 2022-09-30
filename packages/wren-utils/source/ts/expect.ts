/**
 * Assert the parameter is of a specific type.
 */
export const expectType = <Type>(_: Type): void => undefined

/**
 * Assert the parameter is not typed as `any`
 */
export const expectTypeNotAny = <Type>(
	_: IsAny<Type> extends true ? never : Type,
): void => undefined
