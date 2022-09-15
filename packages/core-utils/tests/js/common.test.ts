import { nullish } from '../../source/js/common/common'

describe('js:common', () => {
  it('js:common:nullish', () => {
    expect(nullish(null)).toBeTruthy()
    expect(nullish(undefined)).toBeTruthy()

    expect(nullish('hello world')).toBeFalsy()
    expect(nullish(3029302)).toBeFalsy()
  })
})
