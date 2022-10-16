import { lowercaseFirst, uppercaseFirst, truncate } from '../../_api'

describe('node - js:string', () => {
  test('js:string:letterSize', () => {
    // lowercaseFirst
    expect(lowercaseFirst('Hello world')).toBe('hello world')

    // uppercaseFirst
    expect(uppercaseFirst('hello world')).toBe('Hello world')
  })

  test('js:string:truncate', () => {
    expect(truncate('hello, world', 5, '...')).toBe('hello...')
    expect(truncate('hello, world', 0, '...')).toBe('...')
  })
})
