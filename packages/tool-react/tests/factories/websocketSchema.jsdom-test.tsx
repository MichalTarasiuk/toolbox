import {render} from '@testing-library/react';

import {createWebSocketSchema} from '../../_api';

import type {InferWebSocketSchema, SelectWebSocketState} from '../../_api';

type WebsocketSchema = InferWebSocketSchema<
  {
    idle: {
      addr: string;
    };
    connecting: {
      socket: WebSocket;
      addr: string;
    };
    connected: {
      socket: WebSocket;
      addr: string;
    };
    error: {
      errorMessage: string;
    };
  },
  {
    idle: ['connecting'];
    connecting: ['error', 'connected'];
    connected: ['idle', 'error'];
    error: ['idle'];
  }
>;

type Actions = {
  connect: (
    state: SelectWebSocketState<WebsocketSchema, 'idle'>,
  ) => SelectWebSocketState<WebsocketSchema, 'connecting'>;
  disconnect: (
    state: SelectWebSocketState<WebsocketSchema, 'connected' | 'connecting'>,
  ) => SelectWebSocketState<WebsocketSchema, 'idle'>;
};

describe('jsdom - react:factories:webSocketSchema', () => {
  const initial: SelectWebSocketState<WebsocketSchema, 'idle'> = {kind: 'idle', addr: ''};

  const useWebSocketSchema = createWebSocketSchema<WebsocketSchema, Actions>(initial, (get, transition) => ({
    connect(idleState) {
      const socket = new WebSocket(idleState.addr);

      socket.addEventListener('error', () => {
        const currentState = get();
        if (currentState.kind === 'connecting') {
          transition(currentState.kind, 'error', {
            errorMessage: 'Failed to connect',
          });
        }
      });

      socket.addEventListener('open', () => {
        const currentState = get();
        if (currentState.kind === 'connecting') {
          transition(currentState.kind, 'connected', {
            socket,
            addr: currentState.addr,
          });
        }
      });

      return transition(idleState.kind, 'connecting', {
        socket,
        addr: idleState.addr,
      });
    },
    disconnect(state) {
      state.socket.close();

      return transition(state.kind, 'idle', {
        addr: state.addr,
      });
    },
  }));

  it('should render', () => {
    const Component = () => {
      useWebSocketSchema();

      return null;
    };

    render(<Component />);
  });
});
