import equal from 'deep-equal';

export const createState = <State>() => {
  const initialState = Symbol();
  let state: State | typeof initialState = initialState;

  const canUpdate = <CurrentState>(currentState: CurrentState, nextState: State) => !equal(currentState, nextState);

  const update = (nextState: State) => {
    if (state === initialState || canUpdate(state, nextState)) {
      state = nextState;
    }

    return state;
  };

  return {
    get read() {
      if (state === initialState) {
        throw Error('State should be defined');
      }

      return state;
    },
    update,
  };
};
