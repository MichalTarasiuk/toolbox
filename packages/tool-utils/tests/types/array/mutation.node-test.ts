import {copyWithin, fill, pop, push, reverse, shift, sort, splice, unshift} from '../../../_api';

describe('node - utils:types:array:mutation', () => {
  test('utils:types:array:mutation:copyWithins', () => {
    const example = ['a', 'b', 'c', 'd', 'e'];

    const result = copyWithin(example, 0, 3, 4);

    expect(result).not.toBe(example);
    expect(result).toEqual(['d', 'b', 'c', 'd', 'e']);
  });

  test('utils:types:array:mutation:fill', () => {
    const example = [1, 2, 3, 4];

    const result = fill(example, 0, 2, 4);

    expect(result).not.toBe(example);
    expect(result).toEqual([1, 2, 0, 0]);
  });

  test('utils:types:array:mutation:reverse', () => {
    const example = ['one', 'two', 'three'];

    const result = reverse(example);

    expect(result).not.toBe(example);
    expect(result).toEqual(['three', 'two', 'one']);
  });

  test('utils:types:array:mutation:sort', () => {
    const example = ['March', 'Jan', 'Feb', 'Dec'];

    const result = sort(example);

    expect(result).not.toBe(example);
    expect(result).toEqual(['Dec', 'Feb', 'Jan', 'March']);
  });

  test('utils:types:array:mutation:splice', () => {
    const example = ['Jan', 'March', 'April', 'June'];

    const {reference} = splice(example, 1, 0, 'Feb');

    expect(reference).not.toBe(example);
  });

  test('utils:types:array:mutation:pop', () => {
    const example = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

    const {reference, result} = pop(example);

    expect(reference).not.toBe(example);
    expect(result).toBe('tomato');
  });

  test('utils:types:array:mutation:push', () => {
    const example = ['pigs', 'goats', 'sheep'];

    const {reference, result} = push(example, 'cows');

    expect(reference).not.toBe(example);
    expect(result).toBe(4);
  });

  test('utils:types:array:mutation:shift', () => {
    const example = [1, 2, 3];

    const {reference, result} = shift(example);

    expect(reference).not.toBe(example);
    expect(result).toBe(1);
  });

  test('utils:types:array:mutation:unshift', () => {
    const example = [1, 2, 3];

    const {reference, result} = unshift(example, 4, 5);

    expect(reference).not.toBe(example);
    expect(result).toBe(5);
  });
});
