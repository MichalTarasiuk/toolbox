import {uppercaseFirst, lowercaseFirst, expectType, truncate, splitMapJoin, space} from '../../_api';

describe('node - utils:type:string', () => {
  it('should uppercase first', () => {
    const word = 'hello world';
    const result = uppercaseFirst(word);

    expect(result).toBe('Hello world');
    expectType<'Hello world'>(result);
  });

  it('should lowercase first', () => {
    const word = 'Hello world';
    const result = lowercaseFirst(word);

    expect(result).toBe('hello world');
    expectType<'hello world'>(result);
  });

  it('should truncate word', () => {
    expect(truncate('hello, world', 5, '...')).toBe('hello...');
    expect(truncate('hello, world', 0, '...')).toBe('...');
  });

  it('should split, map and join word', () => {
    const first = 'Hello';
    const second = 'World';
    const separator = space;

    expect(splitMapJoin(`${first}${separator}${second}`, space, substring => substring.length.toString())).toBe(
      `${first.length}${space}${second.length}`,
    );
  });
});
