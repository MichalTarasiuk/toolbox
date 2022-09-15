import { lowercaseFirst, uppercaseFirst } from '../../source/js/string/string'

describe('js:string', () => {
  it('js:string:letterSize', () => {
    // lowercaseFirst
    expect(lowercaseFirst('Hello world')).toBe('hello world')

    // uppercaseFirst
    expect(uppercaseFirst('hello world')).toBe('Hello world')
  })
})
