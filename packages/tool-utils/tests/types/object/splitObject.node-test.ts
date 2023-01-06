import {expectType, isString, splitObject} from '../../../_api';

describe('node - utils:types:object:splitObject', () => {
  it(`return return splited object, second with only string's`, () => {
    type Example = typeof example;

    type WithStrings = Pick<Example, 'a' | 'b'>;
    type WithNumbers = Pick<Example, 'c' | 'd'>;

    const example = {
      a: '1',
      b: '2',
      c: 3,
      d: 4,
    };

    const [withNumbers, withStrings] = splitObject(example, (_, value, skip) => {
      if (isString(value)) {
        return value;
      }

      return skip;
    });

    expectType<WithStrings>(withStrings);
    expect(withStrings).toEqual({a: '1', b: '2'});

    expectType<WithNumbers>(withNumbers);
    expect(withNumbers).toEqual({c: 3, d: 4});
  });
});
