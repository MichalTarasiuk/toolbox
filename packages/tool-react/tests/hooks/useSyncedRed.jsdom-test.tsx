import {renderHook} from '@testing-library/react-hooks';

import {useSyncedRef} from '../../_api';

describe('jsdom - react:hooks:useSyncedRef', () => {
  it('should return ref object', () => {
    const {result} = renderHook(() => useSyncedRef(1));

    expect(result.current).toEqual({current: 1});
  });

  it('should return same ref between renders', () => {
    const {result, rerender} = renderHook(() => useSyncedRef(1));

    const ref = result.current;

    rerender();

    expect(result.current).toEqual(ref);

    rerender();

    expect(result.current).toEqual(ref);

    rerender();

    expect(result.current).toEqual(ref);
  });

  it('should contain actual value on each render', () => {
    const value1 = {foo: 'bar'};
    const value2 = ['a', 'b', 'c'];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {result, rerender} = renderHook(({val}) => useSyncedRef<any>(val), {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initialProps: {val: 1 as any},
    });

    expect(result.current.current).toBe(1);

    rerender({val: value1});

    expect(result.current.current).toBe(value1);

    rerender({val: value2});

    expect(result.current.current).toBe(value2);
  });

  it('should throw on attempt to change ref', () => {
    const {result} = renderHook(() => useSyncedRef(1));

    expect(() => {
      // @ts-expect-error testing irrelevant usage
      result.current.foo = 'bar';
    }).toThrow(new TypeError('Cannot add property foo, object is not extensible'));

    expect(() => {
      // @ts-expect-error testing irrelevant usage
      result.current.current = 2;
    }).toThrow(new TypeError('Cannot set property current of #<Object> which has only a getter'));
  });
});
