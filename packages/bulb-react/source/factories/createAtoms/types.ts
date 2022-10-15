export type ReadAtom<Atom> = Atom extends {
  read: (token: symbol) => {
    state: infer State
  }
}
  ? State
  : never
