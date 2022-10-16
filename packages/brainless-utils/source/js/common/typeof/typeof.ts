import { inferType } from './inferType'

import type { Any } from '@brainless/typescript'

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

export const isFunction = (operand: unknown): operand is Any.AnyFunction =>
  inferType(operand) === 'function'

export const isGeneratorFunction = (
  operand: unknown,
): operand is Any.AnyGeneratorFunction =>
  inferType(operand, true) === 'generatorfunction'

export const isAsyncFunction = (
  operand: unknown,
): operand is Any.AnyAsyncFunction =>
  inferType(operand, true) === 'asyncfunction'

// typeof:objects

export const isObject = (operand: unknown): operand is Any.AnyObject =>
  inferType(operand, true) === 'object'

export const isArray = (operand: unknown): operand is Any.AnyArray =>
  inferType(operand, true) === 'array'

export const isRegExp = (operand: unknown): operand is RegExp =>
  inferType(operand, true) === 'regexp'

export const isPromise = (operand: unknown): operand is Any.AnyPromise =>
  inferType(operand, true) === 'promise'

export const isMap = (operand: unknown): operand is Any.AnyMap =>
  inferType(operand, true) === 'map'

export const isSet = (operand: unknown): operand is Any.AnySet =>
  inferType(operand, true) === 'set'

export const isWeakMap = (operand: unknown): operand is Any.AnyWeakMap =>
  inferType(operand, true) === 'weakmap'

export const isWeakSet = (operand: unknown): operand is Any.AnyWeakSet =>
  inferType(operand, true) === 'weakset'

export const isDate = (operand: unknown): operand is Date =>
  inferType(operand, true) === 'date'

export const isError = (operand: unknown): operand is Error =>
  inferType(operand, true) === 'error'
