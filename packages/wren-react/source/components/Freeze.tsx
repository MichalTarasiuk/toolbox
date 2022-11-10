import { usePrevious } from '@react-hookz/web'
import { sleep } from '@wren/utils'
import { Suspense, useMemo } from 'react'

import { suspensify } from '../source'

import type { ReactNode } from 'react'

type FreezeProps = {
  freeze: boolean
  fallback: ReactNode
  children: ReactNode
}

type SuspenderProps = Omit<FreezeProps, 'fallback'>

const createSuspenderState = () => {
  const [promise, timer, resolve] = sleep(Infinity, null)

  const stop = () => {
    resolve()
    clearTimeout(timer)
  }

  return {
    stop,
    ...suspensify(promise),
  }
}

const Suspender = ({ freeze, children }: SuspenderProps) => {
  const suspenderState = useMemo(() => createSuspenderState(), [])

  const previousFreeze = usePrevious(freeze)
  const canStartWork = freeze && !previousFreeze
  const canStopWork = !freeze && previousFreeze

  if (canStartWork) {
    suspenderState.read()
  }

  if (canStopWork) {
    suspenderState.stop()
  }

  return <>{children}</>
}

export const Freeze = ({ freeze, children, fallback }: FreezeProps) => {
  return (
    <Suspense fallback={fallback}>
      <Suspender freeze={freeze}>{children}</Suspender>
    </Suspense>
  )
}
