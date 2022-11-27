export type Get = <State>(atom: Atom<State>) => State;
export type CustomSet<State> = (
  handler: {get: (atom: Atom<State>) => State; set: (nextInitialization: Initialization<State>) => void},
  ...params: any[]
) => void;

export type LazyInitialization<State> = ((get: Get) => State) & {
  get?: (state: State) => void;
};
export type Initialization<State> = State | LazyInitialization<State>;
export type ResolvableState<State> = State | ((state: State) => State);

export type AtomInitialize = <State>(
  initialInitialization: Initialization<State>,
  customSet?: CustomSet<State>,
) => Atom<State>;

export type ReadAtom<AnyAtom> = AnyAtom extends {
  read: (token: symbol) => {readonly state: infer State};
}
  ? State
  : never;
export type Atom<State = unknown> = {
  read: (token: symbol) => {
    id: string;
    readonly state: State;
    readonly coworkers: string[];
    setInitialization: (nextInitialization?: Initialization<State>) => void;
  };
};
