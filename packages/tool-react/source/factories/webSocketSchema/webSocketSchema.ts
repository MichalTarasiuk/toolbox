/* eslint-disable @typescript-eslint/ban-ts-comment */
import {createEventHub} from '@tool/utils';
import {useSyncExternalStore} from 'react';

import type {AnyWebSocketSchema, Get, InferNextState, InferStateUnion, Transition} from './types';

const name = 'webSocketSchema';

export const createWebSocketSchema = <WebSocketSchema extends AnyWebSocketSchema, Actions>(
  initial: InferStateUnion<WebSocketSchema>,
  initialization: (get: Get<WebSocketSchema>, transition: Transition<WebSocketSchema>) => Actions,
) => {
  const eventHub = createEventHub();
  let globalState = initial;

  const getState = () => globalState;

  const setState = <NextKind extends WebSocketSchema['allKeys']>(
    nextKind: NextKind,
    nextState: InferNextState<WebSocketSchema, NextKind>,
  ) => {
    const nextGlobalState = {kind: nextKind, ...nextState};

    // @ts-ignore
    globalState = nextGlobalState;

    eventHub.emit(name);

    return nextGlobalState;
  };

  // @ts-ignore
  const transition: Transition<WebSocketSchema> = (kind, nextKind, nextState) => {
    console.log({kind, nextKind});

    if (kind !== globalState.kind) {
      throw new Error(`Invalid state, expected: ${String(globalState.kind)} but got ${String(kind)}`);
    }

    const nextGlobalState = setState(nextKind, nextState);

    return nextGlobalState;
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
