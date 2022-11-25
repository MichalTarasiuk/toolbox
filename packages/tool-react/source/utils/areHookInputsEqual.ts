import type {DependencyList} from 'react';

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */

const is = (x: any, y: any) => (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y);

export const objectIs: (x: unknown, y: unknown) => boolean = typeof Object.is === 'function' ? Object.is : is;

// 1:1 how react compare previous dependency list with current dependency list

// Usage:
// For example if you are creating custom hook which has dependency list.
// Use this function to compare dependencies.

// react source code
export const areHookInputsEqual = (nextDeps: DependencyList, prevDeps: DependencyList | null) => {
  if (prevDeps === null) {
    return false;
  }

  // eslint-disable-next-line functional/no-loop-statement -- early return
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (objectIs(nextDeps[i], prevDeps[i])) {
      continue;
    }

    return false;
  }

  return true;
};