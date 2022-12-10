/* eslint-disable @typescript-eslint/no-explicit-any -- contravariance */

export type Get = <State>(atom: Atom<State>) => State;
export type CustomSet<State, Params extends unknown[] = unknown[]> = (
  handler: {state: State; get: (atom: Atom<State>) => State; set: (nextInitialization: Initialization<State>) => void},
  ...params: Params
) => void;

export type LazyInitialization<State> = ((get: Get) => State) & {
  get?: (state: State) => void;
};
export type Initialization<State> = LazyInitialization<State> | State;
export type ResolvableState<State> = State | ((state: State) => State);

export type AtomInitialize = <State, Params extends unknown[] = unknown[]>(
  initialInitialization: Initialization<State>,
  customSet?: CustomSet<State, Params>,
) => Atom<State, Params>;

export type Atom<State = unknown, Params extends unknown[] = any[]> = {
  read: (token: symbol) => {
    id: string;
    readonly state: State;
    readonly coworkers: string[];
    setInitialization: (...params: Params) => void;
  };
};
