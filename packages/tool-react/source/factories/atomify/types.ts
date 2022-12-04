export type Get = <State>(atom: Atom<State>) => State;
export type CustomSet<State, Params extends any[] = any[]> = (
  handler: {get: (atom: Atom<State>) => State; set: (nextInitialization: Initialization<State>) => void},
  ...params: Params
) => void;

export type LazyInitialization<State> = ((get: Get) => State) & {
  get?: (state: State) => void;
};
export type Initialization<State> = LazyInitialization<State> | State;
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
export type Atom<State = unknown, Params extends any[] = any[]> = {
  read: (token: symbol) => {
    id: string;
    readonly state: State;
    readonly coworkers: string[];
    setInitialization: (...params: InferParams<State, Params>) => void;
  };
};

export type InferParams<
  State,
  Params extends unknown[],
  DynamicParams extends unknown[] = Exclude<Params, ResolvableState<State>>,
> = [(state: State, ...dynamicParams: DynamicParams) => void] | DynamicParams | Exclude<Params, DynamicParams>;
