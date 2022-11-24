/* eslint-disable @typescript-eslint/consistent-type-assertions -- resolveState: typescript can't infer return type */
import {createEventHub} from '@tool/utils';
import {useCallback, useSyncExternalStore} from 'react';

import * as extenstions from './extensions/extensions';
import {collectExtensions, createState, createWorker, initialize, resolveState} from './helpers/helpers';

import type {Atom, CustomSet, Initialization, ResolvableState} from './types';

export const atomify = () => {
  const eventHub = createEventHub();
  const secretToken = Symbol();

  const atom = <State>(initialInitialization: Initialization<State>, customSet?: CustomSet<State>) => {
    const state = createState<State>();
    const worker = createWorker();

    let initialization = initialInitialization;

    const read = (token: symbol) => {
      if (token !== secretToken) {
        throw Error('You do not have permission to read this atom');
      }

      const get = <AtomState>(atom: Atom<AtomState>) => {
        const {id, state} = atom.read(secretToken);

        worker.addCoworker(id);

        return state;
      };

      const set = (nextInitialization: Initialization<State>) => {
        initialization = nextInitialization;

        eventHub.emit(worker.id);
      };

      const setInitialization = (nextInitialization?: Initialization<State>) => {
        if (customSet) {
          customSet(get, set, nextInitialization);
          return;
        }

        nextInitialization && set(nextInitialization);
      };

      return {
        get state() {
          const nextState = initialize(initialization, get, {
            before: () => worker.stop(),
          });
          const updatedState = state.update(nextState);

          return updatedState;
        },
        setInitialization,
        ...worker.read(),
      };
    };

    return {
      read,
    };
  };

  const useAtom = <State>(atom: Atom<State>) => {
    const atomValue = useAtomValue(atom);
    const uodateAtom = useUpdateAtom(atom);

    return [atomValue, uodateAtom] as const;
  };

  const useAtomValue = <State>(atom: Atom<State>) => {
    const state = useSyncExternalStore<State>(
      onStoreChange => {
        const {id, coworkers} = atom.read(secretToken);

        const subscribers = [id, ...coworkers].map(name => eventHub.on(name, onStoreChange));

        return () => {
          subscribers.forEach(subscriber => {
            subscriber.off();
          });
        };
      },
      () => atom.read(secretToken).state,
    );

    return state;
  };

  const useUpdateAtom = <State>(atom: Atom<State>) => {
    const setState = useCallback(
      (resolvableState?: ResolvableState<State | undefined>) => {
        const {state, setInitialization} = atom.read(secretToken);

        setInitialization(resolveState(resolvableState, state));
      },
      [atom],
    );

    return setState;
  };

  return {
    atom,
    useAtom,
    useAtomValue,
    useUpdateAtom,
    ...collectExtensions(extenstions, atom),
  };
};
