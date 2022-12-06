import type {AtomInitialize, Initialization} from '../types';

type Reducer<State, Type extends string> = (state: State, type: Type) => State;

export const createAtomWithReducer = (atomInitialize: AtomInitialize) => {
  return <State, Type extends string>(initialization: Initialization<State>, reducer: Reducer<State, Type>) => {
    const atom = atomInitialize(initialization, (handler, type: Type) => {
      const nextState = reducer(handler.state, type);

      handler.set(nextState);
    });

    return atom;
  };
};
