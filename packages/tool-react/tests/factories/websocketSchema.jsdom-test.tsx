import {fireEvent, render} from '@testing-library/react';
import Server from 'jest-websocket-mock';

import {createWebSocketSchema as createWebSocketSchemaImpl} from '../../_api';

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

const addr = 'ws://localhost:1234';

const createWebSocketSchema = () => {
  const initial: SelectWebSocketState<WebsocketSchema, 'idle'> = {kind: 'idle', addr};
  const webSocketSchema = createWebSocketSchemaImpl<WebsocketSchema, Actions>(initial, (get, transition) => ({
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

  return webSocketSchema;
};

describe('jsdom - react:factories:webSocketSchema', () => {
  it('should connect', async () => {
    const server = new Server(addr);

    await server.connected;

    const useWebSocketSchema = createWebSocketSchema();

    const Component = () => {
      const {state, actions} = useWebSocketSchema();

      if (state.kind === 'idle') {
        return <button onClick={() => actions.connect(state)}>connect</button>;
      }

      if (state.kind === 'connecting') {
        return <p>connecting</p>;
      }

      if (state.kind === 'connected') {
        console.log('kind: connected');

        return <p>connected</p>;
      }

      return null;
    };

    const {getByText} = render(<Component />);

    fireEvent.click(getByText('connect'));

    getByText('connecting');
  });

  it.todo('should notify all subscribers');
});
