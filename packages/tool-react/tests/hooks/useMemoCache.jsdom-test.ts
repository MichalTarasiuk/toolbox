import {renderHook} from '@testing-library/react-hooks';
import {sum} from '@tool/utils';

import {useMemoCache} from '../../_api';

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
        console.log({dependencyList});

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
});
