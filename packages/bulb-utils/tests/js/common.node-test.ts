import {
  nullish,
  isString,
  isNumber,
  isBoolean,
  isSymbol,
  isBigInt,
  isUndefined,
  isNull,
  isFunction,
  isGeneratorFunction,
  isAsyncFunction,
  isObject,
  isArray,
  isRegExp,
  isPromise,
  isMap,
  isWeakMap,
  isSet,
  isWeakSet,
  isDate,
  isError,
  coalesce,
  isPrimitive,
} from '../../source/js/common/common'

describe('node - js:typeof', () => {
  test('js:common:typeof:primitives', () => {
    // isString
    expect(isString('Hello World')).toBeTruthy()
    expect(isString(100)).toBeFalsy()

    // isNumber
    expect(isNumber(100)).toBeTruthy()
    expect(isNumber('Hello World')).toBeFalsy()

    // isBoolean
    expect(isBoolean(true)).toBeTruthy()
    expect(isBoolean(0)).toBeFalsy()

    // isSymbol
    expect(isSymbol(Symbol('description'))).toBeTruthy()
    expect(isSymbol('description')).toBeFalsy()

    // isBigInt
    expect(isBigInt(BigInt(9007199254740991))).toBeTruthy()
    expect(isBigInt(9007199254740991)).toBeFalsy()

    // isUndefined
    expect(isUndefined(undefined)).toBeTruthy()
    expect(isUndefined(null)).toBeFalsy()

    // isNull
    expect(isNull(null)).toBeTruthy()
    expect(isNull(undefined)).toBeFalsy()
  })

  test('js:common:typeof:functions', () => {
    // isFunction
    expect(isFunction(() => {})).toBeTruthy()
    expect(isFunction({})).toBeFalsy()

    // isGeneratorFunction
    expect(isGeneratorFunction(function* () {})).toBeTruthy()
    expect(isGeneratorFunction({})).toBeFalsy()

    // isAsyncFunction
    expect(isAsyncFunction(async () => {})).toBeTruthy()
    expect(isAsyncFunction({})).toBeFalsy()
  })

  test('js:common:typeof:objects', () => {
    // isObject
    expect(isObject({})).toBeTruthy()
    expect(isObject([])).toBeFalsy()

    // isArray
    expect(isArray([])).toBeTruthy()
    expect(isArray({})).toBeFalsy()

    // isRegExp
    expect(isRegExp(/hello world/g)).toBeTruthy()
    expect(isArray('hello world')).toBeFalsy()

    // isPromise
    expect(isPromise(Promise.resolve('hello world')))
    expect(isPromise('hello world'))

    // isMap
    expect(isMap(new Map())).toBeTruthy()
    expect(isMap(new Set())).toBeFalsy()

    // isWeakMap
    expect(isWeakMap(new WeakMap())).toBeTruthy()
    expect(isWeakMap(new WeakSet())).toBeFalsy()

    // isSet
    expect(isSet(new Set())).toBeTruthy()
    expect(isSet(new Map())).toBeFalsy()

    // isWeakSet
    expect(isWeakSet(new WeakSet())).toBeTruthy()
    expect(isWeakSet(new Map())).toBeFalsy()

    // isDate
    expect(isDate(new Date())).toBeTruthy()
    expect(isDate(new Date().getDate())).toBeFalsy()

    // isError
    expect(isError(new Error(`something went wrong  ¯\_(ツ)_/¯`))).toBeTruthy()
    expect(isError(`something went wrong  ¯\_(ツ)_/¯`)).toBeFalsy()
  })

  test('js:common:nullish', () => {
    expect(nullish(null)).toBeTruthy()
    expect(nullish(undefined)).toBeTruthy()

    expect(nullish('hello world')).toBeFalsy()
    expect(nullish(3029302)).toBeFalsy()
  })

  test('js:common:coalesce', () => {
    expect(coalesce(null, undefined, '', NaN, 'Waldo')).toBe('')
    expect(coalesce(null, undefined)).toBe(undefined)
  })

  test('js:custom:isPrimitive', () => {
    expect(isPrimitive(1)).toBeTruthy()
    expect(isPrimitive('hello world')).toBeTruthy()
    expect(isPrimitive(false)).toBeTruthy()

    expect(isPrimitive({})).toBeFalsy()
    expect(isPrimitive([])).toBeFalsy()
  })
})
