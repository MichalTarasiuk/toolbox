/* eslint-disable @typescript-eslint/consistent-type-assertions -- tests */
import {
  expectNever,
  expectTypeNotAny,
  expectType,
  lowercase,
  uppercase,
  keyIn,
  objectKeys,
  fromEntries,
  entries,
} from '../_api'

describe('node - logic:types', () => {
  test('logic:types:expect', () => {
    const digit = 1
    const word = 'Hello World'
    const anything: any = 3
    const nothing = 5 as never

    // expectType

    // @ts-expect-error
    expectType<string>(digit)
    expectType<string>(word)

    // expectTypeNotAny

    // @ts-expect-error
    expectTypeNotAny(anything)
    expectTypeNotAny(digit)

    // expectNever

    // @ts-expect-error
    expectNever(digit)
    expectNever(nothing)
  })

  test('logic:types:string', () => {
    const word = 'Hello World' as const

    // lowercase
    expectType<Lowercase<typeof word>>(lowercase(word))

    // uppercase
    expectType<Uppercase<typeof word>>(uppercase(word))
  })

  test('logic:types:objects', () => {
    const example = {
      1: 'A',
      3: 'C',
    }

    // keyIn
    if (keyIn(example, 2)) {
      expectType<{ 2: unknown }>(example)
    }

    // objectKeys
    expectType<[1, 3]>(objectKeys(example, 'strict'))
    expectType<(1 | 3)[]>(objectKeys(example))

    // fromEntries
    expectType<{ 1: 'A' }>(fromEntries([[1, 'A']]))

    // entries
    expectType<[[1, 'A']]>(entries({ 1: 'A' }))
  })
})
