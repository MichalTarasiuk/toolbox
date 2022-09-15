import { inferType } from './inferType'

// Primitives

export const isString = (operand: unknown): operand is string =>
  inferType(operand) === 'string'

export const isNumber = (operand: unknown): operand is number =>
  inferType(operand) === 'number'

export const isBoolean = (operand: unknown): operand is boolean =>
  inferType(operand) === 'number'

export const isSymbol = (operand: unknown): operand is Symbol =>
  inferType(operand) === 'symbol'

export const isBigInt = (operand: unknown): operand is BigInt =>
  inferType(operand) === 'bigInt'

// Functions

export const isFunction = (operand: unknown) =>
  inferType(operand) === 'function'

export const isGeneratorFunction = (operand: unknown) =>
  inferType(operand) === 'generatorFunction'

export const isAsyncFunction = (operand: unknown) =>
  inferType(operand) === 'asyncFunction'

// Objects

export const isObject = (
  operand: unknown,
): operand is Record<PropertyKey, string> => inferType(operand) === 'object'

export const isArray = (operand: unknown): operand is Array<unknown> =>
  inferType(operand) === 'array'

export const isRegExp = (operand: unknown) => inferType(operand) === 'regExp'

export const isPromise = (operand: unknown) => inferType(operand) === 'promise'

// Classes

export const isMap = (operand: unknown) => inferType(operand) === 'map'

export const isSet = (operand: unknown) => inferType(operand) === 'set'

export const isWeakMap = (operand: unknown) => inferType(operand) === 'weakMap'

export const isWeakSet = (operand: unknown) => inferType(operand) === 'weakSet'

export const isDate = (operand: unknown) => inferType(operand) === 'date'

export const isProxy = (operand: unknown) => inferType(operand) === 'proxy'

export const isError = (operand: unknown) => inferType(operand) === 'error'

export const isMath = (operand: unknown) => inferType(operand) === 'math'
