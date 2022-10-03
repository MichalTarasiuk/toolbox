import { inferType } from './inferType'

// typeof:primitives

export const isString = (operand: unknown): operand is string =>
	inferType(operand) === 'string'

export const isNumber = (operand: unknown): operand is number =>
	inferType(operand) === 'number'

export const isBoolean = (operand: unknown): operand is boolean =>
	inferType(operand) === 'boolean'

export const isSymbol = (operand: unknown): operand is symbol =>
	inferType(operand) === 'symbol'

export const isBigInt = (operand: unknown): operand is bigint =>
	inferType(operand) === 'bigint'

export const isUndefined = (operand: unknown): operand is undefined =>
	inferType(operand) === 'undefined'

export const isNull = (operand: unknown): operand is null =>
	inferType(operand) === 'null'

// typeof:functions

export const isFunction = (operand: unknown): operand is AnyFunction =>
	inferType(operand) === 'function'

export const isGeneratorFunction = (
	operand: unknown,
): operand is AnyGeneratorFunction =>
	inferType(operand, true) === 'generatorfunction'

export const isAsyncFunction = (
	operand: unknown,
): operand is AnyAsyncFunction => inferType(operand, true) === 'asyncfunction'

// typeof:objects

export const isObject = (operand: unknown): operand is AnyObject =>
	inferType(operand, true) === 'object'

export const isArray = (operand: unknown): operand is AnyArray =>
	inferType(operand, true) === 'array'

export const isRegExp = (operand: unknown): operand is RegExp =>
	inferType(operand, true) === 'regexp'

export const isPromise = (operand: unknown): operand is AnyPromise =>
	inferType(operand, true) === 'promise'

export const isMap = (operand: unknown): operand is AnyMap =>
	inferType(operand, true) === 'map'

export const isSet = (operand: unknown): operand is AnySet =>
	inferType(operand, true) === 'set'

export const isWeakMap = (operand: unknown): operand is AnyWeakMap =>
	inferType(operand, true) === 'weakmap'

export const isWeakSet = (operand: unknown): operand is AnyWeakSet =>
	inferType(operand, true) === 'weakset'

export const isDate = (operand: unknown): operand is Date =>
	inferType(operand, true) === 'date'

export const isError = (operand: unknown): operand is Error =>
	inferType(operand, true) === 'error'
