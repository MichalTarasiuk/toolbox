import { useRef } from 'react'

const initial = Symbol()

export const useReach = <To>(to: To) => {
  const ref = useRef<To | typeof initial>(initial)
  const canWork = useRef(true)

  const reach = {
    get done() {
      return ref.current === to
    },
    set current(next: To) {
      if (canWork.current && ref.current !== to) {
        ref.current = next
      }
    },
    stop: () => {
      canWork.current = false
    },
  }

  return reach
}
