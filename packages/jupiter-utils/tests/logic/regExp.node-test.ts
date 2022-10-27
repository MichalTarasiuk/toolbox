import { regExpUnion } from '../../_api'

describe('node - logic:regExp', () => {
  test('logic:regExp:regExpUnion', () => {
    expect(regExpUnion(/hello/g, /hey/).source).toBe('(hello)|(hey)')
    expect(regExpUnion(/hello/g, /(world | Michał)/).source).toBe(
      '(hello)|((world | Michał))',
    )
  })
})
