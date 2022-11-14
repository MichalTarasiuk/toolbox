import { toDigits } from '../../../_api'

describe('node - logic:types:number', () => {
  test('logic:types:number:toDigits', () => {
    expect(toDigits(12.345, 2)).toBe(12.35)
    expect(toDigits(12.345, 0)).toBe(12)
  })
})
