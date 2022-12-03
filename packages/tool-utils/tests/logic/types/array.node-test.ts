import {toArray, union, chunk, compact, asyncFlatMap, sleep} from '../../../_api';

describe('node - logic:types:array', () => {
  test('logic:types:array:toArray', () => {
    expect(toArray('hello world')).toEqual(['hello world']);
    expect(toArray(100)).toEqual([100]);
  });

  test('logic:types:array:union', () => {
    expect(union([1, 2, 3, 4, 4])).toEqual([1, 2, 3, 4]);
    expect(union([3, 2, 1])).toEqual([3, 2, 1]);
  });

  test('logic:types:array:chunk', () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(chunk([1, 2, 3, 4], 3)).toEqual([[1, 2, 3], [4]]);
  });

  test('logic:types:array:compact', () => {
    expect(compact([1, false, []])).toEqual([1, []]);
    expect(compact([1, true, []])).toEqual([1, true, []]);
  });

  test('logic:types:array:asyncFlatMap', async () => {
    const initialArray = [1, 2];

    const asyncArray = await asyncFlatMap(initialArray, async digit => sleep(0, [digit])[0]);

    expect(asyncArray).toEqual(initialArray);
  });
});
