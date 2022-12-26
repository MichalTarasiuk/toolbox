import {fireEvent, render, waitFor} from '@testing-library/react';
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

const createWebSocketSchema = (socket: WebSocket | null) => {
  if (!socket) {
    throw Error('socket should be defined');
  }

  const initial: SelectWebSocketState<WebsocketSchema, 'idle'> = {kind: 'idle', addr};
  const webSocketSchema = createWebSocketSchemaImpl<WebsocketSchema, Actions>(initial, (get, transition) => ({
    connect(idleState) {
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
  let server: Server | null = null;
  let socket: WebSocket | null = null;

  beforeEach(() => {
    server = new Server(addr);
    socket = new WebSocket(addr);
  });

  afterEach(() => {
    server?.close();
    server = null;

    socket?.close();
    socket = null;
  });

  it('should connect', async () => {
    const useWebSocketSchema = createWebSocketSchema(socket);

    const Component = () => {
      const {state, actions} = useWebSocketSchema();

      if (state.kind === 'idle') {
        return <button onClick={() => actions.connect(state)}>connect</button>;
      }

      if (state.kind === 'connecting') {
        return <p>connecting</p>;
      }

      if (state.kind === 'connected') {
        return <p>connected</p>;
      }

      return null;
    };

    const {getByText} = render(<Component />);

    fireEvent.click(getByText('connect'));

    getByText('connecting');

    await waitFor(() => {
      getByText('connected');
    });
  });

  it('should notify all subscribers', async () => {
    const useWebSocketSchema = createWebSocketSchema(socket);

    const ChildA = () => {
      const {state, actions} = useWebSocketSchema();

      if (state.kind === 'idle') {
        return <button onClick={() => actions.connect(state)}>connect</button>;
      }

      if (state.kind === 'connecting') {
        return <p>ChildA: connecting</p>;
      }

      if (state.kind === 'connected') {
        return <p>ChildA: connected</p>;
      }

      return null;
    };
    const ChildB = () => {
      const {state} = useWebSocketSchema();

      if (state.kind === 'idle') {
        return null;
      }

      return <p>ChildB: {state.kind}</p>;
    };

    const Component = () => (
      <>
        <ChildA />
        <ChildB />
      </>
    );

    const {getByText} = render(<Component />);

    fireEvent.click(getByText('connect'));

    getByText('ChildA: connecting');
    getByText('ChildB: connecting');

    await waitFor(() => {
      getByText('ChildA: connected');
      getByText('ChildB: connected');
    });
  });
});
