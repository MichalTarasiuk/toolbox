import { keyIn } from '../../../ts/typescript'
import { isArray } from '../../common/common'

type EventHub<Key extends string = string> = Record<Key, Array<UnknownFunction>>

export const createEventHub = () => {
  const eventHub: EventHub = {}

  const hasEvent = <Name extends string>(
    state: EventHub,
    name: string,
  ): state is EventHub<Name> => keyIn(state, name) && isArray(state[name])

  const emit = <Name extends string>(name: Name, ...args: unknown[]) => {
    if (hasEvent<Name>(eventHub, name)) {
      eventHub[name].forEach((listener) => listener(...args))
    }
  }

  const on = <Name extends string>(name: Name, handler: UnknownFunction) => {
    eventHub[name] ??= []
    eventHub[name]!.push(handler)

    return {
      off: off.bind(undefined, name, handler),
    }
  }

  const off = <Name extends string>(name: Name, handler: UnknownFunction) => {
    if (hasEvent<Name>(eventHub, name)) {
      eventHub[name] = eventHub[name].filter((listener) => listener !== handler)
    }
  }

  return {
    emit,
    on,
    off,
  }
}
