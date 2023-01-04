import {renderHook} from '@testing-library/react';

import {useMemoRef} from '../../_api';

describe('jsdom - react:hooks:useMemoRef', () => {
  it('should return resolved value', () => {
    const example = {quantity: 10};
    const {
      result: {current: hook},
    } = renderHook(() => useMemoRef(() => example, []));

    expect(hook.current).toBe(example);
  });

  it('should return the same object on each rerender', () => {
    const example = {type: 'user'};
    const {
      result: {current: hook},
      rerender,
    } = renderHook(() => useMemoRef(() => example, []));

    const initialResult = hook.current;

    expect(initialResult).toBe(example);

    rerender();

    expect(hook.current).toBe(initialResult);

    rerender();

    expect(hook.current).toBe(initialResult);
  });
});
