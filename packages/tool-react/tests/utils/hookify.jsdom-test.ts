import {renderHook} from '@testing-library/react';

import {hookify} from '../../_api';

describe('jsdom - react:utils:hookify', () => {
  const example = {
    name: 'Michał',
  };

  const useExample = () => hookify(example);

  it('should be possible to destructure as array', () => {
    const {result} = renderHook(() => {
      const [name] = useExample();

      return name;
    });

    expect(result.current).toBe(example.name);
  });

  it('should be possible to destructure as object', () => {
    const {result} = renderHook(() => {
      const {name} = useExample();

      return name;
    });

    expect(result.current).toBe(example.name);
  });
});
