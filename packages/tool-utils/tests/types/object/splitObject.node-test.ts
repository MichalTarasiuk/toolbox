import {isString, splitObject} from '../../../_api';

describe('node - utils:types:object:splitObject', () => {
  it(`return return splited object, second with only string's`, () => {
    const example = {
      1: '1',
      2: '2',
      '3': 3,
      '4': 4,
    };

    const [withNumbers, withStrings] = splitObject(example, (_, value, skip) => {
      if (isString(value)) {
        return value;
      }

      return skip;
    });

    expect(withNumbers).toEqual({'3': 3, '4': 4});
    expect(withStrings).toEqual({1: '1', 2: '2'});
  });
});
