import {renderHook} from '@testing-library/react-hooks';
import {empty, sum} from '@tool/utils';

import {createMemoCache, useMemoCache} from '../../_api';

import type {DependencyList} from 'react';

describe('jsdom - react:hooks:useMemoCache', () => {
  it('should return resolved state', () => {
    const resolved = 'Hello World';
    const lazyInitialize = () => resolved;

    const {
      result: {current},
    } = renderHook(() => useMemoCache(lazyInitialize, []));

    expect(current).toBe(resolved);
  });

  it('should not invoke factory when state is cached', () => {
    const spy = jest.fn();
    const {result, rerender} = renderHook(
      ({dependencyList}) => {
        return useMemoCache(() => {
          spy();

          return dependencyList.reduce(sum);
        }, dependencyList);
      },
      {initialProps: {dependencyList: [1, 2]}},
    );

    expect(result.current).toBe(3);
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({dependencyList: [3, 4]});

    expect(result.current).toBe(7);
    expect(spy).toHaveBeenCalledTimes(2);

    rerender({dependencyList: [1, 2]});

    expect(result.current).toBe(3);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should invoke when state is not cached (reference case)', () => {
    const spy = jest.fn();
    const {result, rerender} = renderHook(
      ({dependencyList}) => {
        return useMemoCache(() => {
          spy();

          return Object.values(dependencyList[0] ?? []);
        }, dependencyList);
      },
      {initialProps: {dependencyList: [{a: 1, b: 2}]}},
    );

    expect(result.current).toEqual([1, 2]);
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({dependencyList: [{a: 1, b: 2}]});

    expect(result.current).toEqual([1, 2]);
    expect(spy).toHaveBeenCalledTimes(2);

    rerender({dependencyList: [{a: 2, b: 3}]});

    expect(result.current).toEqual([2, 3]);
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should work with custom `areHookInputsEqual`', () => {
    const spy = jest.fn();
    const customAreHookInputsEqual = (nextDeps: DependencyList, prevDeps: DependencyList | null) =>
      JSON.stringify(nextDeps) === JSON.stringify(prevDeps);

    const {result, rerender} = renderHook(
      ({dependencyList}) => {
        return useMemoCache(
          () => {
            spy();

            return Object.values(dependencyList[0] ?? empty.object);
          },
          dependencyList,
          customAreHookInputsEqual,
        );
      },
      {initialProps: {dependencyList: [{a: 1, b: 2}]}},
    );

    expect(result.current).toEqual([1, 2]);
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({dependencyList: [{a: 1, b: 2}]});

    expect(result.current).toEqual([1, 2]);
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({dependencyList: [{a: 2, b: 3}]});

    expect(result.current).toEqual([2, 3]);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should handle unstable refference of `areHookInputsEqual`', () => {
    const spy = jest.fn();
    const initialDependencyList = [{a: 1, b: 2}];

    const {result, rerender} = renderHook(
      ({dependencyList}) => {
        return useMemoCache(
          () => {
            spy();

            return Object.values(dependencyList[0] ?? empty.object);
          },
          dependencyList,
          (nextDeps: DependencyList, prevDeps: DependencyList | null) =>
            JSON.stringify(nextDeps) === JSON.stringify(prevDeps),
        );
      },
      {initialProps: {dependencyList: initialDependencyList}},
    );

    expect(result.current).toEqual([1, 2]);
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({dependencyList: initialDependencyList});

    expect(result.current).toEqual([1, 2]);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  describe('createMemoCache', () => {
    it(`should return 'none' when there is no cached value`, () => {
      const memoCache = createMemoCache();
      const dependencyList = [1, 2];

      const cachedValue = memoCache.get(dependencyList);

      expect(memoCache.isNone(cachedValue)).toBeTruthy();
    });

    it('should return cached value', () => {
      const memoCache = createMemoCache();

      const dependencyList = [1, 2];
      const value = Object.values(dependencyList);

      memoCache.set(dependencyList, value);
      const cachedValue = memoCache.get(dependencyList);

      expect(cachedValue).toBe(value);
      expect(memoCache.isNone(cachedValue)).toBeFalsy();
    });

    it('should compare dependency list like React', () => {
      const memoCache = createMemoCache();

      const dependencyList = [1, {}];
      const value = Object.values(dependencyList);

      memoCache.set(dependencyList, value);
      const cachedValue1 = memoCache.get(dependencyList);

      expect(cachedValue1).toBe(value);
      expect(memoCache.isNone(cachedValue1)).toBeFalsy();

      const cachedValue2 = memoCache.get([...dependencyList]);

      expect(cachedValue2).toBe(value);
      expect(memoCache.isNone(cachedValue2)).toBeFalsy();

      const cachedValue3 = memoCache.get([1, {}]);

      expect(memoCache.isNone(cachedValue3)).toBeTruthy();
    });

    it('should work with custom `areHookInputsEqual`', () => {
      const memoCache = createMemoCache(
        (nextDeps: DependencyList, prevDeps: DependencyList | null) =>
          JSON.stringify(nextDeps) === JSON.stringify(prevDeps),
      );

      const dependencyList = [1, {}];
      const value = Object.values(dependencyList);

      memoCache.set(dependencyList, value);
      const cachedValue1 = memoCache.get(dependencyList);

      expect(cachedValue1).toBe(value);
      expect(memoCache.isNone(cachedValue1)).toBeFalsy();

      const cachedValue2 = memoCache.get([1, {}]);

      expect(cachedValue2).toBe(value);
      expect(memoCache.isNone(cachedValue1)).toBeFalsy();
    });
  });
});
