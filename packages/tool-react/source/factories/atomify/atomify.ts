import {createEventHub, isUndefined} from '@tool/utils';
import {useCallback, useSyncExternalStore} from 'react';

import * as extenstions from './extensions/extensions';
import {collectExtensions, createState, createWorker, initialize, resolveState} from './helpers/helpers';

import {type Atom, type CustomSet, type Initialization, type ResolvableState} from './types';

export const atomify = () => {
  const eventHub = createEventHub();
  const secretToken = Symbol();

  const atom = <State>(initialInitialization: Initialization<State>, customSet?: CustomSet<State>) => {
    const globalState = createState<State>();
    const worker = createWorker();

    let initialization = initialInitialization;

    const read = (token: symbol) => {
      if (token !== secretToken) {
        throw Error('You do not have permission to read this atom');
      }

      const get = <AtomState>(anyAtom: Atom<AtomState>) => {
        const {id, state} = anyAtom.read(secretToken);

        worker.addCoworker(id);

        return state;
      };

      const set = (nextInitialization?: Initialization<State>) => {
        if (isUndefined(nextInitialization)) {
          return;
        }

        initialization = nextInitialization;

        eventHub.emit(worker.id);
      };

      const setInitialization = (nextInitialization?: Initialization<State>) => {
        customSet ? customSet(get, set, nextInitialization) : set(nextInitialization);
      };

      return {
        get state() {
          const nextState = initialize(initialization, get, {
            before: () => {
              worker.stop();
            },
          });
          const updatedState = globalState.update(nextState);

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

  const useAtomValue = <State>(anyAtom: Atom<State>) => {
    const state = useSyncExternalStore<State>(
      onStoreChange => {
        const {id, coworkers} = anyAtom.read(secretToken);

        const subscribers = [id, ...coworkers].map(name => eventHub.on(name, onStoreChange));

        return () => {
          subscribers.forEach(subscriber => {
            subscriber.off();
          });
        };
      },
      () => anyAtom.read(secretToken).state,
    );

    return state;
  };

  const useUpdateAtom = <State>(anyAtom: Atom<State>) => {
    const setState = useCallback(
      (resolvableState?: ResolvableState<State | undefined>) => {
        const {state, setInitialization} = anyAtom.read(secretToken);

        setInitialization(resolveState(resolvableState, state));
      },
      [anyAtom],
    );

    return setState;
  };

  const useAtom = <State>(anyAtom: Atom<State>) => {
    const atomValue = useAtomValue(anyAtom);
    const uodateAtom = useUpdateAtom(anyAtom);

    return [atomValue, uodateAtom] as const;
  };

  return {
    atom,
    useAtom,
    useAtomValue,
    useUpdateAtom,
    ...collectExtensions(extenstions, atom),
  };
};
