import {createEventHub} from '@tool/utils';
import {useCallback, useEffect, useRef} from 'react';

import {useEvent} from './useEvent';

import type {Any} from '@tool/typescript';

const eventHub = createEventHub();

type EventHub = typeof eventHub;
type Subscriber = ReturnType<EventHub['on']>;

/**
 * Creates a pub/sub (publish–subscribe) event hub with emit, on, and off methods.
 */
export const useEventHub = <Name extends string>(name: Name, handler: Any.UnknownFunction) => {
  const savedSubscriber = useRef<Subscriber | null>(null);
  const stableHandler = useEvent(handler);

  useEffect(() => {
    const subscriber = eventHub.on<Name>(name, stableHandler);

    savedSubscriber.current = subscriber;

    return () => {
      subscriber.off();
    };
  }, [name, stableHandler]);

  const emit = useCallback(
    (...args: unknown[]) => {
      eventHub.emit(name, ...args);
    },
    [name],
  );

  return {
    ...savedSubscriber.current,
    emit,
  };
};
