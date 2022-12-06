import {fireEvent, render} from '@testing-library/react';
import {expectNever, resolve, uppercaseFirst} from '@tool/utils';

import 'mock-local-storage';
import {atomify} from '../../_api';

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
});
