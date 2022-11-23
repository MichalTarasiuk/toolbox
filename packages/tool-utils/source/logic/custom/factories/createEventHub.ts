import {keyIn, isSet} from '../../../source';

import type {Any} from '@tool/typescript';

type EventHub<Key extends string = string> = Record<Key, Set<Any.UnknownFunction>>;

/**
 * Creates a pub/sub (publish–subscribe) event hub with emit, on, and off methods.
 */
export const createEventHub = () => {
  const eventHub: EventHub = {};

  const hasEvent = <Name extends string>(state: EventHub, name: string): state is EventHub<Name> =>
    keyIn(state, name) && isSet(state[name]);

  /**
   * Emit events to invoke all handlers subscribed to them, passing the data to them as an argument
   *
   * @param name - of specificin event
   * @param args - args for handlers
   *
   */
  const emit = <Name extends string>(name: Name, ...args: unknown[]) => {
    if (hasEvent<Name>(eventHub, name)) {
      eventHub[name].forEach(listener => listener(...args));
    }
  };

  /**
   * Listen for different types of events.
   *
   * @param name - of specificin event
   * @param handler - function that invoke on emit call
   *
   * @returns 'of' method, which stop a specific handler from listening to the event
   */
  const on = <Name extends string>(name: Name, handler: Any.UnknownFunction) => {
    eventHub[name] ??= new Set();
    eventHub[name]?.add(handler);

    return {
      off: () => off(name, handler),
    };
  };

  /**
   * Stop a specific handler from listening to the event.
   *
   * @param name - of specificin event
   * @param handler - reference to function that invoke on emit call
   */
  const off = <Name extends string>(name: Name, handler: Any.UnknownFunction) => {
    if (hasEvent<Name>(eventHub, name)) {
      eventHub[name].delete(handler);
    }
  };

  return {
    emit,
    on,
    off,
  };
};
