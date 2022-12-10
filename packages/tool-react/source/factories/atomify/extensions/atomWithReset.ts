import {keyIn} from '@tool/utils';

import type {AtomInitialize, CustomSet, Initialization, ResolvableState} from '../types';
import type {Any} from '@tool/typescript';
import type {Atom} from '../types';

export const unique = Symbol();

type InferAtomValue<AnyAtom> = AnyAtom extends Atom<infer Value> ? Value : never;

export const canResetAtom = <AnyAtom extends Atom<unknown>>(
  atom: AnyAtom,
): atom is Any.AnyObject<InferAtomValue<AnyAtom>, typeof unique> & AnyAtom => keyIn(atom, unique);

export const getInitial = <State>(atom: Atom<State>) => {
  if (canResetAtom(atom)) {
    const initial = atom[unique];

    return initial;
  }

  throw Error('atom does not have initial value');
};

export const createAtomWithReset = (atomInitialize: AtomInitialize) => {
  return <State, Params extends [resolvableState: ResolvableState<State>]>(
    initialization: Initialization<State>,
    customSet?: CustomSet<State, Params>,
  ) => {
    const atom = atomInitialize(initialization, customSet);

    const resetAtom: typeof atom = Object.assign(atom, {[unique]: initialization});

    return resetAtom;
  };
};
