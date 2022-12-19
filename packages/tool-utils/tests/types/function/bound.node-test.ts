import {bound, expectType} from '../../../_api';

describe('node - logic:types:functions:resolve', () => {
  it('should create new function', () => {
    const example = () => {};

    expect(bound(example, {})).not.toBe(example);
  });

  it('should bound param', () => {
    const add = (x: string, y: number) => Number(x) + y;

    const boundAdd = bound(add, {'1': 5});

    expectType<(arg: string) => void>(boundAdd);
    expect(boundAdd('5')).toBe(10);
  });
});
