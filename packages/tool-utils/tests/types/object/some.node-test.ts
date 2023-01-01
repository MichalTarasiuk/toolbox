import {some, isNumber, isString} from '../../../_api';

describe('node - utils:types:object:some', () => {
  const example = {
    a: 0,
    b: 5,
    c: 10,
  };

  it('it should return `true` when some assertion is passed', () => {
    const result = some(example, {
      a: value => isString(value),
      b: value => Boolean(value) && isNumber(value),
    });

    expect(result).toBeTruthy();
  });

  it('it should return `false` when none assertion is not passed', () => {
    const result = some(example, {
      c: value => isString(value),
    });

    expect(result).toBeFalsy();
  });
});
