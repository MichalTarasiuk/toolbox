import { useRef } from 'react'

export const useLazyRef = <LazyInitialize extends () => unknown>(
  lazyInitialize: LazyInitialize,
) => {
  const canInitialize = Symbol()
  const ref = useRef<ReturnType<LazyInitialize> | typeof canInitialize>(
    canInitialize,
  )

  if (ref.current === canInitialize) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
    ref.current = lazyInitialize() as ReturnType<LazyInitialize>
  }

  return ref
}
