import {renderHook} from '@testing-library/react';
import {sum} from '@tool/utils';

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

  it('should update memo value on dependency list change', () => {
    const {result: hook, rerender} = renderHook(
      ({dependencyList}) => useMemoRef(() => dependencyList.reduce(sum), dependencyList),
      {
        initialProps: {dependencyList: [1, 2]},
      },
    );

    const initial = hook.current;

    expect(initial.current).toBe(3);

    rerender({dependencyList: [2, 3]});

    expect(hook.current).toBe(initial);
    expect(hook.current.current).toBe(5);

    rerender({dependencyList: [4, 5]});

    expect(hook.current).toBe(initial);
    expect(hook.current.current).toBe(9);
  });
});
