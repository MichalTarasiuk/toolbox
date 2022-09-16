import {
  lowercaseFirst,
  uppercaseFirst,
  truncate,
} from '../../source/js/string/string'

describe('js:string', () => {
  it('js:string:letterSize', () => {
    // lowercaseFirst
    expect(lowercaseFirst('Hello world')).toBe('hello world')

    // uppercaseFirst
    expect(uppercaseFirst('hello world')).toBe('Hello world')
  })

  it('js:string:truncate', () => {
    expect(truncate('hello, world', 5, '...')).toBe('hello...')
    expect(truncate('hello, world', 0, '...')).toBe('...')
  })
})
