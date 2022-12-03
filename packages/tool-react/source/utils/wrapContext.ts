/* eslint-disable @typescript-eslint/no-empty-function */
import {type Context} from 'react';

/**
 * In development, React will warn about using contexts between renderers.
 * Utility which helps hide error.
 * https://github.com/facebook/react/pull/12779
 */
export const wrapContext = <Value>(context: Context<Value>) => {
  try {
    return Object.defineProperties(context, {
      _currentRenderer: {
        get() {
          return null;
        },
        set() {},
      },
      _currentRenderer2: {
        get() {
          return null;
        },
        set() {},
      },
    });
  } catch {
    return context;
  }
};
