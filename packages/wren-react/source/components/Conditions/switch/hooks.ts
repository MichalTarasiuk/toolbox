import {useRef} from 'react';

const initial = Symbol();

export const useReach = <To>(to: To) => {
  const ref = useRef<To | typeof initial>(initial);

  ref.current = initial;

  return {
    get done() {
      return ref.current === to;
    },
    set current(next: To) {
      if (next === to) {
        ref.current = next;
      }
    },
  };
};
