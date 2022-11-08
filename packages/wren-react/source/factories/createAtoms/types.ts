export type Get = <State>(atom: Atom<State>) => State
export type CustomSet<State> = (
  get: (atom: Atom<State>) => State,
  set: (nextInitialization: Initialization<State>) => void,
  nextInitialization?: Initialization<State>,
) => void

export type LazyInitialization<State> = ((get: Get) => State) & {
  get?: (state: State) => void
}
export type Initialization<State> = State | LazyInitialization<State>
export type ResolvableState<State> = State | ((state: State) => State)

export type AtomInitialize = <State>(
  initialInitialization: Initialization<State>,
  customSet?: CustomSet<State>,
) => Atom<State>

export type Atom<State = unknown> = {
  read: (token: symbol) => {
    id: string
    readonly state: State
    readonly coworkers: string[]
    set: (nextInitialization?: Initialization<State>) => void
  }
}
