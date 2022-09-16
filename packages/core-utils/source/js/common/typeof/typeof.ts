// @TODO: move all types to core-typescript

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

export const isUndefined = (operand: unknown) =>
  inferType(operand) === 'undefined'

export const isNull = (operand: unknown) => inferType(operand) === 'null'

// typeof:functions

export const isFunction = (operand: unknown) =>
  inferType(operand) === 'function'

type AnyGeneratorFunction = (...args: any[]) => Generator<unknown, any, unknown>
export const isGeneratorFunction = (
  operand: unknown,
): operand is AnyGeneratorFunction =>
  inferType(operand, true) === 'generatorfunction'

type AnyAsyncFunction = (...args: any[]) => Promise<unknown>
export const isAsyncFunction = (
  operand: unknown,
): operand is AnyAsyncFunction => inferType(operand, true) === 'asyncfunction'

// typeof:objects

type AnyObject = Record<PropertyKey, unknown>
export const isObject = (operand: unknown): operand is AnyObject =>
  inferType(operand, true) === 'object'

type AnyArray = Array<unknown>
export const isArray = (operand: unknown): operand is AnyArray =>
  inferType(operand, true) === 'array'

export const isRegExp = (operand: unknown): operand is RegExp =>
  inferType(operand, true) === 'regexp'

type AnyPromise = Promise<unknown>
export const isPromise = (operand: unknown): operand is AnyPromise =>
  inferType(operand, true) === 'promise'

type AnyMap = Map<unknown, unknown>
export const isMap = (operand: unknown): operand is AnyMap =>
  inferType(operand, true) === 'map'

type AnySet = Set<unknown>
export const isSet = (operand: unknown): operand is AnySet =>
  inferType(operand, true) === 'set'

type AnyWeakMap = WeakMap<AnyObject, unknown>
export const isWeakMap = (operand: unknown): operand is AnyWeakMap =>
  inferType(operand, true) === 'weakmap'

type AnyWeakSet = WeakSet<AnyObject>
export const isWeakSet = (operand: unknown): operand is AnyWeakSet =>
  inferType(operand, true) === 'weakset'

export const isDate = (operand: unknown): operand is Date =>
  inferType(operand, true) === 'date'

export const isError = (operand: unknown): operand is Error =>
  inferType(operand, true) === 'error'
