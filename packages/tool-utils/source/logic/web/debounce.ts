import {type Any} from '@tool/typescript';

export const debounce = <Fn extends Any.UnknownFunction>(fn: Fn, wait: number) => {
  let timeoutId: number | null = null;

  return (...args: Parameters<Fn>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      fn.call(null, ...args);
    }, wait);
  };
};

/**
 * Defers invoking a function until the current call stack has cleared.
 */
export const defer = <Fn extends Any.AnyFunction>(fn: Fn, ...params: Parameters<Fn>) => setTimeout(fn, 0, ...params);
