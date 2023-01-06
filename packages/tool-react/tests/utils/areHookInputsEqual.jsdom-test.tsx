import {renderHook} from '@testing-library/react-hooks';
import {useEffect, useRef} from 'react';

import {areHookInputsEqual} from '../../_api';

import type {DependencyList} from 'react';
import type {Any} from '@tool/typescript';

const useExample = (fn: Any.UnknownFunction, deps: DependencyList) => {
  const savedDeps = useRef<DependencyList | null>(null);

  useEffect(() => {
    savedDeps.current = deps;
  });

  if (areHookInputsEqual(deps, savedDeps.current ?? null)) {
    fn();
  }
};

describe('jsdom - react:utils:areHookInputsEqual', () => {
  it('should not invoke `fn` on component mount', () => {
    const fn = jest.fn();

    renderHook(() => {
      useExample(fn, []);
    });

    expect(fn).toHaveBeenCalledTimes(0);
  });

  it('should invoke `fn` when deps are chenged', () => {
    const fn = jest.fn();

    const {rerender} = renderHook<{deps: DependencyList}, unknown>(
      props => {
        useExample(fn, props.deps);
      },
      {
        initialProps: {deps: []},
      },
    );

    expect(fn).toHaveBeenCalledTimes(0);

    rerender({deps: [true]});

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
