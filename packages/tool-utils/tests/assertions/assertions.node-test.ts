import {
  booleanToString,
  expectNever,
  expectType,
  expectTypeNotAny,
  isClient,
  isPrimitive,
  isPropertyKey,
  isServer,
  isTruthy,
  lowercase,
  nullish,
  uppercase,
} from '../../_api';

describe('node - utils:assertions', () => {
  it('should narrow down type string to lowercase ', () => {
    const wrod = 'Hello World';
    const unknwonWord: string = 'Hello World';

    const lowercasedWord = lowercase(wrod);

    expectType<'hello world'>(lowercasedWord);
    expectType<string>(unknwonWord);
  });

  it('should narrow down type string to uppercase ', () => {
    const wrod = 'Hello World';
    const unknwonWord: string = 'Hello World';

    const uppercasedWord = uppercase(wrod);

    expectType<'HELLO WORLD'>(uppercasedWord);
    expectType<string>(unknwonWord);
  });

  it('should narrow down type of stringify boolean', () => {
    expectType<'true'>(booleanToString(true));
    expectType<'false'>(booleanToString(false));
  });

  it('should return `true` on server side', () => {
    expect(isServer()).toBeTruthy();
    expect(isClient()).toBeFalsy();
  });

  it('should assert type', () => {
    // @ts-ignore
    expectType<true>(false);
    expectType<true>(true);

    // @ts-ignore
    expectTypeNotAny(100 as any);
    expectTypeNotAny(100);

    // @ts-ignore
    expectNever(100);
    expectNever(100 as never);
  });

  it('should return `true` when value is truthy', () => {
    const example = 'hello world' as 'hello world' | null;

    expect(isTruthy(example)).toBeTruthy();

    if (isTruthy(example)) {
      expectType<'hello world'>(example);
    } else {
      expectType<null>(example);
    }
  });

  it('should return `true` when value is nullish', () => {
    const example = null as 'hello world' | null;

    expect(nullish(example)).toBeTruthy();

    if (nullish(example)) {
      expectType<null>(example);
    } else {
      expectType<'hello world'>(example);
    }
  });

  it('should return `true` when value is primitive', () => {
    const example1 = 1;
    const example2: unknown = [];

    expect(isPrimitive(example1)).toBeTruthy();
    expect(isPrimitive(example2)).toBeFalsy();
  });

  it('should return `true` when value is property key', () => {
    const example = {
      1: 'A',
      Symbol: 'B',
      C: 3,
    };
    const example2 = [{a: 1}, [4]];

    Object.keys(example).forEach(maybeKey => {
      expect(isPropertyKey(maybeKey)).toBeTruthy();
    });

    example2.forEach(maybeKey => {
      expect(isPropertyKey(maybeKey)).toBeFalsy();
    });
  });
});
