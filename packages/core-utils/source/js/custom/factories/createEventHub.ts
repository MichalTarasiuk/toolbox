import { keyIn } from '../../../ts/typescript'
import { isArray, noop } from '../../common/common'

type State<Key extends string = string> = Record<Key, Array<AnyFunction>>

export const createEventHub = () => {
  const hub: State = {}

  const hasEvent = <Name extends string>(
    state: State,
    name: string,
  ): state is State<Name> => keyIn(state, name) && isArray(state[name])

  const emit = <Name extends string>(name: Name, ...args: unknown[]) => {
    if (hasEvent<Name>(hub, name)) {
      hub[name].forEach((listener) => listener(...args))
    }
  }

  const on = <Name extends string>(name: Name, handler: AnyFunction) => {
    if (hasEvent<Name>(hub, name)) {
      hub[name].push(handler)

      return {
        off: off.bind(undefined, name, handler),
      }
    }

    return {
      off: noop,
    }
  }

  const off = <Name extends string>(name: Name, handler: AnyFunction) => {
    if (hasEvent<Name>(hub, name)) {
      hub[name] = hub[name].filter((listener) => listener !== handler)
    }
  }

  return {
    emit,
    on,
    off,
  }
}
