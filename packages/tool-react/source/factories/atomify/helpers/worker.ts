import {v4} from 'uuid';

export const createWorker = () => {
  const id = v4();
  const coworkers = new Set<string>();

  const addCoworker = (coworkerId: string) => {
    coworkers.add(coworkerId);
  };

  const stop = () => {
    coworkers.clear();
  };

  const read = () => ({id, coworkers: [...coworkers.values()]});

  return {
    read,
    addCoworker,
    stop,
    id,
  };
};
