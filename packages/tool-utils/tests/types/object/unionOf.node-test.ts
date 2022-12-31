import {expectType, unionOf} from '../../../_api';

describe('node - utils:types:object:unionOf', () => {
  it(`return return union of object`, () => {
    const example = {
      a: '1',
      b: '2',
    };

    const union = unionOf(example);

    expectType<
      | {
          key: 'a';
          value: string;
        }
      | {
          key: 'b';
          value: string;
        }
    >(union);
    expect(union).toEqual([
      {key: 'a', value: '1'},
      {key: 'b', value: '2'},
    ]);
  });
});
