import { useCallback, useRef, useSyncExternalStore } from 'react'
import { createEventHub } from '@wren/utils'
import { useEvent } from './hooks'

const eventHub = createEventHub()

type EventHub = typeof eventHub
type Subscriber = ReturnType<EventHub['on']>

export const useEventHub = <Name extends string>(
  name: Name,
  handler: UnknownFunction,
) => {
  const savedSubscriber = useRef<Subscriber | null>(null)
  const stableHandler = useEvent(handler)

  useSyncExternalStore(
    (listener) => {
      const subscriber = eventHub.on<Name>(name, listener)

      savedSubscriber.current = subscriber

      return () => subscriber.off()
    },
    stableHandler,
    stableHandler,
  )

  const emit = useCallback(eventHub.emit.bind(name), [])

  return {
    ...savedSubscriber.current,
    emit,
  }
}
