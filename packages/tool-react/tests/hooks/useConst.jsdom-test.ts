import {renderHook} from '@testing-library/react';

import {useConst} from '../../_api';

describe('jsdom - react:hooks:useConst', () => {
  it('should return resolved state', () => {
    const initialState = 0;

    const {result} = renderHook(() => useConst(() => initialState));

    expect(result.current).toBe(initialState);
  });

  it('should have the same refference on each rerender', () => {
    const initial = {};

    const {result, rerender} = renderHook(() => useConst(initial));

    expect(result.current).toBe(initial);

    rerender();

    expect(result.current).toBe(initial);

    rerender();

    rerender();

    expect(result.current).toBe(initial);
  });

  it('should throw error on mutation', () => {
    const initial = {};

    const {result} = renderHook(() => useConst(initial));

    // @ts-expect-error
    expect(() => (result.current['A'] = 1)).toThrowError();
  });
});
