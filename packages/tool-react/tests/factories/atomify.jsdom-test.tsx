import {fireEvent, render} from '@testing-library/react';
import {expectNever, none, resolve, uppercaseFirst} from '@tool/utils';

import 'mock-local-storage';
import {atomify} from '../../_api';

import type {Atom} from '../../_api';
import type {ResolvableState} from '../../source/factories/atomify/types';

describe('jsdom - react:factories:atomify', () => {
  it('should emit update atom', () => {
    const {atom, useAtom} = atomify();

    const userAtom = atom<{name: string; age: number} | null>(null);

    const Component = () => {
      const [user, setUser] = useAtom(userAtom);

      if (user) {
        return <p>user is fetched</p>;
      }

      const fetchUser = () => {
        setUser({name: 'Michał', age: 19});
      };

      return <button onClick={fetchUser}>fetch user</button>;
    };

    const {getByText} = render(<Component />);

    fireEvent.click(getByText('fetch user'));

    getByText('user is fetched');
  });

  it('should rerender component on update atom', () => {
    const {atom, useAtom} = atomify();

    const userAtom = atom<{name: string; age: number} | null>(null);

    const Child = () => {
      const [, setUser] = useAtom(userAtom);

      const fetchUser = () => {
        setUser({name: 'Michał', age: 19});
      };

      return <button onClick={fetchUser}>fetch user</button>;
    };
    const Parent = () => {
      const [user] = useAtom(userAtom);

      return (
        <>
          {user && 'user is fetched'}
          <Child />
        </>
      );
    };

    const {getByText} = render(<Parent />);

    fireEvent.click(getByText('fetch user'));

    getByText('user is fetched');
  });

  it('should invoke atom when coworked is updated', () => {
    const {atom, useAtom} = atomify();

    const firstnameAtom = atom<string | null>(null);
    const userAtom = atom(get => ({firstname: get(firstnameAtom)}));

    const FirstnameSetter = () => {
      const [, setFirstname] = useAtom(firstnameAtom);

      return (
        <button
          onClick={() => {
            setFirstname('Michał');
          }}
        >
          set firstname
        </button>
      );
    };
    const Component = () => {
      const [user] = useAtom(userAtom);

      if (user.firstname) {
        return <p>status: success</p>;
      }

      return <FirstnameSetter />;
    };

    const {getByText} = render(<Component />);

    fireEvent.click(getByText('set firstname'));

    getByText('status: success');
  });

  it('should work with custom set', () => {
    const {atom, useAtom} = atomify();

    const firstnameAtom = atom(null as string | null, (handler, nextName: string) => {
      handler.set(uppercaseFirst(nextName));
    });
    const userAtom = atom(get => ({firstname: get(firstnameAtom)}));

    const FirstnameSetter = () => {
      const [, setFirstname] = useAtom(firstnameAtom);

      return (
        <button
          onClick={() => {
            setFirstname('michał');
          }}
        >
          set firstname
        </button>
      );
    };
    const Component = () => {
      const [user] = useAtom(userAtom);

      if (user.firstname) {
        return <p>status: success</p>;
      }

      return <FirstnameSetter />;
    };

    const {getByText} = render(<Component />);

    fireEvent.click(getByText('set firstname'));

    getByText('status: success');
  });

  it('should save counter in localstorage', () => {
    const {atomWithStorage, useAtom} = atomify();

    const counterAtom = atomWithStorage('counter', '1');

    const Component = () => {
      const [counter, setCounter] = useAtom(counterAtom);

      return (
        <div>
          <p>counter: {counter}</p>
          <button
            onClick={() => {
              setCounter(saveCounter => {
                const parsedCounter = Number(saveCounter);
                const nextCounter = parsedCounter + 1;

                return nextCounter.toString();
              });
            }}
          >
            increase
          </button>
        </div>
      );
    };

    const {getByText} = render(<Component />);

    fireEvent.click(getByText('increase'));

    getByText('counter: 2');
    expect(window.localStorage.getItem('counter')).toBe('2');
  });

  it('should not rerender component which update atom', () => {
    const {atom, useAtomValue, useUpdateAtom} = atomify();

    const counterAtom = atom(0, (handler, lazyCounter: ResolvableState<number>) => {
      const resolvedCounter = resolve(lazyCounter, handler.state);

      handler.set(resolvedCounter);
    });

    const displayerSpy = jest.fn();
    const updaterSpy = jest.fn();

    const Displayer = () => {
      const counter = useAtomValue(counterAtom);

      displayerSpy();

      return <p>counter: {counter}</p>;
    };
    const Updater = () => {
      const updateAtom = useUpdateAtom(counterAtom);

      updaterSpy();

      const increase = () => {
        updateAtom(counter => counter + 1);
      };

      return <button onClick={increase}>increase</button>;
    };

    const Component = () => {
      return (
        <>
          <Displayer />
          <Updater />
        </>
      );
    };

    const {getByText} = render(<Component />);

    fireEvent.click(getByText('increase'));
    fireEvent.click(getByText('increase'));

    getByText('counter: 2');

    expect(displayerSpy).toHaveBeenCalledTimes(3);
    expect(updaterSpy).toHaveBeenCalledTimes(1);
  });

  it('should reset atom to initial value', () => {
    const {atomWithReset, useAtom, useResetAtom} = atomify();

    const counterAtom = atomWithReset(0);

    const Component = () => {
      const [counter, setCounter] = useAtom(counterAtom);
      const reset = useResetAtom(counterAtom);

      const increase = () => {
        setCounter(counter + 1);
      };

      return (
        <div>
          <p>counter: {counter}</p>
          <button onClick={increase}>increase</button>
          <button onClick={reset}>reset</button>
        </div>
      );
    };

    const {getByText} = render(<Component />);

    fireEvent.click(getByText('increase'));
    fireEvent.click(getByText('increase'));
    fireEvent.click(getByText('increase'));

    getByText('counter: 3');

    fireEvent.click(getByText('reset'));

    getByText('counter: 0');
  });

  it(`should throw error when passed atom to useResetAtom doesn't have initial value`, () => {
    const {atom, useResetAtom} = atomify();
    const counterAtom = atom(0);

    const Component = () => {
      const resetCounter = useResetAtom(counterAtom);

      return <button onClick={resetCounter}>reset counter</button>;
    };

    const {getByText} = render(<Component />);

    expect(() => {
      fireEvent.click(getByText('reset'));
    }).toThrowError();
  });

  it('should work as reducer', () => {
    const {atomWithReducer, useAtom} = atomify();

    const counterAtom = atomWithReducer(0, (counter, type: 'decrease' | 'increase') => {
      if (type === 'decrease') {
        return counter - 1;
      }

      if (type === 'increase') {
        return counter + 1;
      }

      expectNever(type);

      return counter;
    });

    const Component = () => {
      const [counter, action] = useAtom(counterAtom);

      return (
        <div>
          <p>counter: {counter}</p>
          <button
            onClick={() => {
              action('increase');
            }}
          >
            increase
          </button>
          <button
            onClick={() => {
              action('decrease');
            }}
          >
            decrease
          </button>
        </div>
      );
    };

    const {getByText} = render(<Component />);

    fireEvent.click(getByText('increase'));
    fireEvent.click(getByText('increase'));
    fireEvent.click(getByText('increase'));

    getByText('counter: 3');

    fireEvent.click(getByText('decrease'));
    fireEvent.click(getByText('decrease'));

    getByText('counter: 1');
  });

  it('should split atom', () => {
    const {atom, splitAtom, useAtom} = atomify();

    const taskToToggle = 'help the town';
    const initialState = [
      {
        task: taskToToggle,
        done: false,
      },
      {
        task: 'feed the dragon',
        done: false,
      },
    ];
    const todosAtom = atom(initialState);
    const todoAtomsAtom = splitAtom(todosAtom);

    type TodoType = (typeof initialState)[number];

    const TodoItem = ({todoAtom}: {todoAtom: Atom<TodoType>}) => {
      const [todo, setTodo] = useAtom(todoAtom);

      const status = `is ${!todo.done ? 'not' : none} done: ${todo.task}`;
      const toggleText = `toggle: ${todo.task}`;

      return (
        <div>
          <p>{status}</p>
          <button
            onClick={() => {
              setTodo({...todo, done: !todo.done});
            }}
          >
            {toggleText}
          </button>
        </div>
      );
    };
    const TodoList = () => {
      const [todoAtoms] = useAtom(todoAtomsAtom);
      return (
        <ul>
          {todoAtoms.map(todoAtom => (
            <TodoItem key={todoAtom.id} todoAtom={todoAtom} />
          ))}
        </ul>
      );
    };

    const {getByText} = render(<TodoList />);

    initialState.forEach(({task}) => {
      getByText(`is not done: ${task}`);
    });

    fireEvent.click(getByText(`toggle: ${taskToToggle}`));

    getByText(`is done: ${taskToToggle}`);
  });

  it('should return previous value of atom', () => {
    const {atomWithPrevious, useAtom} = atomify();
    const counterAtom = atomWithPrevious(0);

    const Component = () => {
      const [counter, setCounter] = useAtom(counterAtom);

      const increase = () => {
        setCounter(currentCounter => currentCounter + 1);
      };

      return (
        <div>
          <p>previous: {counter.previous}</p>
          <p>current: {counter.current}</p>
          <button onClick={increase}>increase</button>
        </div>
      );
    };

    const {getByText} = render(<Component />);

    fireEvent.click(getByText('increase'));

    getByText('previous: 0');
    getByText('current: 1');

    fireEvent.click(getByText('increase'));
    fireEvent.click(getByText('increase'));

    getByText('previous: 2');
    getByText('current: 3');
  });

  it('should work with immer', () => {
    const {atomWithImmer, useAtom} = atomify();

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
    const todosAtom = atomWithImmer(initialTodos);

    const Component = () => {
      const [todos, setTodos] = useAtom(todosAtom);

      return (
        <ul>
          {todos.map(todo => {
            const content = `${todo.title} is done: ${todo.done}`;

            return (
              <li key={todo.id}>
                <p>{content}</p>
                <button
                  onClick={() => {
                    setTodos(currentTodos => {
                      const currentTodo = currentTodos.find(mappedTodo => mappedTodo.id === todo.id);

                      if (currentTodo) {
                        currentTodo.done = !currentTodo.done;
                      }
                    });
                  }}
                >
                  {todo.title} toggle
                </button>
              </li>
            );
          })}
        </ul>
      );
    };

    const {getByText} = render(<Component />);

    getByText('Learn React is done: true');

    fireEvent.click(getByText('Learn React toggle'));

    getByText('Learn React is done: false');
  });

  it('should assert state on each update', () => {
    const {atomWithAssert, useAtom} = atomify();
    const counterAtom = atomWithAssert(0, counter => counter <= 3);

    const Component = () => {
      const [counter, setCounter] = useAtom(counterAtom);

      const increase = () => {
        setCounter(currentCounter => currentCounter + 1);
      };

      return (
        <div>
          <p>counter: {counter}</p>
          <button onClick={increase}>increase</button>
        </div>
      );
    };

    const {getByText} = render(<Component />);

    fireEvent.click(getByText('increase'));
    fireEvent.click(getByText('increase'));
    fireEvent.click(getByText('increase'));

    getByText('counter: 3');

    fireEvent.click(getByText('increase'));

    getByText('counter: 3');
  });
});
