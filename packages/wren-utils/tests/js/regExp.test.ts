import { regExpUnion, cloneRegExp } from '../../source/js/regExp/regExp'

describe('js:regExp', () => {
  test('js:regExp:regExpUnion', () => {
    expect(regExpUnion(/hello/g, /hey/).source).toBe('(hello)|(hey)')
    expect(regExpUnion(/hello/g, /(world | Michał)/).source).toBe(
      '(hello)|((world | Michał))',
    )
  })

  test('js:regExp:cloneRegExp', () => {
    const regExp = /Hello World/g

    expect(cloneRegExp(regExp)).not.toBe(regExp)
  })
})
