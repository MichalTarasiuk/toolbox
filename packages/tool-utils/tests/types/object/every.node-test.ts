import {every, isNumber, isString} from '../../../_api';

describe('node - utils:types:object:every', () => {
  const example = {
    a: 0,
    b: 5,
    c: 10,
  };

  it('it should return `true` when every assertion is passed', () => {
    const result = every(example, {
      a: value => isNumber(value),
      b: value => Boolean(value) && isNumber(value),
    });

    expect(result).toBeTruthy();
  });

  it('it should return `false` when some assertion is not passed', () => {
    const result = every(example, {
      a: value => isNumber(value),
      b: value => Boolean(value) && isNumber(value),
      c: value => isString(value),
    });

    expect(result).toBeFalsy();
  });
});
