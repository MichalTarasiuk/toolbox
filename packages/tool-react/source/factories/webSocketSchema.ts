import {createEventHub} from '@tool/utils';
import {useSyncExternalStore} from 'react';

const name = 'webSocketSchema';

export const createWebSocketSchema = () => {
  const eventHub = createEventHub();
  const globalState = null;

  const getState = () => globalState;

  const transition = () => {
    return null;
  };

  const useWebsocketSchema = () => {
    const state = useSyncExternalStore(onStoreChange => {
      const subscriber = eventHub.on(name, onStoreChange);

      return () => {
        subscriber.off();
      };
    }, getState);

    return {
      state,
      transition,
    };
  };

  return useWebsocketSchema;
};
