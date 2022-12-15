import {act, renderHook} from '@testing-library/react';

import {useImmerState} from '../../_api';

describe('jsdom - react:hooks:useImmerState', () => {
  it('should detect when state is not resolveable', () => {
    const {result} = renderHook(() => useImmerState(0));
    const setState = result.current[1];

    const nextState = 100;
    act(() => {
      setState(nextState);
    });

    expect(result.current[0]).toBe(nextState);
  });

  it('should resolve state when is resolvable', () => {
    const initialTodos = [
      {
        id: 'React',
        title: 'Learn React',
        done: true,
      },
      {
        id: 'Immer',
        title: 'Try Immer',
        done: false,
      },
    ];

    const {result} = renderHook(() => useImmerState(initialTodos));
    const setState = result.current[1];

    act(() => {
      setState(todos => {
        const todo = todos[1];

        if (todo) {
          todo.done = !todo.done;
        }
      });
    });

    const state = result.current[0];
    expect(state[1]?.done).toBeTruthy();
  });
});
