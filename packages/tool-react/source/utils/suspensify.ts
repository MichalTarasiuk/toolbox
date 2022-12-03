import {isError} from '@tool/utils';

type Status = 'fulfilled' | 'pending' | 'rejected';

export const suspensify = <Resolved>(promise: Promise<Resolved>) => {
  let status: Status = 'pending';
  let resolved: Error | Resolved;

  const suspender = promise.then(
    value => {
      status = 'fulfilled';
      resolved = value;
    },
    (error: Error) => {
      status = 'rejected';
      resolved = error;
    },
  );

  const read = () => {
    if (status === 'pending') {
      throw suspender;
    }

    if (status === 'rejected' || isError(resolved)) {
      throw resolved;
    }

    return resolved;
  };

  return {
    read,
  };
};
