import { regExpUnion } from '../../source/js/regExp/regExp'

describe('js:regExp', () => {
  it('js:regExp:regExpUnion', () => {
    expect(regExpUnion(/hello/g, /hey/).source).toBe('(hello)|(hey)')
    expect(regExpUnion(/hello/g, /(world | Michał)/).source).toBe(
      '(hello)|((world | Michał))',
    )
  })
})