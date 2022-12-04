import {createEventHub, resolve} from '@tool/utils';
import {useCallback, useSyncExternalStore} from 'react';

import * as extenstions from './extensions/extensions';
import {collectExtensions, createState, createWorker, initialize, withNativeSet} from './helpers/helpers';

import type {Atom, CustomSet, Initialization, ResolvableState} from './types';

export const atomify = () => {
  const eventHub = createEventHub();
  const secretToken = Symbol();

  const atom = <State, Params extends unknown[] = [resolvableState: ResolvableState<State>]>(
    initialInitialization: Initialization<State>,
    customSet?: CustomSet<State, Params>,
  ) => {
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

      const set = (nextInitialization: Initialization<State>) => {
        initialization = nextInitialization;

        eventHub.emit(worker.id);
      };

      const setInitialization = (...params: Params) => {
        if (withNativeSet(customSet, params)) {
          const nextInitializtion = resolve(params[0], globalState.read);

          set(nextInitializtion);
          return;
        }

        if (customSet) {
          const handler = {
            state: globalState.read,
            get,
            set,
          };

          customSet(handler, ...params);
        }
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

  const useAtomValue = <State, Params extends unknown[]>(anyAtom: Atom<State, Params>) => {
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

  const useUpdateAtom = <State, Params extends unknown[]>(anyAtom: Atom<State, Params>) => {
    const setState = useCallback(
      (...params: Params) => {
        const {setInitialization} = anyAtom.read(secretToken);

        setInitialization(...params);
      },
      [anyAtom],
    );

    return setState;
  };

  const useAtom = <State, Params extends unknown[]>(anyAtom: Atom<State, Params>) => {
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
