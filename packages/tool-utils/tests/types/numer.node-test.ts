import {toDigits} from '../../_api';

describe('node - utils:types:number', () => {
  it('should round', () => {
    expect(toDigits(12.345, 2)).toBe(12.35);
    expect(toDigits(12.345, 0)).toBe(12);
  });
});
