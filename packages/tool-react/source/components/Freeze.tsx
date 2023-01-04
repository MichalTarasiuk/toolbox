import {sleep} from '@tool/utils';
import {Suspense, useEffect, useMemo, useRef, type ReactNode} from 'react';

import {suspensify} from '../source';

type FreezeProps = {
  freeze: boolean;
  fallback: ReactNode;
  children: ReactNode;
};

type SuspenderProps = Omit<FreezeProps, 'fallback'>;

const createSuspenderState = () => {
  const [promise, timer, resolve] = sleep(Infinity, null);

  const stop = () => {
    resolve();
    clearTimeout(timer);
  };

  return {
    stop,
    ...suspensify(promise),
  };
};

const Suspender = ({freeze, children}: SuspenderProps) => {
  const suspenderState = useMemo(() => createSuspenderState(), []);

  const savedFreeze = useRef<boolean | null>(null);

  useEffect(() => {
    savedFreeze.current = freeze;
  });

  const canStartWork = freeze && !savedFreeze.current;
  const canStopWork = !freeze && savedFreeze.current;

  if (canStartWork) {
    suspenderState.read();
  }

  if (canStopWork) {
    suspenderState.stop();
  }

  return <>{children}</>;
};

export const Freeze = ({freeze, children, fallback}: FreezeProps) => {
  return (
    <Suspense fallback={fallback}>
      <Suspender freeze={freeze}>{children}</Suspender>
    </Suspense>
  );
};
