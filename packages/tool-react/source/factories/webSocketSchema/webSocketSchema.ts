import {createEventHub} from '@tool/utils';
import {useSyncExternalStore} from 'react';

import type {AnyWebSocketSchema, Get, InferStateUnion, Transition} from './types';

const name = 'webSocketSchema';

export const createWebSocketSchema = <WebSocketSchema extends AnyWebSocketSchema, Actions>(
  initial: InferStateUnion<WebSocketSchema>,
  initialization: (get: Get<WebSocketSchema>, transition: Transition<WebSocketSchema>) => Actions,
) => {
  const eventHub = createEventHub();
  let globalState = initial;

  const getState = () => globalState;

  const setState = (nextState: InferStateUnion<WebSocketSchema>) => {
    globalState = nextState;

    eventHub.emit(name);
  };

  const transition = (
    kind: WebSocketSchema['allKeys'],
    nextKind: WebSocketSchema['allKeys'],
    nextState: Omit<InferStateUnion<WebSocketSchema>, 'kind'>,
  ) => {
    if (kind !== globalState.kind) {
      throw new Error(`Invalid state, expected: ${String(globalState.kind)} but got ${String(kind)}`);
    }

    return nextState;
  };

  const actions = initialization(getState, transition);

  const useWebsocketSchema = () => {
    const state = useSyncExternalStore(onStoreChange => {
      const subscriber = eventHub.on(name, onStoreChange);

      return () => {
        subscriber.off();
      };
    }, getState);

    return {
      state,
      actions,
    };
  };

  return useWebsocketSchema;
};
