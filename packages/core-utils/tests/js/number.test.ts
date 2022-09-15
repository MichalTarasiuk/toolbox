import { toDigits } from '../../source/js/number/number'

describe('js:number', () => {
  it('js:number:toDigits', () => {
    expect(toDigits(12.345, 2)).toBe(12.35)
    expect(toDigits(12.345, 0)).toBe(12)
  })
})
