import {usePrevious} from '@react-hookz/web';
import {sleep} from '@tool/utils';
import {Suspense, useMemo, type ReactNode} from 'react';

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

  const previousFreeze = usePrevious(freeze);
  const canStartWork = freeze && !previousFreeze;
  const canStopWork = !freeze && previousFreeze;

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

const colorsMapper = {
  red: {isRed: true},
  blue: 'bg-blue',
};

type ColorsMapper = typeof colorsMapper;

const is = <CompareKey extends keyof ColorsMapper>(
  {key, compareKey}: {key: keyof ColorsMapper; compareKey: To},
  _value: ColorsMapper[keyof ColorsMapper],
): _value is ColorsMapper[CompareKey] => key === to;

const getMapper = <Key extends keyof ColorsMapper>(key: Key, value: ColorsMapper[Key]) => {
  if (is({}, value)) {
    value;
  }
};
