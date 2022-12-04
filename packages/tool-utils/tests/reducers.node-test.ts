import {max, min, sum} from '../_api';

describe('node - utils:reducers', () => {
  const example = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('should return min value of tuple', () => {
    expect(example.reduce(min)).toBe(1);
  });

  it('should return max value of tuple', () => {
    expect(example.reduce(max)).toBe(10);
  });

  it('should return sum of tuple', () => {
    expect(example.reduce(sum)).toBe(55);
  });
});
