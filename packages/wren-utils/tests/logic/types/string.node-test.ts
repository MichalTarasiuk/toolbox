import {
  lowercaseFirst,
  uppercaseFirst,
  truncate,
  space,
  splitMapJoin,
} from '../../../_api'

describe('node - logic:types:string', () => {
  test('logic:types:string:letterSize', () => {
    // lowercaseFirst
    expect(lowercaseFirst('Hello world')).toBe('hello world')

    // uppercaseFirst
    expect(uppercaseFirst('hello world')).toBe('Hello world')
  })

  test('logic:types:string:truncate', () => {
    expect(truncate('hello, world', 5, '...')).toBe('hello...')
    expect(truncate('hello, world', 0, '...')).toBe('...')
  })

  test('logic:types:string:splitMapJoin', () => {
    const str = 'hello world'

    expect(
      splitMapJoin(str, space, (substring) => substring.toUpperCase()),
    ).toBe(str.toUpperCase())
  })
})
