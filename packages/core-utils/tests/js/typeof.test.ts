import {
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
} from '../../source/js/typeof/typeof'

describe('js:typeof', () => {
  it('js:typeof:primitives', () => {
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

  it('js:typeof:functions', () => {
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

  it('js:typeof:objects', () => {
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
})
